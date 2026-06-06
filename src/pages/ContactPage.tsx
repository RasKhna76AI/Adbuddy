import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How long does it take to get a custom itinerary quote?",
    answer: "Our travel design specialists typically respond with a personalized, custom itinerary draft within 24 to 48 business hours of receiving your detailed high-altitude request."
  },
  {
    question: "Can I change my tour package dates after booking?",
    answer: "Yes, date modifications are allowed up to 14 days before departure, subject to high-altitude permit regulations, hotel availability, and seasonal adjustments."
  },
  {
    question: "What is your cancellation and refund policy?",
    answer: "We offer full refunds for cancellations made 30 days or more before your trip. Cancellations between 15-29 days receive a 50% refund. Cancellations inside 14 days are non-refundable due to pre-secured mountain logistics."
  }
];

export default function ContactUsPage() {
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Accordion State for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request lifecycle
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success banner notice after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 selection:bg-blue-50">
      
      {/* ==========================================
          1. HEADER BANNER SECTION WITH TOPOGRAPHY BLUE OVERLAY
         ========================================== */}
      <section className="relative overflow-hidden bg-[#0E2A47] pt-32 pb-24 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-orange-500 font-serif italic text-lg tracking-wide block">
            Adventure Buddy Communications Desk
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Connect With Our Expeditions Desk
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Have questions about our regional tour packages, custom itineraries, or reservations? Reach out and our expert planning team will guide you.
          </p>
          <div className="inline-block bg-slate-800/60 border border-slate-700/50 rounded-full px-4 py-1 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Typical Response Turnaround: Under 24 Hours
          </div>
        </div>
      </section>

      {/* ==========================================
          2. QUICK STATS INFOGRAPHIC ROW
         ========================================== */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-16 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Support Turnaround', value: '24 Hours Max' },
          { label: 'Operation Center', value: 'Noida, UP' },
          { label: 'Chat Infrastructure', value: 'Encrypted Routing' },
          { label: 'Emergency Support', value: '24/7 For Active Trips' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-lg shadow-slate-200/50">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{stat.label}</p>
            <p className="text-sm md:text-base font-black text-[#0E2A47]">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* ==========================================
          3. CORE UTILITY GRID CONTAINER
         ========================================== */}
      <main className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CONTACT DETAILS (SPAN 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-8">
            <h2 className="text-lg font-black text-[#0E2A47] tracking-tight border-b pb-3 border-slate-200/60 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" /> Contact Information
            </h2>

            <div className="space-y-6">
              {/* Office Location info */}
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0E2A47] uppercase tracking-wider text-[10px]">Main Head Office</h4>
                  <p className="text-slate-700 font-semibold mt-0.5 text-sm">102 Cyber Heights, Sector 62</p>
                  <p className="text-slate-500 text-xs">Noida, Uttar Pradesh, India</p>
                </div>
              </div>

              {/* Direct Communications Phone */}
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0E2A47] uppercase tracking-wider text-[10px]">Phone Support</h4>
                  <p className="text-slate-700 font-semibold mt-0.5 text-sm">+91 (120) 456-7890</p>
                  <p className="text-slate-500 text-xs">Mon - Sat, 9:00 AM to 6:00 PM IST</p>
                </div>
              </div>

              {/* Email Direct Desk */}
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0E2A47] uppercase tracking-wider text-[10px]">Email Communications</h4>
                  <p className="text-blue-600 font-bold mt-0.5 hover:underline cursor-pointer text-sm">support@adventurebuddy.com</p>
                  <p className="text-slate-500 text-xs">Expect a response within 24 business hours.</p>
                </div>
              </div>

              {/* Operational Business Hours */}
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-slate-200/60 text-slate-600 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0E2A47] uppercase tracking-wider text-[10px]">Operational Hours</h4>
                  <p className="text-slate-700 font-semibold mt-0.5 text-sm">Monday – Saturday</p>
                  <p className="text-slate-500 text-xs">Closed on Sundays & National Holidays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Callout block */}
          <div className="p-4 border-l-4 border-orange-500 bg-orange-50/40 rounded-r-xl">
            <h3 className="font-bold text-xs text-[#0E2A47] uppercase tracking-wider mb-1">Looking for Instant Support?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Check out our frequently answered system configurations down below before submitting an inquiry.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM COMPONENT (SPAN 7) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0E2A47] tracking-tight mb-2">Send an Electronic Inquiry</h2>
            <p className="text-slate-500 text-xs md:text-sm mb-6 font-medium">Fill out your specific operational requirements and our desk manager will map a dedicated support agent.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider" htmlFor="name">Full Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider" htmlFor="email">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider" htmlFor="subject">Subject Matter</label>
                <input
                  required
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors"
                  placeholder="Custom 5-Day Tour Package Inquiry"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider" htmlFor="message">Message Details</label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors resize-none"
                  placeholder="Provide details of your planned travel itinerary..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full h-10 text-xs font-bold tracking-wider uppercase shadow-md bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-white transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" /> Send Message
                  </>
                )}
              </Button>

              {/* Form submission response notification banner */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <div>
                      <p className="font-bold">Inquiry Transmitted Successfully!</p>
                      <p className="text-[11px] opacity-90 mt-0.5">Thank you for reaching out. A confirmation has been logged to our CRM routing pipeline.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </main>

      {/* ==========================================
          4. FREQUENTLY ASKED QUESTIONS SECTION
         ========================================== */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[#0E2A47] tracking-tight">Common Inquiries</h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Save time and review quick answers before reaching out to support desks.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm transition-colors">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#0E2A47] hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-4 pt-0 text-xs md:text-sm text-slate-600 border-t border-slate-100/60 bg-slate-50/50 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

// Simple internal inline fallbacks for custom look without needing extra external imports
function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold border rounded-full transition-colors ${className}`}>
      {children}
    </span>
  );
}