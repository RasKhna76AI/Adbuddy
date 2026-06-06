import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  Map, 
  CalendarDays, 
  ShieldCheck, 
  Coins, 
  Utensils, 
  PhoneCall, 
  Compass,
  Sparkles,
  Search,
  MessageSquare,
  AlertCircle,
  FileText
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'general' | 'planning' | 'safety' | 'payment';
  question: string;
  answer: string;
  isPopular?: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: Compass },
  { id: 'general', label: 'General & Food', icon: Utensils },
  { id: 'planning', label: 'Trip Planning', icon: CalendarDays },
  { id: 'safety', label: 'Safety & Comfort', icon: ShieldCheck },
  { id: 'payment', label: 'Rates & Booking', icon: Coins },
] as const;

const faqData: FAQItem[] = [
  {
    id: 'faq1',
    category: 'general',
    question: 'What travel documents do I need for tours in India & Uttarakhand?',
    answer: 'For international travelers, a passport with at least 6 months validity and an e-Tourist Visa (eTV) are required. For domestic Indian travelers exploring Uttarakhand, a valid government-issued photo ID (such as a Passport, Voter ID, Driving License, or generic National ID card) is mandatory for hotel check-ins and permit verifications along high-altitude routes.',
    isPopular: true,
  },
  {
    id: 'faq2',
    category: 'planning',
    question: 'What is the best time to visit Uttarakhand and India?',
    answer: 'The ideal time to visit the plain and lower hill stations is October to March when conditions are crisp and cool. For high-altitude treks and pristine Himalayan views in Uttarakhand, spring (March to May) and autumn (October to November) are magnificent. While the monsoon season (June to September) brings lush green landscapes, it requires careful route monitoring due to mountain rainfall.',
    isPopular: true,
  },
  {
    id: 'faq3',
    category: 'planning',
    question: 'Are your tour packages fully customizable?',
    answer: 'Absolutely! Every journey with Adventure Buddy can be tailored to your requirements. You can dynamically adjust travel dates, trip durations, specific sightseeing spots, outdoor activities, and hotel tiers (ranging from cozy homestays to premium valley-view resorts). Connect with our destination experts to design your ideal itinerary.',
    isPopular: true,
  },
  {
    id: 'faq4',
    category: 'payment',
    question: 'What is your cancellation and route realignment policy?',
    answer: 'We provide a highly adaptive cancellation layout: Cancellations submitted 30+ days prior to departure qualify for a full refund. 15–29 days out receive a 75% refund; 7–14 days receive 50%. In case of sudden mountain weather anomalies or force majeure road updates, our ground staff instantly realigns your bookings to alternative safe locations without losing your itinerary value.',
  },
  {
    id: 'faq5',
    category: 'safety',
    question: 'Do you provide verified safety and ground assistance?',
    answer: 'Safety is the core pillar of Adventure Buddy. All our vehicles carry "Safe Travel Partner" verification markings, and our professional local drivers are explicitly certified for high-altitude mountain navigation. We maintain round-the-clock live coordinate tracking and local medical networks at every base camp to ensure a secure, stress-free vacation.',
  },
  {
    id: 'faq6',
    category: 'payment',
    question: 'What payment options do you support for booking confirmations?',
    answer: 'We accept all major credit cards, debit cards, corporate UPI, Net Banking channels, and instant digital wallets via our secure payment gateway. For manual accounting, we also provide direct IMPS/NEFT Bank Transfer options where you can input your transaction reference/UTR string directly to confirm your tour allotment. A 30% advance secures your booking.',
  },
  {
    id: 'faq7',
    category: 'general',
    question: 'Is authentic local vegetarian/vegan food available during the tour?',
    answer: 'Yes! India and the Himalayan foothills boast an extraordinary culinary heritage of pure vegetarian meals. We ensure all curated pitstops, campsites, and hotel packages feature clean, hygienic vegetarian and vegan food options. If you want to sample authentic regional Pahadi dishes or have strict dietary requirements, simply notify our agents during registration.',
  },
  {
    id: 'faq8',
    category: 'general',
    question: 'What are your group booking sizes and solo traveler protocols?',
    answer: 'We cater to all styles of exploration! Our standard community guided tours average 8 to 20 travelers per cohort, making them family-friendly. Solo adventurers can seamlessly join these pre-scheduled batches or opt for an exclusive private vehicle and dedicated guide. Customized large-scale itineraries for schools, universities, and corporate groups are fully supported with specialized pricing structures.',
  },
];

function FAQCard({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-white border-green-500/40 shadow-xl shadow-green-600/[0.04]' 
          : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-transparent transition-colors"
      >
        <span className="font-bold text-[#0E2A47] text-base md:text-lg tracking-tight pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.05 : 1 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-slate-100 bg-slate-50/40"
          >
            <div className="px-6 py-5 text-slate-600 text-sm md:text-base leading-relaxed font-normal">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Enhanced Filter Action: Combines Category selector and Instant Keyword Search Input
  const filteredFaqs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Extract designated popular items for top highlight element strip
  const popularFaqs = useMemo(() => faqData.filter(item => item.isPopular), []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 selection:bg-green-50">
      
      {/* 1. HERO SECTION WITH TOPOGRAPHY green OVERLAY */}
      <section className="relative overflow-hidden bg-[#0E2A47] pt-32 pb-24 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-green-500 font-serif italic text-lg tracking-wide block">
            Adventure Buddy Help Desk
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            How Can We Assist Your Journey?
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Clear, transparent answers about local documentation, Himalayan weather cycles, custom packaging operations, and premium safety standards.
          </p>
          
          {/* REAL-TIME DYNAMIC SEARCH INTERFACE */}
          <div className="max-w-xl mx-auto mt-6 relative pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search queries (e.g., visa, cancellation, route, meals...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all text-[#0E2A47] font-medium placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS INFOGRAPHIC ROW */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-16 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Map, title: 'Custom Itineraries', desc: 'Modify routing rules, hotel choices, and hill-climbing schedules instantly.' },
          { icon: ShieldCheck, title: 'Safety Infrastructure', desc: 'Hills-certified drivers, tracked fleets, and active 24/7 ground monitoring support.' },
          { icon: PhoneCall, title: 'Always Connected', desc: 'Direct regional operator assistance lines during high-altitude transits.' }
        ].map((feat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 shadow-lg shadow-slate-200/50 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100">
              <feat.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-[#0E2A47] text-sm md:text-base mb-1 tracking-tight">{feat.title}</h3>
              <p className="text-slate-500 text-xs font-normal leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. POPULAR TRENDING TOPICS HIGHLIGHT GRID */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-green-600 tracking-wider">
              Top Checked Inquiries
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularFaqs.map((faq) => (
              <div 
                key={faq.id} 
                onClick={() => {
                  setActiveCategory('all');
                  setOpenId(faq.id);
                  document.getElementById('faq-deck-scroll')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-green-500/20 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                    <AlertCircle className="h-3 w-3" /> Quick Answer
                  </div>
                  <h4 className="font-bold text-[#0E2A47] text-xs md:text-sm line-clamp-2 leading-snug group-hover:text-green-600 transition-colors">
                    {faq.question}
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-green-500 transition-colors pt-4 flex items-center gap-1">
                  View full response →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEGMENTED CATEGORY TAB SELECTOR */}
      <section className="max-w-4xl mx-auto px-4 mb-8 text-center space-y-3" id="faq-deck-scroll">
        <p className="text-green-500 font-serif italic text-lg tracking-wide">
          Browse By Category
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 border-b border-slate-100 pb-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenId(null); 
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-green-600 text-white'
                    : 'text-slate-500 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. ANIMATED ACCORDION LIST WRAPPER */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => (
                <FAQCard
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))
            ) : (
              <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No Specific Queries Match Search Filter</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 6. LIVE CONTACT HELPDESK MULTI-CARDS */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-100 bg-white rounded-2xl p-6 flex items-start gap-5 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0 border border-green-100">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-[#0E2A47] text-base md:text-lg tracking-tight">Connect Live on WhatsApp</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Need answers right away? Chat with our regional operations team directly for real-time mountain transit updates and customized booking support channels.
              </p>
              <a 
                href="https://wa.me/#" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center text-xs font-bold text-green-600 hover:text-green-700 transition-colors pt-1"
              >
                Start Live Conversation Chat →
              </a>
            </div>
          </div>

          <div className="border border-slate-100 bg-white rounded-2xl p-6 flex items-start gap-5 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100">
              <FileText className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-[#0E2A47] text-base md:text-lg tracking-tight">Download Travel Guideline</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Access our detailed digital handbook compiled by our local destination specialists featuring comprehensive packing rules, high-altitude notes, and maps.
              </p>
              <button className="inline-flex items-center text-xs font-bold text-green-600 hover:text-green-700 transition-colors pt-1">
                Get PDF Guidelines Document →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH CONVERSION CALL-TO-ACTION RECONCILIATION RADAR */}
      <section className="bg-slate-50 border-t border-slate-100 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
            <HelpCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0E2A47] tracking-tight">
            Have a Unique Custom Scenario?
          </h2>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            Our regional travel architects are live to handle high-altitude mapping configurations, group allocations, and customized stays.
          </p>
          <div className="pt-2">
            <a
              href="/contact-us"
              className="inline-flex items-center bg-[#0E2A47] text-white text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-full transition-all hover:bg-[#0E2A47]/90 shadow-md"
            >
              Connect with an Expert Agent →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}