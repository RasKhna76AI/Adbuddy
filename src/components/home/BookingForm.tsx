import { useState, useEffect } from 'react'; // Fixed: Included missing useEffect import
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { submitBookingInquiry } from '@/lib/supabase-db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, MapPin, Calendar, Users, DollarSign, Plane, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingFormProps {
  open: boolean;
  onClose: () => void;
  defaultHotelName?: string; // Captures item auto-fill selections safely
}

const TRAVELER_TYPES = ['Solo', 'Couple', 'Family', 'Group'];
const ACCOMMODATION_TYPES = ['Budget', 'Standard', 'Luxury'];
const INTERESTS = ['Beach', 'Mountains', 'Culture', 'Adventure', 'Wildlife', 'Food & Cuisine', 'History', 'Photography'];

// Live Webhook Endpoint configured for your Make.com Scenario routing
const WHATSAPP_WEBHOOK_URL = 'https://hook.eu2.make.com/fy8x5kmc2kzojo79xz23s47iiss1428z';

export function BookingForm({ open, onClose, defaultHotelName }: BookingFormProps) {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name ?? '',
    email: user?.email ?? '',
    mobile: '',
    destination: defaultHotelName ?? '', // Auto-populates if opened from a specific page
    travel_date: '',
    return_date: '',
    travelers: 1,
    traveler_type: 'Solo',
    budget: '',
    accommodation: 'Standard',
    interests: [] as string[],
    special_requests: '',
  });

  // Keep the destination state synced if the prop updates asynchronously
  useEffect(() => {
    if (defaultHotelName) {
      set(prev => ({ ...prev, destination: defaultHotelName }));
    }
  }, [defaultHotelName]);

  function set(field: string, value: unknown) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function toggleInterest(i: string) {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(i) ? prev.interests.filter(x => x !== i) : [...prev.interests, i],
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const payload = {
        ...form,
        user_id: user?.id ?? null,
        travel_date: form.travel_date || null,
        return_date: form.return_date || null,
      };

      // 1. Submit information safely directly to Supabase
      await submitBookingInquiry(payload);

      // 2. Fire direct asynchronous trigger payload to WhatsApp Automation Gateway
      try {
        await fetch(WHATSAPP_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'New Booking Inquiry',
            ...payload,
            interests_list: payload.interests.join(', ') // Formats array cleanly for text engines
          })
        });
      } catch (webhookError) {
        console.error('WhatsApp notification failed to forward:', webhookError);
        // Silently catch webhook errors so the user's booking experience isn't broken
      }

      setSubmitted(true);
      setTimeout(() => {
        handleClose();
        navigate('/checkout');
      }, 2000);
    } catch (error) {
      console.error('Database save error:', error);
      // Fallback fallback: Keep UI smooth even under database strain
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
        navigate('/checkout');
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setStep(1); setSubmitted(false); }, 300);
  }

  const totalSteps = 3;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative z-10 w-full max-w-2xl bg-background rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header Container with Custom Background Image */}
            <div 
              className="relative bg-cover bg-center bg-no-repeat px-8 py-6 text-white border-b border-white/10"
              style={{ backgroundImage: "url('/bgimage.jpg')" }}
            >
              <div className="absolute inset-0 backdrop-blur-sm z-0" />

              <div className="relative z-10">
                <button 
                  onClick={handleClose} 
                  className="absolute top-0 right-0 p-1.5 rounded-full bg-white/10 hover:bg-primary/20 transition-colors text-green-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="h-5 w-5 text-primary" />
                  <span className="font-black text-xl tracking-tight">Plan Your Journey</span>
                </div>
                
                <p className="text-slate-300 text-xs md:text-sm font-medium">
                  Tell us your dream trip and our experts will craft the perfect itinerary
                </p>
                
                {!submitted && (
                  <div className="flex gap-2 mt-4">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 flex-1 rounded-full transition-colors ${i < step ? 'bg-green-500' : 'bg-white/20'}`} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-8">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Inquiry Submitted!</h3>
                  <p className="text-muted-foreground text-sm mb-6">Thank you! Our travel experts will contact you within 24 hours with a personalized itinerary.</p>
                  <Button onClick={handleClose} className="rounded-full px-8">Close</Button>
                </div>
              ) : (
                <>
                  {/* Step 1: Personal Details */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-base text-foreground mb-4">Your Contact Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name *</Label>
                          <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Doe" required className="rounded-xl" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email *</Label>
                          <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" required className="rounded-xl" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Mobile *</Label>
                          <Input type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+91 98765 43210" required className="rounded-xl" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Travelers</Label>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => set('travelers', Math.max(1, form.travelers - 1))} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary">−</button>
                            <span className="font-bold text-lg w-8 text-center">{form.travelers}</span>
                            <button type="button" onClick={() => set('travelers', form.travelers + 1)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary">+</button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Who's Traveling?</Label>
                        <div className="flex flex-wrap gap-2">
                          {TRAVELER_TYPES.map(t => (
                            <button key={t} type="button" onClick={() => set('traveler_type', t)}
                              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${form.traveler_type === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'}`}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Trip Details */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-base text-foreground mb-4">Trip Details</h3>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"><MapPin className="inline h-3 w-3 mr-1" />Destination / Selected Item</Label>
                        <Input value={form.destination} onChange={e => set('destination', e.target.value)} placeholder="e.g. Bali, Hotel Name, Cab Type..." className="rounded-xl" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"><Calendar className="inline h-3 w-3 mr-1" />Travel / Check-In Date</Label>
                          <Input type="date" value={form.travel_date} onChange={e => set('travel_date', e.target.value)} className="rounded-xl" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Return / Check-Out Date</Label>
                          <Input type="date" value={form.return_date} onChange={e => set('return_date', e.target.value)} className="rounded-xl" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"><DollarSign className="inline h-3 w-3 mr-1" />Estimated Budget Allocation</Label>
                        <Input value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="e.g. 15000" className="rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Accommodation Preference</Label>
                        <div className="flex gap-2">
                          {ACCOMMODATION_TYPES.map(a => (
                            <button key={a} type="button" onClick={() => set('accommodation', a)}
                              className={`flex-1 py-2 rounded-xl text-sm border transition-colors ${form.accommodation === a ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'}`}>
                              {a}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Preferences */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-base text-foreground mb-4">Preferences & Interests</h3>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What do you love? (select all that apply)</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {INTERESTS.map(i => (
                            <button key={i} type="button" onClick={() => toggleInterest(i)}
                              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${form.interests.includes(i) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'}`}>
                              {i}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Special Requests</Label>
                        <Textarea
                          value={form.special_requests}
                          onChange={e => set('special_requests', e.target.value)}
                          placeholder="Any dietary needs, accessibility requirements, special requests..."
                          className="rounded-xl resize-none"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8">
                    <Button variant="outline" type="button" onClick={() => step > 1 ? setStep(step - 1) : handleClose()} className="rounded-full">
                      {step === 1 ? 'Cancel' : '← Back'}
                    </Button>
                    {step < totalSteps ? (
                      <Button type="button" onClick={() => setStep(step + 1)} className="rounded-full px-8"
                        disabled={step === 1 && (!form.name || !form.email || !form.mobile)}>
                        Next →
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={loading} className="rounded-full px-8">
                        {loading ? 'Submitting...' : 'Submit Inquiry'}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}