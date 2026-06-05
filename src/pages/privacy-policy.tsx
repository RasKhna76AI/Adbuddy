import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function PrivacyPolicyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const legalSections: LegalSection[] = useMemo(() => [
    {
      id: 'intro',
      title: '1. Introduction & Scope',
      content: (
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          This Privacy Policy ("Policy") details the regulatory parameters regarding how 
          <strong className="text-[#0E2A47] font-semibold"> Adventure Buddy </strong> 
          ("Company," "we," "us," or "our") aggregates, processes, archives, and protects client data. 
          By utilizing our reservation engines, mountain transit portals, high-altitude mapping modules, or 
          submitting reservation requests across our digital interfaces, you give unconditional consent to the data architecture protocols described herein.
        </p>
      )
    },
    {
      id: 'collection',
      title: '2. Information We Collect',
      content: (
        <div className="space-y-4 text-slate-600 text-sm md:text-base">
          <p>
            We process data strictly required to clear legal hotel booking channels, mountain travel permissions, and secure digital transaction ledgers:
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-[#0E2A47] text-xs uppercase tracking-wider">A. Personal Identification Data Given Voluntarily:</h4>
            <p className="text-xs md:text-sm leading-relaxed">
              Full legal name, authenticated email address, cellular contact channels, full physical residence addresses, dates of birth, international passport documentation records, emergency contact configurations, and critical physical health datasets (required for high-altitude fitness confirmation).
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-[#0E2A47] text-xs uppercase tracking-wider">B. Automatically Logged Data & Metadata:</h4>
            <p className="text-xs md:text-sm leading-relaxed">
              Static/Dynamic Internet Protocol (IP) records, explicit geolocation coordinates, hardware browser agent definitions, operational system tags, and cookie identifiers tracked during engagement on our pricing tables.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'processing',
      title: '3. Legal Framework for Data Processing',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>We leverage personal telemetry arrays exclusively under the following performance frameworks:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border border-slate-100 p-4 rounded-xl">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Execution</span>
              <p className="text-xs text-slate-500 mt-2">To process high-altitude permits, secure commercial hotel allocations, issue transaction tracking strings, and confirm ground vehicle provisions.</p>
            </div>
            <div className="border border-slate-100 p-4 rounded-xl">
              <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">Compliance</span>
              <p className="text-xs text-slate-500 mt-2">To align operations with national financial audit standards, security verification registries, and local regional border regulations.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'compliance',
      title: '4. India Travel & High-Altitude Compliance',
      content: (
        <div className="space-y-4 text-slate-600 text-sm md:text-base">
          <p>
            Operating expeditions throughout Uttarakhand, the Himalayan inner lines, and plain corridors requires deep coordination with regional authorities. All identity data collected is managed under strict procedural conditions:
          </p>
          <div className="p-4 border-l-4 border-orange-500 bg-orange-50/40 rounded-r-xl">
            <p className="text-xs md:text-sm font-medium text-[#0E2A47] leading-relaxed">
              <strong className="text-orange-600 font-bold">Government Redaction Protocol:</strong> If a user presents or references national security identification numbers (such as Aadhaar, MyNumber, or Resident Registration Numbers) to clear remote base camp checkpoints, those numbers are treated as write-only data. They are encrypted at rest, omitted entirely from public-facing screens, and never transmitted over plaintext networks.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sharing',
      title: '5. Third-Party Data Disclosures',
      content: (
        <div className="space-y-3 text-slate-600 text-sm md:text-base">
          <p>We do not market, lease, trade, or distribute your identity elements. Information shares are limited to certified partners executing your travel plan:</p>
          <ul className="space-y-2 text-xs md:text-sm pl-4 list-decimal marker:font-bold marker:text-blue-600">
            <li>Regional destination hoteliers, homestay hosts, and base-camp logistics managers.</li>
            <li>Certified transit pilots and off-road driving partners navigating mountain sectors.</li>
            <li>Payment gateway systems processing corporate UPI, net banking, or tokenized cards.</li>
            <li>Emergency medical infrastructure setups and local mountain search rescue centers.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'security',
      title: '6. Cybersecurity & Encryption Specifications',
      content: (
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Our cloud databases use standard SSL/TLS data pipelines alongside comprehensive AES-256 server storage encryption. Access control rules are managed via strict least-privilege principles. While we maintain advanced technical safeguards, users acknowledge that open web data transfers cannot be guaranteed as completely invulnerable, and Adventure Buddy disclaims liability for unforeseen network interceptions.
        </p>
      )
    },
    {
      id: 'rights',
      title: '7. Statutory Data Rights & Erasure Access',
      content: (
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Users retain full control to inspect, correct, update, or completely erase their profile parameters. To file an explicit data scrubbing request, connect with our designated compliance office via our secure communication terminal. Requests are managed within legal data retention limits required for fiscal audit tracking.
        </p>
      )
    },
    {
      id: 'liability',
      title: '8. Complete Legal Disclaimer & Waiver of Claims',
      content: (
        <div className="space-y-3 text-slate-600 text-xs md:text-sm leading-relaxed bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-800">
          <p className="font-bold text-white uppercase tracking-wider text-center border-b border-slate-800 pb-2">
            Mandatory Non-Liability & Arbitration Provision
          </p>
          <p>
            By accessing this platform, you explicitly waive your right to pursue class-action lawsuits, civil complaints, or damages claims against Adventure Buddy regarding unexpected platform downtime, malicious third-party script actions, server network failures, or unprompted security incidents. 
          </p>
          <p>
            All data interactions are executed entirely at the user's risk. Any unresolved transactional or technical conflict originating from this privacy layout will be adjudicated solely through independent arbitration panels located in Hyderabad, Telangana, India, under the provisions of the Arbitration and Conciliation Act.
          </p>
        </div>
      )
    }
  ], []);

  const filteredSections = useMemo(() => {
    return legalSections.filter(section => {
      const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            section.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || section.id === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, legalSections]);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-blue-50">
      
      {/* HEADER SECTION WITH TOPOGRAPHY BLUE OVERLAY */}
      <section className="relative overflow-hidden bg-[#0E2A47] pt-32 pb-24 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-orange-500 font-serif italic text-lg tracking-wide block">
            Adventure Buddy Legal Operations
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Privacy Framework & Data Terms
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Review the structural parameters governing personal identity files, encryption standards, and complete liability protections.
          </p>
          <div className="inline-block bg-slate-800/60 border border-slate-700/50 rounded-full px-4 py-1 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Effective Date Cycle: June 2026
          </div>
        </div>
      </section>

      {/* QUICK STATS INFOGRAPHIC ROW */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-16 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Encryption Standard', value: 'AES-256 bit' },
          { label: 'Data Retention', value: 'Audit Compliant' },
          { label: 'Third-Party Sales', value: '0% Absolute' },
          { label: 'Dispute Location', value: 'Hyderabad, IN' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-lg shadow-slate-200/50">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{stat.label}</p>
            <p className="text-sm md:text-base font-black text-[#0E2A47]">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* SEARCH INTERFACE & NAVIGATION MENU TAB BAR */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-200/60'}`}
            >
              Show All Clauses
            </button>
            {legalSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hidden lg:block ${activeTab === sec.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-200/60'}`}
              >
                {sec.title.split('.')[0]}. Section
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Filter policy terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* MAIN DATA RENDERING CANVAS */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFTSIDE INTERACTIVE RADAR (NAVIGATION AND SEARCH SYNC) */}
        <div className="lg:col-span-1 space-y-3 sticky top-24 h-fit hidden lg:block">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold uppercase text-[#0E2A47] tracking-wider mb-3">Policy Quick Index</h3>
            <div className="space-y-1">
              {legalSections.map(sec => (
                <div
                  key={sec.id}
                  onClick={() => {
                    setActiveTab('all');
                    setTimeout(() => {
                      document.getElementById(`sec-${sec.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }}
                  className="text-xs font-medium text-slate-500 hover:text-blue-600 cursor-pointer py-1 truncate transition-colors"
                >
                  {sec.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHTSIDE COMPREHENSIVE COMPLIANCE VIEW DECK */}
        <div className="lg:col-span-3 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <motion.div
                  key={section.id}
                  id={`sec-${section.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 border-b border-slate-100 pb-10 last:border-0"
                >
                  <h2 className="text-xl md:text-2xl font-black text-[#0E2A47] tracking-tight">
                    {section.title}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    {section.content}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No Clauses Match Search Filter</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER CORPORATE CONTACT PANEL COMPONENT */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-lg md:text-xl font-black text-[#0E2A47] tracking-tight">
            Formal Legal Communications & Grievance Contact
          </h3>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            For structured privacy validations, formal disclosure queries, or to exercise your digital erasure rights, route documents to our statutory compliance registry channel.
          </p>
          <div className="bg-white border border-slate-100 p-6 rounded-2xl max-w-md mx-auto shadow-sm text-xs font-medium text-slate-600 text-left space-y-2">
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Registry Channel</span> legal@adventurebuddy.com</div>
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Operations Desk</span> +91-40-7788-9900</div>
            <div><span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Arbitration Office Address</span> HITEC City, Hyderabad, Telangana, 500081, India</div>
          </div>
        </div>
      </section>
    </div>
  );
}