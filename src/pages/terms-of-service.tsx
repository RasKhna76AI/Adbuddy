import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function TermsOfServicePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const termsData: TermSection[] = useMemo(() => [
    {
      id: 'agreement',
      title: '1. Agreement to Terms & Operational Scope',
      content: (
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          By engaging with the booking engines, digital assets, trip planning interfaces, or logistics resources provided by 
          <strong className="text-[#0E2A47] font-bold"> Adventure Buddy </strong> 
          ("Company," "we," "us," or "our"), you signify your absolute and unconditioned agreement to these Terms of Service. If you do not accept these parameters, you are explicitly restricted from booking travel itineraries across our networks.
        </p>
      )
    },
    {
      id: 'booking',
      title: '2. Travel Package Allocations & Payment Matrix',
      content: (
        <div className="space-y-4 text-slate-600 text-sm md:text-base">
          <p>All group, solo, or corporate itineraries are managed under strict, non-negotiable financial clearings:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <span className="text-[10px] font-bold tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Advance Clearance</span>
              <p className="text-xs text-slate-500 mt-2 font-medium">A mandatory 30% advance deposit is required to lock operational reservations for hotels, local transport fleets, and guides.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <span className="text-[10px] font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase">Final Settlement</span>
              <p className="text-xs text-slate-500 mt-2 font-medium">The 70% balance payment must be fully cleared 15 business days prior to your assigned launch or departure timeline.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cancellation',
      title: '3. Strategic Cancellation & Refund Tiers',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>Processing cancellations requires processing resource liquidations across our ground pipelines. Refunds adhere strictly to the schedule below:</p>
          <div className="overflow-hidden border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-50 text-[#0E2A47] font-bold border-b border-slate-100">
                <tr>
                  <th className="p-3">Timeline Submitted</th>
                  <th className="p-3 text-right">Refund Value Returned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-500">
                <tr><td className="p-3 text-[#0E2A47]">30+ Days Prior to Launch</td><td className="p-3 text-right text-green-600">100% Full Refund</td></tr>
                <tr><td className="p-3 text-[#0E2A47]">15–29 Days Prior to Launch</td><td className="p-3 text-right">75% Package Value</td></tr>
                <tr><td className="p-3 text-[#0E2A47]">7–14 Days Prior to Launch</td><td className="p-3 text-right">50% Package Value</td></tr>
                <tr><td className="p-3 text-[#0E2A47]">Within 7 Days / No-Show Range</td><td className="p-3 text-right text-orange-600">0% Absolute Forfeiture</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'weather',
      title: '4. Force Majeure & High-Altitude Route Alterations',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>
            Operating across Uttarakhand, mountain base camps, and the dynamic Himalayan corridors exposes itineraries to sudden force majeure variables (including flash floods, cloudbursts, unprompted landslides, or administrative border restrictions).
          </p>
          <div className="p-4 bg-orange-50/40 border-l-4 border-orange-500 rounded-r-xl">
            <p className="text-xs md:text-sm text-[#0E2A47] leading-relaxed font-medium">
              <strong className="text-orange-600 font-bold">Dynamic Adjustments Clause:</strong> Adventure Buddy holds absolute operational authority to alter paths, bypass high-altitude trails, substitute resort properties, or cut itineraries short to safeguard group wellness. No monetary adjustments, operational claims, or compensatory structural payouts will be issued for unexpected path shifts triggered by natural elements.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'documentation',
      title: '5. Regulatory Document Handling & Identity Rules',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>
            Travelers are solely responsible for acquiring, carrying, and verifying all necessary permissions. International visitors must show passports with minimum 6 months validity alongside an active visa string.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
            <strong className="text-[#0E2A47] font-bold block mb-1">Checkpoint Identity Handling (Aadhaar & Local Permit Systems):</strong> 
            To access inner-line sectors or cross high-altitude checkpoints, travelers may need to supply regional or national identification records. If a traveler uploads or shares sensitive identifiers (such as Aadhaar, MyNumber, or Resident Registration Numbers), our platforms automatically encrypt the data at rest. These sensitive records are directly submitted to border verification networks without public display or plain-text transmission to protect user privacy.
          </div>
        </div>
      )
    },
    {
      id: 'indemnity',
      title: '6. Risk Assumption & Comprehensive Waiver of Claims',
      content: (
        <div className="space-y-3 text-slate-600 text-xs md:text-sm bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-800 leading-relaxed">
          <p className="font-bold text-white uppercase tracking-wider text-center border-b border-slate-800 pb-2">
            Absolute Release of Business Liability
          </p>
          <p>
            Adventure travel, high-altitude mountain trekking, river rafting, and extreme terrain transits contain inherent vulnerabilities to physical injury, medical crises, altitude sickness, illness, or death. By purchasing our solutions, you explicitly assume all related operational risks. 
          </p>
          <p>
            You unconditionally release, indemnify, and hold harmless Adventure Buddy, its corporate shareholders, ground guides, and driving crews from any legal claims, tort actions, liability claims, or expense suites linked to personal injury, property loss, scheduling changes, or fatal events arising during your itinerary.
          </p>
        </div>
      )
    },
    {
      id: 'disputes',
      title: '7. Mandatory Arbitration & Legal Jurisdictions',
      content: (
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Any operational friction, billing disagreements, or execution claims arising out of these terms shall be subject to independent arbitration rules under the Arbitration and Conciliation Act of India. Both parties agree that any formal proceedings will be held exclusively in the legal courts of 
          <span className="text-[#0E2A47] font-bold"> Hyderabad, Telangana, India</span>, and any external courts are explicitly waived.
        </p>
      )
    }
  ], []);

  const filteredTerms = useMemo(() => {
    return termsData.filter(term => {
      const matchesSearch = term.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            term.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || term.id === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, termsData]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 selection:bg-green-50">
      
      {/* CORPORATE HEADLINE PANEL WITH NAVY BACKGROUND OVERLAY */}
      <section className="relative overflow-hidden bg-[#0E2A47] pt-32 pb-24 text-center">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_30px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-green-500 font-serif italic text-lg tracking-wide block">
            Adventure Buddy Legal Framework
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Terms of Service Agreement
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            Please read these binding operational parameters carefully before processing booking deposits for Himalayan, plain, or corporate group journeys.
          </p>
          <div className="inline-block bg-slate-800/60 border border-slate-700/50 rounded-md px-4 py-1 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            System Revision Log: June 2026
          </div>
        </div>
      </section>

      {/* QUICK METRIC STATS INFOGRAPHIC STRIP */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-16 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { metric: 'Advance Payment', value: '30% Confirmation' },
          { metric: 'Final Clearing', value: '15 Days Prior' },
          { metric: 'Weather Protection', value: 'Dynamic Reroute' },
          { metric: 'Legal Venue', value: 'Hyderabad, IN' }
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-lg shadow-slate-200/40">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{item.metric}</p>
            <p className="text-xs md:text-sm font-black text-[#0E2A47]">{item.value}</p>
          </div>
        ))}
      </section>

      {/* SEARCH INTERFACE & FILTER SYSTEM CONTROLS */}
      <section className="max-w-6xl mx-auto px-4 mb-10">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-green-600 text-white' : 'text-slate-500 hover:bg-slate-200/60'}`}
            >
              All Provisions
            </button>
            {termsData.map(term => (
              <button
                key={term.id}
                onClick={() => setActiveTab(term.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all hidden lg:block ${activeTab === term.id ? 'bg-green-600 text-white' : 'text-slate-500 hover:bg-slate-200/60'}`}
              >
                {term.title.split('.')[0]}. Section
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search exact clause..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs bg-white focus:outline-none focus:border-green-500 font-medium placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* TWO COLUMN INTERACTIVE TERMINAL WRAPPER */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: NAVIGATION RADAR SHEET */}
        <div className="lg:col-span-1 space-y-3 sticky top-24 h-fit hidden lg:block">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold uppercase text-[#0E2A47] tracking-wider mb-3">Agreement Sub-Sections</h3>
            <div className="space-y-2">
              {termsData.map(term => (
                <div
                  key={term.id}
                  onClick={() => {
                    setActiveTab('all');
                    setTimeout(() => {
                      document.getElementById(`term-${term.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 120);
                  }}
                  className="text-xs font-medium text-slate-500 hover:text-green-600 cursor-pointer transition-colors leading-tight"
                >
                  {term.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC COMPLIANCE COPY VIEWER */}
        <div className="lg:col-span-3 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => (
                <motion.div
                  key={term.id}
                  id={`term-${term.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 border-b border-slate-100 pb-10 last:border-0"
                >
                  <h2 className="text-lg md:text-xl font-black text-[#0E2A47] tracking-tight">
                    {term.title}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    {term.content}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No terms align with your keywords</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* STATUTORY REGISTRY AND DISCLOSURE BAR */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-base md:text-lg font-black text-[#0E2A47] tracking-tight">
            Official Legal Support Channels & Formal Notices
          </h3>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            All written notices, liability queries, or clarification documents concerning these operational terms must be directed to our active grievance office coordinates below.
          </p>
          <div className="bg-white border border-slate-100 p-5 rounded-xl max-w-md mx-auto shadow-sm text-xs font-medium text-slate-600 text-left space-y-2">
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Grievance Desk</span> legal@adventurebuddy.com</div>
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Contact Line</span> +91-40-7788-9900</div>
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Corporate Office Hub</span> HITEC City, Hyderabad, Telangana, 500081, India</div>
          </div>
        </div>
      </section>
    </div>
  );
}