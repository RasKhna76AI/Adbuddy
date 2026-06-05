import { Link } from 'wouter';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0E2A47] text-slate-200 relative overflow-hidden pt-16">
      
      {/* GLOBAL FOOTER COMPONENT MAIN CONTAINER */}
      <div className="container max-w-6xl mx-auto px-4 pb-12 relative z-10">
        
        {/* UPPER DISTRIBUTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 items-start border-b border-slate-700/40 pb-16">
          
          {/* COLUMN 1: CORPORATE MARK & BRAND STATEMENT */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="AdventureBuddy Identity Asset" 
                className="h-8 w-auto object-contain" 
              />
              <span className="text-xl font-black text-white tracking-tight">AdventureBuddy</span>
            </Link>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
              Discover extraordinary destinations worldwide with your most trusted travel companion.
            </p>
            
            {/* SOCIAL COMMUNITY LINK STRUCTURAL ROW */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Follow Us
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  { Icon: Facebook, href: '#' },
                  { Icon: Instagram, href: '#' },
                  { Icon: Twitter, href: '#' },
                  { Icon: Youtube, href: '#' }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href} 
                    className="w-8 h-8 rounded-full bg-slate-800/60 text-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center border border-slate-700/30"
                  >
                    <item.Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINK DIRECTORY */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-semibold">
              {[
                { href: '/', label: 'Home' },
                { href: '/destinations', label: 'Destinations' },
                { href: '/packages', label: 'Packages' },
                { href: '/gallery', label: 'Media' },
                { href: '/blog', label: 'Blogs' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICE SUPPORT MATRIX */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">Support</h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-semibold">
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/contact-us', label: 'Contact Us' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms-of-service', label: 'Terms of Service' },
                { href: '/cookie-policy', label: 'Cookie Policy' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: B2B COMMERCIAL ALLIANCES */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">Business</h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-semibold">
              {[
                { href: '/business/agent', label: 'Agent' },
                { href: '/business/travel-partner', label: 'Travel Partner' },
                { href: '/business/hotels-partner', label: 'Hotels Partner' },
                { href: '/business/partner', label: 'Business Partner' },
                { href: '/business/advertise', label: 'Advertise With Us' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: LOGISTICAL COMMUNICATIONS COORDINATES */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3.5 text-xs md:text-sm font-semibold text-slate-300">
              <li>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">HQ Operations</span>
                Hyderabad, Telangana, India
              </li>
              <li>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Electronic Mail</span>
                info@adventurebuddy.in
              </li>
              <li>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Central Hotline</span>
                +91-40-1234-5678
              </li>
            </ul>

            <h4 className="font-black text-white text-xs uppercase tracking-wider mt-6 mb-3">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Secure terminal email input" 
                className="bg-slate-900/40 text-xs px-3 py-2 rounded-lg flex-1 outline-none focus:ring-1 focus:ring-blue-500 text-slate-200 placeholder:text-slate-500 border border-slate-700/60 font-medium" 
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* 
          ARCHITECTURAL BACKGROUND TEXT MASK
          Implements full-width 'ADVENTURE' headline typography across the base layer.
          Clips your target background image asset transparently.
        */}
        <div className="w-full relative select-none pointer-events-none overflow-hidden h-28 md:h-40 lg:h-40 flex items-end justify-center z-0 opacity-80 border-t border-slate-700/20 bg-transparent">
          <h2 
            className="w-full font-sans font-black uppercase m-0 p-0 tracking-tighter text-[14vw] leading-[0.75] text-transparent bg-clip-text bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/bgimage.jpg')",
              WebkitBackgroundClip: "text" // Ensures explicit Safari/WebKit pipeline support
            }}
          >
            Adventure
          </h2>
        </div>
      </div>

      {/* COPYRIGHT LEGAL DISCLOSURE CANVAS */}
      <div className="bg-[#0A1E33] relative z-10 border-t border-slate-800">
        <div className="container max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Adventure Buddy. All rights reserved.</p>
          <p>Verified Ground Intelligence Asset for explorers everywhere</p>
        </div>
      </div>

    </footer>
  );
}
