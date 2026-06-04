import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '@/lib/supabase-queries';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Testimonials() {
  const { data, isLoading } = useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials });
  const [current, setCurrent] = useState(0);

  const testimonials = data ?? [];
  const cardsPerPage = 3;

  const prev = () => {
    setCurrent((c) => (c === 0 ? testimonials.length - cardsPerPage : Math.max(0, c - cardsPerPage)));
  };

  const next = () => {
    setCurrent((c) => (c + cardsPerPage >= testimonials.length ? 0 : c + cardsPerPage));
  };

  // Safe slicing logic for multi-item shifting layout
  const visibleTestimonials = testimonials.length > 0 
    ? testimonials.slice(current, current + cardsPerPage).concat(
        testimonials.slice(0, Math.max(0, cardsPerPage - (testimonials.length - current)))
      ).slice(0, Math.min(cardsPerPage, testimonials.length))
    : [];

  const currentGroupIndex = Math.floor(current / cardsPerPage);
  const totalGroups = Math.ceil(testimonials.length / cardsPerPage);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Premium Shades/Meshes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.06),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(var(--primary-rgb),0.04),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
            Traveler Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 tracking-tight">
            What Travelers Say
          </h2>
          <div className="w-12 h-1 bg-primary/40 mx-auto mt-4 rounded-full" />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : testimonials.length === 0 ? null : (
          <div className="relative max-w-5xl mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[280px]">
              <AnimatePresence mode="popLayout">
                {visibleTestimonials.map((t, i) => (
                  <motion.div
                    key={`${t.id}-${current}`}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="bg-card/60 backdrop-blur-sm border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                    data-testid={`card-testimonial-${t.id}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`h-4 w-4 ${s <= Math.round(t.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} 
                            />
                          ))}
                        </div>
                        <Quote className="h-8 w-8 text-primary/10 rotate-180" />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                        "{t.review}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      {t.avatarUrl ? (
                        <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md shadow-primary/20">
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm text-foreground">{t.name}</p>
                        {t.location && <p className="text-xs text-muted-foreground/80 flex items-center gap-1">{t.location}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Premium Control Center */}
            {testimonials.length > cardsPerPage && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prev} 
                  className="rounded-full h-11 w-11 shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200" 
                  data-testid="button-testimonial-prev"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Animated Pagination Pill Indicator */}
                <div className="flex gap-2 items-center px-3 py-1.5 bg-muted/40 backdrop-blur-md rounded-full border border-border/50">
                  {Array.from({ length: totalGroups }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i * cardsPerPage)}
                      className="relative h-2 rounded-full focus:outline-none"
                      style={{ width: currentGroupIndex === i ? '24px' : '8px' }}
                    >
                      {currentGroupIndex === i && (
                        <motion.span 
                          layoutId="activeDot" 
                          className="absolute inset-0 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className={`absolute inset-0 rounded-full ${currentGroupIndex === i ? '' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} />
                    </button>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={next} 
                  className="rounded-full h-11 w-11 shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200" 
                  data-testid="button-testimonial-next"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}