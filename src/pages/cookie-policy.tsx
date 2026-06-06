import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function CookiePolicyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Interactive local states for tracking preference simulations
  const [essentialConsent] = useState(true); // Permanent structural fallback
  const [performanceConsent, setPerformanceConsent] = useState(true);
  const [functionalConsent, setFunctionalConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const cookieSections: CookieSection[] = useMemo(() => [
    {
      id: 'definition',
      title: '1. Definition & Operational Scope of Cookies',
      content: (
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Cookies are small alphanumeric data packets deployed to your desktop or mobile browser environment whenever you load digital assets controlled by 
          <strong className="text-[#0E2A47] font-bold"> Adventure Buddy </strong>. 
          These files enable our servers to capture user engagement metrics, protect payment channels, remember search inputs, and ensure smooth delivery of high-altitude travel itineraries.
        </p>
      )
    },
    {
      id: 'matrix',
      title: '2. Functional Classification & Live Toggle Matrix',
      content: (
        <div className="space-y-6 text-slate-600 text-sm md:text-base">
          <p>Our platform separates tracking systems into four distinct operational layers. You can adjust your tracking preferences below:</p>
          
          <div className="space-y-3">
            {/* Essential Tracker */}
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 bg-slate-200 px-2 py-0.5 rounded uppercase">Category 01: Essential / Mandatory</span>
                <p className="text-xs text-slate-500 mt-1 font-medium">Critical for core site functionality. Manages secure user tokens, clears transaction routing layers, and retains custom hotel selections during checkouts. Disabling this tier drops platform accessibility.</p>
              </div>
              <div className="shrink-0">
                <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-md block text-center">Permanently Active</span>
              </div>
            </div>

            {/* Performance Tracker */}
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Category 02: Performance & Analytics</span>
                <p className="text-xs text-slate-500 mt-1 font-medium">Aggregates anonymous interaction telemetry via Google Analytics modules. Helps us identify broken interface links, load speeds across rural server networks, and overall traffic density maps.</p>
              </div>
              <div className="shrink-0">
                <button 
                  onClick={() => setPerformanceConsent(!performanceConsent)}
                  className={`text-xs font-bold px-4 py-2 rounded-md transition-all ${performanceConsent ? 'bg-green-600 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}
                >
                  {performanceConsent ? 'Consent Granted' : 'Opt-Out Selected'}
                </button>
              </div>
            </div>

            {/* Functional Tracker */}
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Category 03: Functional Customization</span>
                <p className="text-xs text-slate-500 mt-1 font-medium">Saves personalized settings such as localized currencies (INR), regional routing options, and persistent itinerary notes across active user sessions.</p>
              </div>
              <div className="shrink-0">
                <button 
                  onClick={() => setFunctionalConsent(!functionalConsent)}
                  className={`text-xs font-bold px-4 py-2 rounded-md transition-all ${functionalConsent ? 'bg-green-600 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}
                >
                  {functionalConsent ? 'Consent Granted' : 'Opt-Out Selected'}
                </button>
              </div>
            </div>

            {/* Marketing Tracker */}
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase">Category 04: Targeting & Ad Delivery</span>
                <p className="text-xs text-slate-500 mt-1 font-medium">Retains historical path data to display targeted Himalayan travel promotions on third-party digital publisher networks and social hubs.</p>
              </div>
              <div className="shrink-0">
                <button 
                  onClick={() => setMarketingConsent(!marketingConsent)}
                  className={`text-xs font-bold px-4 py-2 rounded-md transition-all ${marketingConsent ? 'bg-green-600 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}
                >
                  {marketingConsent ? 'Consent Granted' : 'Opt-Out Selected'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'telemetry',
      title: '3. Cross-Border Third-Party Data Integrations',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>
            To deliver real-time mapping information and interactive route updates across Uttarakhand, our architecture connects directly with trusted third-party cloud infrastructure assets:
          </p>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs md:text-sm font-medium text-slate-500">
            <p>• <span className="text-[#0E2A47] font-bold">Mapping Systems:</span> Map layers leverage third-party location cookies to safely render high-altitude paths, elevation markers, and baseline coordinates.</p>
            <p>• <span className="text-[#0E2A47] font-bold">Financial Processing Channels:</span> Verified payment processing links drop unique validation tags to combat automated transaction script injections and fraud vectors.</p>
          </div>
        </div>
      )
    },
    {
      id: 'retention',
      title: '4. Cookie Expiration Logs & Structural Lifespans',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>The operational lifespans of tracking files deployed to user equipment fall into the following temporal boundaries:</p>
          <div className="overflow-hidden border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-50 text-[#0E2A47] font-bold border-b border-slate-100">
                <tr>
                  <th className="p-3">Data System Type</th>
                  <th className="p-3 text-right">Expiration Threshold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-500">
                <tr><td className="p-3 text-[#0E2A47]">Transient / Session Files</td><td className="p-3 text-right">Immediate upon browser exit</td></tr>
                <tr><td className="p-3 text-[#0E2A47]">Persistent Functional Identifiers</td><td className="p-3 text-right">12 to 24 Months maximum range</td></tr>
                <tr><td className="p-3 text-[#0E2A47]">Analytics Telemetry Sets</td><td className="p-3 text-right">26 Months static storage log</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'compliance',
      title: '5. Regulatory Alignment & Identity Verification Safety',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>
            We process digital identifiers in compliance with current regional data protection laws and international privacy frameworks.
          </p>
          <div className="p-4 bg-green-50/40 border-l-4 border-green-500 rounded-r-xl text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
            <strong className="text-green-600 font-bold block mb-1">Identity Processing Rule:</strong> 
            While evaluating group bookings or high-altitude transit requirements across checkpoints, we never store, link, or combine automated browser cookie logs with highly sensitive personal identifiers (such as international passports, Aadhaar numbers, or related national registration numbers). This data is isolated inside hardened, write-only databases to secure your digital footprint.
          </div>
        </div>
      )
    },
    {
      id: 'disclaimer',
      title: '6. Platform Disclaimers & Full Liability Waiver',
      content: (
        <div className="space-y-3 text-slate-600 text-xs md:text-sm bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-800 leading-relaxed">
          <p className="font-bold text-white uppercase tracking-wider text-center border-b border-slate-800 pb-2">
            Non-Liability & Arbitration Confirmation
          </p>
          <p>
            By continuing your interactions on this site, you explicitly agree that Adventure Buddy is fully absolved of any legal claims, tracking disputes, administrative fines, or class-action litigation arising out of third-party cookie updates, automated script processing, browser settings bugs, or tracking data transfers.
          </p>
          <p>
            Any dispute involving digital telemetry, targeting preferences, or web interactions will be resolved through mandatory arbitration in Hyderabad, Telangana, India, bypassing external international jurisdictions.
          </p>
        </div>
      )
    }
  ], [essentialConsent, performanceConsent, functionalConsent, marketingConsent]);

  const filteredCookies = useMemo(() => {
    return cookieSections.filter(sec => {
      const matchesSearch = sec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            sec.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || sec.id === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, cookieSections]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 selection:bg-green-50">
      
      {/* PROFESSIONAL OVERLAY HERO BANNER */}
      <section className="relative overflow-hidden bg-[#0E2A47] pt-32 pb-24 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-green-500 font-serif italic text-lg tracking-wide block">
            Adventure Buddy Core Operations
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Cookie Configuration Rules
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            Review how our web engines utilize telemetry data arrays to verify reservations, optimize page performance, and secure payment pathways.
          </p>
          <div className="inline-block bg-slate-800/60 border border-slate-700/50 rounded-md px-4 py-1 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Updated Verification Cycle: June 2026
          </div>
        </div>
      </section>

      {/* METRIC CARD STRIP */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-16 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Mandatory Cookies', value: 'Session Isolation' },
          { label: 'Google Analytics Log', value: '26-Month Clears' },
          { label: 'Targeting Elements', value: 'User Opt-In Required' },
          { label: 'Grievance Location', value: 'Hyderabad, India' }
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-lg shadow-slate-200/40">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{item.label}</p>
            <p className="text-xs md:text-sm font-black text-[#0E2A47]">{item.value}</p>
          </div>
        ))}
      </section>

      {/* SEARCH AND TAB NAVIGATION CONTROLS */}
      <section className="max-w-6xl mx-auto px-4 mb-10">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-green-600 text-white' : 'text-slate-500 hover:bg-slate-200/60'}`}
            >
              View Full Framework
            </button>
            {cookieSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all hidden lg:block ${activeTab === sec.id ? 'bg-green-600 text-white' : 'text-slate-500 hover:bg-slate-200/60'}`}
              >
                {sec.title.split('.')[0]}. Index
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Filter specific tracker terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs bg-white focus:outline-none focus:border-green-500 font-medium placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* TWO COLUMN POLICY COMPONENT VIEWPORT */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT INDEX BAR */}
        <div className="lg:col-span-1 space-y-3 sticky top-24 h-fit hidden lg:block">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold uppercase text-[#0E2A47] tracking-wider mb-3">Policy Navigation</h3>
            <div className="space-y-2">
              {cookieSections.map(sec => (
                <div
                  key={sec.id}
                  onClick={() => {
                    setActiveTab('all');
                    setTimeout(() => {
                      document.getElementById(`cookie-${sec.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 120);
                  }}
                  className="text-xs font-medium text-slate-500 hover:text-green-600 cursor-pointer transition-colors leading-tight"
                >
                  {sec.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT DATA SHEETS */}
        <div className="lg:col-span-3 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredCookies.length > 0 ? (
              filteredCookies.map((section) => (
                <motion.div
                  key={section.id}
                  id={`cookie-${section.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 border-b border-slate-100 pb-10 last:border-0"
                >
                  <h2 className="text-lg md:text-xl font-black text-[#0E2A47] tracking-tight">
                    {section.title}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    {section.content}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No terms match search parameters</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* COMPLIANCE CHANNELS CONTACT FOOTER CONTAINER */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-base md:text-lg font-black text-[#0E2A47] tracking-tight">
            Data Architecture & Digital Preference Queries
          </h3>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            For technical balance verifications, legal cookie logs, or explicit request routing files, submit data requests straight to our technical operations center.
          </p>
          <div className="bg-white border border-slate-100 p-5 rounded-xl max-w-md mx-auto shadow-sm text-xs font-medium text-slate-600 text-left space-y-2">
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Grievance Registry</span> compliance@adventurebuddy.com</div>
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Direct Dial Hub</span> +91-40-7788-9900</div>
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Registered Data Base</span> HITEC City, Hyderabad, Telangana, 500081, India</div>
          </div>
        </div>
      </section>
    </div>
  );
}