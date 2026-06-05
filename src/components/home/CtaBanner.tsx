import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

export function CtaBanner() {
  return (
    <>
      {/* 
        Main Banner Canvas Wrap
        Preserves your verified background image template link directly 
      */}
      <section 
        className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        {/* Ambient Darkening Core Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />
        
        {/* Secondary Delicate Pattern Overlay */}
        <div className="absolute inset-0 z-0 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
            alt="Adventure awaits background element"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* 
          MODIFIED ICON ANCHOR
          Upscaled, localized into the top-right canvas zone, and precisely rotated by 40 degrees
        */}
        <div className="absolute top-8 left-8 z-10 hidden sm:block pointer-events-none opacity-40">
          <Plane
            className="h-54 w-54 text-white transform rotate-[40deg] transition-transform duration-700 hover:scale-105" />
        </div>

        {/* Central Foreground Interactive Layer */}
        <div className="container relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
              Start Planning
            </p>

            {/* 
              TRANSPARENT TEXT MASK
              Perfectly mirrors the exact custom text-clipping architecture 
              from your main hero text section utilizing the base landscape asset.
            */}
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-cover bg-center bg-no-repeat select-none max-w-3xl mx-auto leading-tight"
              style={{ backgroundImage: "url('/bgimage.jpg')" }}
            >
              Ready for Your Next Adventure?
            </h2>

            <p className="text-slate-200 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium drop-shadow-sm">
              Join over 15,000 travelers who have discovered their dream destinations with Adventure Buddy tracking logistics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/packages">
                <Button 
                  size="lg" 
                  className="bg-green-400 text-white hover:bg-primary rounded-full px-8 h-12 text-xs font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-95 w-full sm:w-auto" 
                  data-testid="button-explore-packages"
                >
                  Explore Packages
                </Button>
              </Link>
              <Link href="/destinations">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-12 text-xs font-bold uppercase tracking-wider backdrop-blur-sm w-full sm:w-auto" 
                  data-testid="button-view-destinations"
                >
                  View Destinations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}