import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat relative overflow-hidden pt-24"
      style={{ backgroundImage: "url('/bgimage.jpg')" }}
    >
      {/* Dark Matte Geometric Interface Overlay */}
      <div className="absolute inset-0 bg-[#0E2A47]/90 backdrop-blur-md z-0" />

       {/* 
        ARCHITECTURAL BACKGROUND TEXT MASK
        Full-width 'ADVENTURE' base headline typography tracking the floor of the viewport.
        Clips your public folder asset transparently with safari core support overrides.
      */}
      <div className="w-full relative select-none pointer-events-none overflow-hidden h-24 md:h-40 lg:h-56 flex items-end justify-center z-0 opacity-40 border-t border-white/5 bg-transparent mt-auto">
        <h2 
          className="w-full text-center font-sans font-black uppercase m-0 p-0 tracking-tighter text-[17vw] leading-[0.75] text-transparent bg-clip-text bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/bgimage.jpg')",
            WebkitBackgroundClip: "text"
          }}
        >
          ADVENTURE
        </h2>
      </div>

      {/* CENTRAL CORE OVERVIEW PANEL */}
      <div className="container max-w-md mx-auto px-4 my-auto relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* CENTER VISUAL STATUS ASSET */}
        <div className="w-48 h-48 mb-8 rounded-2xl overflow-hidden bg-slate-950/40 border border-white/10 p-2 backdrop-blur-sm flex items-center justify-center shadow-2xl">
          <img 
            src="/404.gif" 
            alt="Terminal Exception Graphic" 
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              // Fallback if the target .gif file is temporarily missing in /public
              e.currentTarget.src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400&q=80";
            }}
          />
        </div>

        <Card className="w-full bg-slate-950/40 border-white/10 rounded-2xl backdrop-blur-sm shadow-2xl text-white">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="h-6 w-6 text-primary animate-pulse" />
              <h1 className="text-xl font-black uppercase tracking-wider text-white">
                Service Under Development
              </h1>
            </div>

            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              We apologize for any inconvenience caused. This sector of the Adventure Buddy tracking node is currently undergoing maintenance or infrastructure routing layout upgrades.
            </p>

            <div className="pt-4 border-t border-white/5">
              <Link href="/packages">
                <button className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-green-100 hover:bg-green-200 text-green-800 text-xs font-bold uppercase tracking-wider py-3.5 transition-all shadow-lg active:scale-95">
                  <ArrowLeft className="h-3.5 w-3.5" /> Return to Active Packages
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}