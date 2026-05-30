import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder, generateOrderNumber, type Order } from '@/lib/supabase-db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OrderReceipt } from '@/components/cart/OrderReceipt';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, CreditCard, Building2, Shield, Check, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const BANK_DETAILS = {
  bankName: 'HDFC Bank',
  accountName: 'Adventure Buddy',
  accountNumber: '12345678910112',
  ifscCode: 'HDFC0001234',
  branch: 'Main Branch, Mumbai',
  swiftCode: 'HDFCINBB',
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'bank_transfer'>('razorpay');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name ?? '',
    email: user?.email ?? '',
    mobile: '',
    travel_date: '',
    notes: '',
  });

  function set(k: string, v: string) { setForm(p => ({ ...p, [k]: v })); }

  async function handleRazorpay(orderId: number, orderNumber: string) {
    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string;
    if (!keyId) {
      alert('Razorpay is not configured. Please contact support.');
      return;
    }
    const loaded = await loadRazorpay();
    if (!loaded) { alert('Failed to load payment gateway. Please try again.'); return; }

    const rz = new window.Razorpay({
      key: keyId,
      amount: Math.round(total * 100),
      currency: 'INR',
      name: 'Travel & Tours',
      description: `Booking ${orderNumber}`,
      prefill: { name: form.name, email: form.email, contact: form.mobile },
      theme: { color: '#16a34a' },
      handler: async (response: Record<string, string>) => {
        try {
          const { updateOrderStatus } = await import('@/lib/supabase-db');
          const { data } = await updateOrderStatus(orderId, 'confirmed', response.razorpay_payment_id);
          setCompletedOrder(data);
          clearCart();
          setStep('success');
        } catch (err) {
          console.error("Error updating razorpay confirmation order:", err);
          alert('Payment succeeded but order status configuration failed. Please call support.');
        }
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
        }
      }
    });
    rz.open();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    
    try {
      const orderNumber = generateOrderNumber();
      const { data: order, error } = await createOrder({
        user_id: user.id,
        order_number: orderNumber,
        total_amount: total,
        status: 'pending',
        payment_method: paymentMethod,
        payment_id: paymentMethod === 'bank_transfer' && transactionId ? transactionId : null,
        payment_status: 'pending',
        traveler_name: form.name,
        traveler_email: form.email,
        traveler_mobile: form.mobile,
        travel_date: form.travel_date || null,
        notes: form.notes || null,
      });

      if (error || !order) throw new Error('Failed to create order tracking asset structure.');

      // Insert order items safely
      const { supabaseDb } = await import('@/lib/supabase-db');
      await supabaseDb.from('order_items').insert(
        items.map(i => ({
          order_id: order.id,
          package_id: i.package.id,
          package_title: i.package.title,
          destination: i.package.destinationName || '',
          image_url: i.package.imageUrl || '',
          unit_price: i.package.price,
          travelers: i.travelers,
          total_price: i.package.price * i.travelers,
        }))
      );

      if (paymentMethod === 'razorpay') {
        await handleRazorpay(order.id, order.order_number);
      } else {
        setCompletedOrder(order);
        clearCart();
        setStep('success');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please check fields or try again.');
    } finally {
      if (paymentMethod !== 'razorpay') {
        setLoading(false);
      }
    }
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-sm mx-auto">
          <ShoppingCart className="h-14 w-14 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some packages to proceed to checkout</p>
          <Link href="/packages"><Button className="rounded-full">Browse Packages</Button></Link>
        </div>
      </div>
    );
  }

  if (step === 'success' && completedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-lg mx-auto">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Booking Logged!</h2>
          <p className="text-muted-foreground mb-4">Order #{completedOrder.order_number}</p>
          
          {paymentMethod === 'bank_transfer' && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-left mb-5">
              <p className="font-bold text-amber-600 text-xs mb-1 uppercase tracking-wide">Manual Processing Required</p>
              <p className="text-xs text-muted-foreground leading-normal mb-3">
                Our verification team is auditing your transaction records. Your trip status will unlock automatically once validation completes.
              </p>
              {transactionId && (
                <div className="text-[11px] bg-muted/60 px-2.5 py-1.5 rounded border border-border/40 font-mono text-foreground">
                  <strong>Reference ID:</strong> {transactionId}
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-3 justify-center">
            <Button variant="outline" className="rounded-full" onClick={() => setShowReceipt(true)}>View Receipt</Button>
            <Link href="/dashboard"><Button className="rounded-full">My Orders</Button></Link>
          </div>
          {completedOrder && <OrderReceipt order={completedOrder} open={showReceipt} onClose={() => setShowReceipt(false)} />}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex items-start justify-center">
      <div className="container py-10 max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-4">
          <Link href="/packages" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Packages
          </Link>
        </div>
        
        <h1 className="text-3xl font-black text-center text-foreground mb-10 tracking-tight">Complete Booking Registration</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Rail Inputs panel container */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Traveler details */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-foreground text-base mb-5 flex items-center gap-2 tracking-tight">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">1</span>
                  Primary Traveler Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name *</Label>
                    <Input value={form.name} onChange={e => set('name', e.target.value)} required className="rounded-xl" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email *</Label>
                    <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} required className="rounded-xl" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Mobile Number *</Label>
                    <Input type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} required className="rounded-xl" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Preferred Travel Date</Label>
                    <Input type="date" value={form.travel_date} onChange={e => set('travel_date', e.target.value)} className="rounded-xl" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Special Requests</Label>
                    <Textarea value={form.notes} onChange={e => set('notes', e.target.value)} className="rounded-xl resize-none" rows={3} placeholder="Dietary adjustments, accessibility layout arrangements, extra beds..." />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector block */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-foreground text-base mb-5 flex items-center gap-2 tracking-tight">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">2</span>
                  Select Payment Method
                </h2>
                <div className="space-y-3">
                  <button type="button" onClick={() => setPaymentMethod('razorpay')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/85'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-primary' : 'border-muted-foreground'}`}>
                      {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-bold text-sm text-foreground">Pay safely with Razorpay</p>
                      <p className="text-xs text-muted-foreground">Instant validation · Cards, UPI, Netbanking channels</p>
                    </div>
                    <span className="ml-auto text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">Fastest Unlock</span>
                  </button>

                  <button type="button" onClick={() => setPaymentMethod('bank_transfer')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/85'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-primary' : 'border-muted-foreground'}`}>
                      {paymentMethod === 'bank_transfer' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-bold text-sm text-foreground">Direct Bank Transfer</p>
                      <p className="text-xs text-muted-foreground">IMPS/NEFT routing — Requires transaction ID match confirmation</p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {paymentMethod === 'bank_transfer' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-4 mt-1">
                          <div className="bg-blue-500/5 border border-blue-500/20 text-xs rounded-lg p-3 space-y-1.5 text-foreground">
                            <p className="font-bold text-blue-600 mb-1">Official Deposit Target Account</p>
                            {Object.entries({ 'Bank Name': BANK_DETAILS.bankName, 'Account Title': BANK_DETAILS.accountName, 'Account No.': BANK_DETAILS.accountNumber, 'IFSC Route Code': BANK_DETAILS.ifscCode, 'Branch': BANK_DETAILS.branch }).map(([k, v]) => (
                              <div key={k} className="flex justify-between items-center text-[11px]">
                                <span className="text-muted-foreground">{k}</span>
                                <span className="font-mono font-bold">{v}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Transaction verification block ID input */}
                          <div className="space-y-1.5 bg-card p-3 border border-border rounded-lg">
                            <Label className="text-xs font-bold text-foreground flex items-center gap-1">
                              Transaction Reference / UTR Number <span className="text-destructive">*</span>
                            </Label>
                            <Input 
                              type="text" 
                              required={paymentMethod === 'bank_transfer'} 
                              value={transactionId} 
                              onChange={e => setTransactionId(e.target.value)} 
                              placeholder="e.g. TXN1234567890 or UTR Number" 
                              className="rounded-lg font-mono text-xs bg-background" 
                            />
                            <p className="text-[10px] text-muted-foreground leading-normal">
                              Paste your transfer slip receipt UTR code to instantly match validation metrics with bank statements.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Sticky Total Block panel */}
            <div className="sticky top-24">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-foreground text-base mb-4 tracking-tight">Order Summary</h2>
                <div className="space-y-3 mb-5 max-h-[220px] overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.package.id} className="flex gap-3 items-center border-b border-border/30 pb-2 last:border-0 last:pb-0">
                      <img src={item.package.imageUrl} alt={item.package.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground leading-tight truncate">{item.package.title}</p>
                        <p className="text-[11px] text-muted-foreground">{item.travelers} Pax · {item.package.duration}</p>
                        <p className="text-xs font-bold text-primary mt-0.5">₹{(item.package.price * item.travelers).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Convenience Surcharge</span>
                    <span className="text-green-600 font-bold">Waived</span>
                  </div>
                  <div className="flex justify-between font-black text-base pt-2.5 border-t border-dashed">
                    <span>Grand Total</span>
                    <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full rounded-full h-12 font-bold tracking-wide" 
                  disabled={loading || !form.name || !form.email || !form.mobile || (paymentMethod === 'bank_transfer' && !transactionId)}
                >
                  {loading ? 'Processing Transaction...' : paymentMethod === 'razorpay' ? 'Secure Pay Now' : 'Submit Bank Booking'}
                </Button>
                
                <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 text-primary" /> 256-bit Secure Gateway Safeguard
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}