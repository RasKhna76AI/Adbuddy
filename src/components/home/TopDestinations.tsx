import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchTopDestinations } from '@/lib/supabase-queries';

interface DestinationData {
  id: number;
  name: string;
  country: string;
  imageUrl: string;
  rating: number | null;
  reviewCount: number | null;
  price: number;
  duration?: string | null;
}

interface DestinationCardProps {
  dest: Required<Pick<DestinationData, 'id' | 'name' | 'country' | 'imageUrl' | 'price'>> & {
    rating: number;
    reviewCount: number;
    duration?: string | null;
  };
  index: number;
}

function DestinationCard({ dest, index }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`card-destination-${dest.id}`}
    >
      <Link 
        href={`/destinations/${dest.id}`} 
        className="block group relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        {/* Core Media Framing Container */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={dest.imageUrl}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle Ambient Vignette Block */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Informational Breakdown Sheet */}
        <div className="p-5 space-y-3">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-0.5">
              {dest.country}
            </span>
            <h3 className="font-black text-base text-[#0E2A47] tracking-tight group-hover:text-primary transition-colors">
              {dest.name}
            </h3>
          </div>

          {/* Typographic Rating Identity Component (Strictly No Icons) */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-100 font-mono">
              {dest.rating.toFixed(1)}
            </span>
            <span className="text-slate-400 font-medium">
              ({dest.reviewCount} verified logs)
            </span>
          </div>

          <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Base Fare</span>
              <p className="font-black text-[#0E2A47] text-base font-mono">
                INR {dest.price.toLocaleString()}
              </p>
            </div>
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-green-100 text-primary text-xs font-bold group-hover:bg-primary group-hover:text-white transition-all">
              Explore Route
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function TopDestinations() {
  const { data, isLoading } = useQuery<DestinationData[]>({ 
    queryKey: ['top-destinations'], 
    queryFn: fetchTopDestinations 
  });

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* COMPONENT ENTRY GRID CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2 max-w-xl"
          >
            <p className="text-primary font-bold text-xs uppercase tracking-widest">
              Curated Track Deployments
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0E2A47] tracking-tight">
              Top Adventure Horizons
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Explore our highly requested routes, mountain base camps, and regional cultural corridors verified by ground logistical teams.
            </p>
          </motion.div>
          
          <Link href="/destinations">
            <Button variant="outline" className="hidden md:flex rounded-full border-slate-200 text-xs font-bold text-[#0E2A47] hover:bg-slate-50">
              View All Horizons
            </Button>
          </Link>
        </div>

        {/* DYNAMIC VIEWPORT INJECTION LAYER */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-white">
                <Skeleton className="aspect-[4/3] w-full bg-slate-100" />
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 bg-slate-100" />
                    <Skeleton className="h-5 w-40 bg-slate-100" />
                  </div>
                  <Skeleton className="h-4 w-28 bg-slate-100" />
                  <div className="pt-2 flex justify-between items-center">
                    <Skeleton className="h-6 w-20 bg-slate-100" />
                    <Skeleton className="h-7 w-24 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data ?? []).map((dest, i) => (
              <DestinationCard
                key={dest.id}
                dest={{
                  id: dest.id,
                  name: dest.name,
                  country: dest.country,
                  imageUrl: dest.imageUrl,
                  price: dest.price,
                  duration: dest.duration,
                  rating: dest.rating ?? 0,
                  reviewCount: dest.reviewCount ?? 0
                }}
                index={i}
              />
            ))}
          </div>
        )}

        {/* MOBILE FALLBACK OVERLAY NAVIGATION INTERFACE */}
        <div className="mt-10 text-center md:hidden">
          <Link href="/destinations">
            <Button variant="outline" className="w-full rounded-full border-slate-200 text-xs font-bold text-[#0E2A47] py-3">
              View All Horizons
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}