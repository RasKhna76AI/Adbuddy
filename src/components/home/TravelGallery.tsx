import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchGallery } from '@/lib/supabase-queries';

interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  location?: string | null;
}

export function TravelGallery() {
  const { data, isLoading } = useQuery<GalleryItem[]>({ 
    queryKey: ['gallery-home'], 
    queryFn: () => fetchGallery(9) 
  });

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* COMPONENT HEADER CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2 max-w-xl"
          >
            <p className="text-primary font-bold text-xs uppercase tracking-widest">
              Visual Path Verification
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0E2A47] tracking-tight">
              Expedition Media Records
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Browse verified on-site field captures, pass conditions, and group transit environments recorded by our ground operation units.
            </p>
          </motion.div>
          
          <Link href="/gallery">
            <Button variant="outline" className="hidden md:flex rounded-full border-slate-200 text-xs font-bold text-[#0E2A47] hover:bg-slate-50">
              View All Logs
            </Button>
          </Link>
        </div>

        {/* BENTO GRID CONTENT FLOW */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton 
                key={i} 
                className={`w-full rounded-2xl bg-slate-100 ${
                  i === 1 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto md:h-[420px]' : 'aspect-[4/3]'
                }`} 
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {(data ?? []).slice(0, 7).map((img, i) => {
              // Custom layout logic to make an asymmetric Bento-box display
              const isFeatured = i === 0;
              return (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-slate-50 border border-slate-100 ${
                    isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                  }`}
                  data-testid={`img-gallery-${img.id}`}
                >
                  {/* Media Content Container */}
                  <div className="w-full h-full">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient Typography Layer (Strictly No Icons) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/90 via-[#0E2A47]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                    <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 space-y-1">
                      <p className="text-white font-black text-sm md:text-base tracking-tight leading-tight">
                        {img.title}
                      </p>
                      {img.location && (
                        <span className="text-[10px] md:text-xs text-slate-300 font-bold uppercase tracking-wider block">
                          Coordinates: {img.location}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* MOBILE RESPONSIVE FALLBACK CONTROLS */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/gallery">
            <Button variant="outline" className="w-full rounded-full border-slate-200 text-xs font-bold text-[#0E2A47] py-3">
              View All Logs
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}