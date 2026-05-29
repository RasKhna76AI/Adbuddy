import { motion } from 'framer-motion';
import { Shield, Headphones, Globe, Award } from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Access to over 500 destinations across 80 countries worldwide with curated local experiences.',
  },
  {
    icon: Shield,
    title: 'Safe Travel',
    description: 'Your safety is our priority. All our packages include comprehensive travel insurance coverage.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support available in multiple languages for any assistance you need.',
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    description: 'We guarantee the best prices on all our packages. Find it cheaper, and we will match it.',
  },
];

// Reusable SVG "images" related to the travel topics
const reasonImages = [
  // Global Coverage
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C28.1 90 10 71.9 10 50C10 28.1 28.1 10 50 10C71.9 10 90 28.1 90 50C90 71.9 71.9 90 50 90ZM50 20C41.7 20 35 26.7 35 35C35 43.3 41.7 50 50 50C58.3 50 65 43.3 65 35C65 26.7 58.3 20 50 20Z" fill="currentColor" fill-opacity="0.2"/>
    <path d="M50 65V85M35 75C35 83.3 41.7 90 50 90C58.3 90 65 83.3 65 75V65H35V75Z" fill="currentColor" fill-opacity="0.2"/>
  </svg>,

  // Safe Travel
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0L0 20V50C0 72.4 22.4 100 50 100C77.6 100 100 72.4 100 50V20L50 0ZM90 48.9C90 66.8 72.2 88.3 50 90C27.8 88.3 10 66.8 10 48.9V26L50 10L90 26V48.9Z" fill="currentColor" fill-opacity="0.2"/>
    <path d="M50 30L65 45H35L50 30ZM50 70V50M35 60H65" stroke="currentColor" stroke-width="5"/>
  </svg>,

  // 24/7 Support
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C28.1 90 10 71.9 10 50C10 28.1 28.1 10 50 10C71.9 10 90 28.1 90 50C90 71.9 71.9 90 50 90ZM50 25V50L65 65" stroke="currentColor" stroke-width="5"/>
    <rect x="25" y="40" width="10" height="20" rx="5" fill="currentColor" fill-opacity="0.2"/>
    <rect x="65" y="40" width="10" height="20" rx="5" fill="currentColor" fill-opacity="0.2"/>
  </svg>,

  // Best Price Guarantee
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0L85 20V50L50 100L15 50V20L50 0ZM75 26.9L50 12.6L25 26.9V47.4L50 83.1L75 47.4V26.9Z" fill="currentColor" fill-opacity="0.2"/>
    <path d="M40 30H60V50L50 60L40 50V30Z" fill="currentColor" fill-opacity="0.2"/>
    <path d="M50 35C47.2 35 45 37.2 45 40C45 42.8 47.2 45 50 45C52.8 45 55 42.8 55 40C55 37.2 52.8 35 50 35Z" fill="currentColor" fill-opacity="0.2"/>
  </svg>
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container relative">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <p className="text-primary font-semibold text-xs uppercase tracking-widest mb-3">Our Advantages</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Why Choose Us</h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            We've refined every aspect of travel to create seamless, safe, and truly unforgettable global adventures, built around you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 relative z-10">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group h-[320px] [perspective:1000px]" // Set depth for the flip
            >
              <div className="relative h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl shadow-border/50 group-hover:shadow-primary/20">
                
                {/* Front Side */}
                <div className="absolute inset-0 h-full w-full rounded-3xl border border-border bg-card p-10 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                  <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-primary/20 flex items-center justify-center text-primary group-hover:border-primary/50 group-hover:scale-105 transition-all duration-500">
                    <div className="absolute inset-2 rounded-full bg-primary/10" />
                    {/* Render the specific SVG graphic */}
                    <div className="w-16 h-16 text-primary z-10">
                        {reasonImages[i]}
                    </div>
                  </div>
                  <h3 className="font-extrabold text-xl mt-8 text-foreground tracking-tight group-hover:text-primary transition-colors">{reason.title}</h3>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span>Learn More</span>
                    <span className="text-lg">→</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-3xl border border-primary bg-primary p-10 flex flex-col items-center justify-center text-center text-primary-foreground [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-inner">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <reason.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-primary-foreground/90 text-base leading-relaxed font-medium">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}