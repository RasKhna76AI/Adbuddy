import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- FAQ Type and Data ---
interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How long does it take to get a custom itinerary quote?",
    answer: "Our travel design specialists typically respond with a personalized, custom itinerary draft within 24 to 48 business hours of receiving your detailed request."
  },
  {
    question: "Can I change my tour package dates after booking?",
    answer: "Yes, date modifications are allowed up to 14 days before departure, subject to hotel availability and any seasonal pricing adjustments."
  },
  {
    question: "What is your cancellation and refund policy?",
    answer: "We offer full refunds for cancellations made 30 days or more before your trip. Cancellations between 15-29 days receive a 50% refund. Cancellations inside 14 days are non-refundable."
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
    <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ==========================================
            1. HEADER BANNER SECTION
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have questions about our regional tour packages, custom itineraries, or reservations? Reach out and our expert planning team will guide you.
          </p>
        </div>

        {/* ==========================================
            2. CORE UTILITY GRID CONTAINER
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS (SPAN 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-8">
              <h2 className="text-xl font-bold tracking-tight border-b pb-3 border-border/60 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> Contact Information
              </h2>

              <div className="space-y-6">
                {/* Office Location info */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider text-[11px]">Main Head Office</h4>
                    <p className="text-foreground font-medium mt-0.5">102 Cyber Heights, Sector 62</p>
                    <p className="text-muted-foreground text-sm">Noida, Uttar Pradesh, India</p>
                  </div>
                </div>

                {/* Direct Communications Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider text-[11px]">Phone Support</h4>
                    <p className="text-foreground font-medium mt-0.5">+91 (120) 456-7890</p>
                    <p className="text-muted-foreground text-sm">Mon - Sat, 9:00 AM to 6:00 PM IST</p>
                  </div>
                </div>

                {/* Email Direct Desk */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider text-[11px]">Email Communications</h4>
                    <p className="text-primary font-semibold mt-0.5 hover:underline cursor-pointer">support@adventurebuddy.com</p>
                    <p className="text-muted-foreground text-sm">Expect a response within 24 business hours.</p>
                  </div>
                </div>

                {/* Operational Business Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider text-[11px]">Operational Hours</h4>
                    <p className="text-foreground font-medium mt-0.5">Monday – Saturday</p>
                    <p className="text-muted-foreground text-sm">Closed on Sundays & National Holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Callout block */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
              <h3 className="font-bold text-base mb-1">Looking for Instant Support?</h3>
              <p className="text-sm text-muted-foreground mb-4">Check out our frequently answered system configurations down below.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM COMPONENT (SPAN 7) */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight mb-2">Send an Electronic Inquiry</h2>
              <p className="text-muted-foreground text-sm mb-6">Fill out your specific operational requirements and our desk manager will map a dedicated support agent.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider" htmlFor="name">Full Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider" htmlFor="email">Email Address</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider" htmlFor="subject">Subject Matter</label>
                  <input
                    required
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-colors"
                    placeholder="Custom 5-Day Tour Package Inquiry"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider" htmlFor="message">Message Details</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-colors resize-none"
                    placeholder="Provide details of your planned travel itinerary..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full h-11 text-sm font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
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
                      className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      <div>
                        <p className="font-bold">Inquiry Transmitted Successfully!</p>
                        <p className="text-xs opacity-90">Thank you for reaching out. A confirmation has been logged to our CRM routing pipeline.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. FREQUENTLY ASKED QUESTIONS SECTION
           ========================================== */}
        <hr className="border-border/60" />
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Common Inquiries</h2>
            <p className="text-muted-foreground text-sm">Save time and review quick answers before reaching out to support desks.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-colors">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm sm:text-base hover:bg-secondary/20 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border/40 bg-secondary/10 leading-relaxed">
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

      </div>
    </div>
  );
}

// Simple fallback badge component in case shadcn configurations vary slightly
function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold border rounded-full transition-colors ${className}`}>
      {children}
    </span>
  );
}