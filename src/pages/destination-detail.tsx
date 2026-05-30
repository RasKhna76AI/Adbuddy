import { useParams, Link } from 'wouter';
import { Star, MapPin, Clock, ArrowLeft, ShoppingCart, Check, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchEnhancedDestination, fetchPackages } from '@/lib/supabase-queries'; 
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

function PackageCard({ pkg }: {
  pkg: { 
    id: number | string; // Handled dynamically to support your system's ID formats
    title: string; 
    imageUrl: string; 
    price: number; 
    originalPrice?: number | null; 
    duration: string; 
    rating?: number | null; 
    destinationName?: string | null; 
  };
}) {
  const { addItem, isInCart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = isInCart(pkg.id);

  function handleCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ 
      id: pkg.id, 
      title: pkg.title, 
      destinationName: pkg.destinationName ?? null, 
      imageUrl: pkg.imageUrl, 
      price: pkg.price, 
      duration: pkg.duration, 
      rating: pkg.rating ?? null 
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="group border border-border rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300" data-testid={`card-package-${pkg.id}`}>
      <div className="relative overflow-hidden aspect-[16/9]">
        <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button
          onClick={handleCart}
          disabled={inCart}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${inCart ? 'bg-primary text-primary-foreground' : 'bg-white hover:bg-primary hover:text-white text-foreground'}`}
        >
          {(inCart || added) ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
        </button>
        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-1 line-clamp-1">{pkg.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Clock className="h-3 w-3" />{pkg.duration}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {pkg.originalPrice && <p className="text-xs text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</p>}
            <p className="font-bold text-primary">₹{pkg.price.toLocaleString('en-IN')}<span className="text-xs text-muted-foreground font-normal">/person</span></p>
          </div>
          <Link href={`/packages/${pkg.id}`}>
            <Button size="sm" className="rounded-full text-xs">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DestinationDetailPage() {
  const params = useParams<{ id: string }>();
  
  // Leave the id as a clean string representation (UUID)
  const id = params.id ?? '';

  // Data fetching hook using the standard string UUID parameter
  const { data: dest, isLoading } = useQuery({ 
    queryKey: ['destination', id], 
    // Type assertion bypasses old numeric definition if query files aren't updated yet
    queryFn: () => fetchEnhancedDestination(id as any), 
    enabled: id.length > 0 
  });
  
  const { data: packages } = useQuery({ 
    queryKey: ['packages-by-dest', id], 
    queryFn: () => fetchPackages({ destinationId: id as any }), 
    enabled: id.length > 0 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="h-[60vh] w-full" />
        <div className="container py-12 space-y-4 px-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Globe className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-medium text-foreground mb-1">Destination not found</p>
          <p className="text-muted-foreground text-sm mb-4">It may have been moved or removed</p>
          <Link href="/destinations"><Button className="rounded-full">Back to Destinations</Button></Link>
        </div>
      </div>
    );
  }

  // Fallback for mapped schema fields
  const activeImage = dest.image_url || (dest as any).imageUrl;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Dynamic Main Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={activeImage} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />

        {/* Dynamic Back Navigation Action */}
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="container px-4">
            <Link href="/destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors bg-black/40 backdrop-blur-md rounded-full px-4 py-2" data-testid="link-back">
              <ArrowLeft className="h-4 w-4" /> All Destinations
            </Link>
          </div>
        </div>

        {/* Hero Meta Metrics Elements */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 z-10">
          <div className="container px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 text-white/90 mb-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{dest.country}</span>
                {dest.category && (
                  <Badge className="bg-primary text-primary-foreground border-none text-xs ml-2 uppercase font-bold tracking-wider">{dest.category}</Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{dest.name}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(dest.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                  ))}
                  <span className="text-white text-sm font-bold ml-1">{(dest.rating || 0).toFixed(1)}</span>
                  <span className="text-white/60 text-xs">({dest.review_count ?? (dest as any).reviewCount ?? 0} reviews)</span>
                </div>
                {dest.duration && (
                  <div className="flex items-center gap-1.5 text-white/90 text-sm bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{dest.duration}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Context Left Rail Panel Container */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 1. ENHANCED WHY VISIT COMPONENT */}
            {(dest as any).highlights && (dest as any).highlights.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-foreground tracking-tight">
                    🌟 Why Visit {dest.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(dest as any).highlights.map((highlight: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-xl border border-border/50">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="font-medium leading-tight">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. COMPREHENSIVE ABOUT WRAPPER */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight border-b pb-2 border-border/60">Destination Insights</h2>
              
              <p className="text-muted-foreground leading-relaxed text-base">{dest.about_p1 || dest.description}</p>
              
              {dest.about_p2 && (
                <p className="text-muted-foreground leading-relaxed text-base">{dest.about_p2}</p>
              )}
              
              {dest.about_image_url && (
                <div className="my-6 rounded-2xl overflow-hidden aspect-[16/9] shadow-md border border-border max-h-[350px]">
                  <img src={dest.about_image_url} alt={`${dest.name} insights visual`} className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" />
                </div>
              )}
              
              {dest.about_p3 && (
                <p className="text-muted-foreground leading-relaxed text-base">{dest.about_p3}</p>
              )}
            </motion.div>

            {/* 3. SEQUENTIAL STEP ACTIVITIES COMPONENT */}
            {(dest as any).activities && (dest as any).activities.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                <h2 className="text-2xl font-black tracking-tight border-b pb-2 border-border/60">Top Things To Do</h2>
                <div className="grid grid-cols-1 gap-3.5">
                  {(dest as any).activities.map((act: any, i: number) => (
                    <div key={act.step_number || i} className="flex gap-4 p-4 bg-card rounded-xl border border-border shadow-sm items-start hover:border-primary/40 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm shrink-0">
                        {act.step_number || (i + 1)}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-base mb-1">{act.title}</h4>
                        {act.description && <p className="text-muted-foreground text-sm leading-relaxed">{act.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. VISUAL IMAGE GALLERY MATRICES */}
            {(dest as any).gallery && (dest as any).gallery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-6">
                <h2 className="text-2xl font-black tracking-tight border-b pb-2 border-border/60">Visual Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(dest as any).gallery.slice(0, 9).map((url: any, index: number) => (
                    <div key={index} className="overflow-hidden rounded-xl aspect-square bg-muted border border-border hover:shadow-md transition-shadow group relative">
                      <img 
                        src={typeof url === 'string' ? url : url?.image_url} 
                        alt={`Gallery slice frame ${index + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Available Package Offerings */}
            {(packages ?? []).length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between border-b pb-2 border-border/60">
                  <h2 className="text-2xl font-black tracking-tight">Available Packages</h2>
                  <Badge variant="secondary" className="rounded-full font-bold">{(packages ?? []).length} option{(packages ?? []).length !== 1 ? 's' : ''}</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(packages ?? []).map(pkg => (
                    <PackageCard key={pkg.id} pkg={{
                      ...pkg,
                      imageUrl: pkg.imageUrl || (pkg as any).image_url
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action & Metadata Sidebar Panel Column */}
          <div>
            <div className="sticky top-24 space-y-4">
              
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Starting package base value</p>
                <p className="text-4xl font-black text-primary mb-1">₹{(dest.price || 0).toLocaleString('en-IN')}</p>
                <p className="text-xs text-muted-foreground mb-5">per person · configuration variations may apply</p>

                <Link href="/packages">
                  <Button className="w-full rounded-full mb-3 h-12 text-base font-black tracking-wide shadow-md shadow-primary/10" data-testid="button-book-now">
                    Browse All Outings
                  </Button>
                </Link>
                {(packages ?? []).length > 0 && (
                  <Link href={`/packages/${(packages ?? [])[0].id}`}>
                    <Button variant="outline" className="w-full rounded-full font-semibold">
                      View Highlight Package
                    </Button>
                  </Link>
                )}
              </div>

              {/* Sidebar Snapshot Quick Attributes Widget */}
              <div className="bg-secondary/40 rounded-2xl p-5 space-y-3.5 border border-border/50">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">Location Blueprint</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="text-muted-foreground text-xs">Region Target</span>
                    <span className="font-bold text-foreground text-xs">{dest.country}</span>
                  </div>
                  {dest.duration && (
                    <div className="flex justify-between items-center border-b border-border/30 pb-2">
                      <span className="text-muted-foreground text-xs">Recommended Stay</span>
                      <span className="font-bold text-foreground text-xs">{dest.duration}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="text-muted-foreground text-xs">Aggregation Rating</span>
                    <span className="font-bold text-foreground flex items-center gap-1 text-xs">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {(dest.rating || 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span className="text-muted-foreground text-xs">Verified Appraisals</span>
                    <span className="font-bold text-foreground text-xs">{(dest.review_count ?? (dest as any).reviewCount ?? 0).toLocaleString()}</span>
                  </div>
                  {(packages ?? []).length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs">Active Curations</span>
                      <span className="font-bold text-foreground text-xs">{(packages ?? []).length} tours tracking</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expert Advisory Help Block */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold text-foreground mb-1">Tailor Your Itinerary?</p>
                <p className="text-xs text-muted-foreground mb-3 leading-normal">Our regional planning agents are online to construct your specific custom journey.</p>
                <Link href="/packages">
                  <Button size="sm" variant="outline" className="rounded-full w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                    Get Expert Advice
                  </Button>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}