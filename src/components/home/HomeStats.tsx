import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchHomepageStats } from '@/lib/supabase-queries';

export function HomeStats() {
  const { data } = useQuery({ 
    queryKey: ['homepage-stats'], 
    queryFn: fetchHomepageStats 
  });

  const stats = [
    { value: data ? `${data.totalDestinations}+` : '500+', label: 'Destinations Outlined' },
    { value: data ? `${data.totalPackages}+` : '200+', label: 'Itineraries Prepared' },
    { value: data ? `${(data.totalTravelers / 1000).toFixed(0)}K+` : '15K+', label: 'Verified Explorers' },
    { value: data ? `${data.yearsExperience}+` : '10+', label: 'Years of Field Logistics' },
  ];

  return (
    <section className="py-24 bg-[#0E2A47] text-white relative overflow-hidden">
      {/* Structural Subtle Geometric Mesh Background */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        
        {/* COMPONENT HEADER STACK */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-orange-500 block"
          >
            Adventure Buddy Performance Ledger
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black tracking-tight text-white"
          >
            Validated Operational Scale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-300 text-sm md:text-base font-medium leading-relaxed"
          >
            Our real-time transactional database synchronizes with Supabase networks to track regional deployment milestones, verified departures, and path coordination records.
          </motion.p>
        </div>

        {/* METRICS DISPLAY CANVAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group border-t border-slate-700/40 pt-6"
            >
              {/* Numeric Metric Output Block */}
              <p className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 transition-transform group-hover:scale-105 duration-300">
                {s.value}
              </p>
              
              {/* Structural Label Field */}
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}