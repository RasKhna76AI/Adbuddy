import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Compass, ShieldCheck, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Import your Dialog/Modal component here if you have one, for example:
import { BookingForm } from '@/components/home/BookingForm';

const reasons = [
  {
    icon: Compass,
    title: 'Local Destination Experts',
    description: 'Deep root network across Uttarakhand, from hidden trails in Chopta to spiritual circuits in Char Dham.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Safe Travel',
    description: '100% verified mountain-trained drivers, clean certified vehicles, and strictly audited safe stays.',
  },
  {
    icon: Clock,
    title: '24/7 Regional Assistance',
    description: 'Round-the-clock emergency support to safely handle mountain weather changes and road updates.',
  },
  {
    icon: Users,
    title: 'Community Trusted Value',
    description: 'Over 12+ years of trusted experience managing family, institutional, school, and corporate groups.',
  },
];

export function WhyChooseUs() {
  // State to manage the visibility of the booking form modal
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT SIDE CONTENT - Information and Guidelines */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-serif italic text-xl tracking-wide">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight leading-tight">
                Discover Our Travel Guideline
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We've refined every aspect of travel to create seamless, safe, and truly unforgettable regional adventures, built completely around your requirements.
              </p>
            </div>

            {/* Checkmark List Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex items-start gap-2.5 group">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-blue-950 text-sm md:text-base tracking-tight">
                      {reason.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* REDIRECT TO PACKAGES PAGE */}
            <div className="pt-4">
              <Link href="/packages">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-8 py-6 text-sm uppercase tracking-wider transition-all shadow-md shadow-blue-600/10">
                  All Packages
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT - High Impact Promotional Media Card */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl min-h-[450px] lg:min-h-full group">
            {/* Background Promotional Image */}
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
              alt="Discover New Experiences"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Dynamic Layout Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/40 to-black/30" />
            
            {/* Deal Text Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white space-y-4">
              <p className="font-serif italic text-3xl tracking-wide text-white/90">
                discover
              </p>
              <p className="text-xs uppercase font-bold tracking-widest text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                It's Limited Seating! Hurry Up
              </p>
              
              <div className="flex items-baseline justify-center gap-2 py-2">
                <span className="text-6xl md:text-8xl font-black text-orange-500 tracking-tighter">
                  15
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-orange-500 uppercase tracking-wide">
                  % Off
                </span>
              </div>

              <h3 className="text-xl md:text-3xl font-black tracking-tight text-white max-w-md drop-shadow-sm">
                New Experiences in Uttarakhand
              </h3>
              
              {/* OPEN BOOKING FORM ON CLICK */}
              <div className="pt-4">
                <Button 
                  onClick={() => setBookingOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-10 py-6 rounded-lg text-sm shadow-xl shadow-orange-950/50 uppercase tracking-wider border border-orange-400/20 transition-all"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {bookingOpen && <BookingForm open={bookingOpen} onClose={() => setBookingOpen(false)} />}
    </section>
  );
}