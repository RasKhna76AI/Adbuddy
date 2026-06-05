import { Link } from 'wouter';
import { ShoppingCart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchPopularPackages } from '@/lib/supabase-queries';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface PackageData {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  originalPrice?: number | null;
  duration: string;
  groupSize?: number | null;
  rating: number | null;
  reviewCount: number | null;
  featured: boolean | null;
  destinationName?: string | null;
}

interface PackageCardProps {
  pkg: Required<Pick<PackageData, 'id' | 'title' | 'imageUrl' | 'price' | 'duration'>> & {
    originalPrice?: number | null;
    groupSize?: number | null;
    rating: number;
    reviewCount: number;
    featured: boolean;
    destinationName?: string | null;
  };
  index: number;
}

function PackageCard({ pkg, index }: PackageCardProps) {
  const { addItem, isInCart } = useCart();
  const [addedFeedback, setAddedFeedback] = useState(false);
  
  const savings = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : null;
  const inCart = isInCart(pkg.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ 
      id: pkg.id, 
      title: pkg.title, 
      destinationName: pkg.destinationName ?? null, 
      imageUrl: pkg.imageUrl, 
      price: pkg.price, 
      duration: pkg.duration, 
      rating: pkg.rating 
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
      data-testid={`card-package-${pkg.id}`}
    >
      {savings && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-red-600 text-white border-none rounded-full px-3 text-[10px] font-black tracking-wider">
            {savings}% SPECIAL FARE REDUCTION
          </Badge>
        </div>
      )}

      {/* Cart Utility Trigger */}
      <button
        onClick={handleAddToCart}
        disabled={inCart}
        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
          inCart ? 'bg-primary text-white' : 'bg-green-100 backdrop-blur-sm hover:bg-primary hover:text-white text-slate-700'
        }`}
        title={inCart ? 'Added to current route' : 'Add to path pipeline'}
      >
        {(inCart || addedFeedback) ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      </button>

      {/* Thumbnail Aspect Container */}
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={pkg.imageUrl} 
          alt={pkg.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="p-5 space-y-4">
        <div>
          {pkg.destinationName && (
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">
              {pkg.destinationName} Region
            </span>
          )}
          <h3 className="font-black text-base text-[#0E2A47] line-clamp-2 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
            {pkg.title}
          </h3>
        </div>

        {/* Informational Microchips (Replacing Icons with Structural Layout Tags) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
          <span className="bg-slate-100 px-2.5 py-1 rounded-md tracking-wide">
            DURATION: {pkg.duration.toUpperCase()}
          </span>
          {pkg.groupSize && (
            <span className="bg-slate-100 px-2.5 py-1 rounded-md tracking-wide">
              LOGISTICAL LIMIT: MAX {pkg.groupSize}
            </span>
          )}
        </div>

        {/* Typographic Core Verification Value */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-100 font-mono font-bold">
            {pkg.rating.toFixed(1)}
          </span>
          <span className="text-slate-400 font-medium">
            ({pkg.reviewCount} customer evaluations)
          </span>
        </div>

        {/* Financial Action Footer */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-4">
          <div>
            {pkg.originalPrice && (
              <p className="text-xs text-slate-400 line-through font-mono">
                INR {pkg.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="font-black text-[#0E2A47] text-lg font-mono leading-none">
              INR {pkg.price.toLocaleString()}
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider block mt-1">/ seat base</span>
            </p>
          </div>
          
          <Link href={`/packages/${pkg.id}`}>
            <Button size="sm" className="rounded-full bg-green-500 text-white hover:bg-green-600 hover:text-white transition-all text-xs font-bold px-4" data-testid={`button-book-package-${pkg.id}`}>
              View Schedule
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function PopularPackages() {
  const { data, isLoading } = useQuery<PackageData[]>({ 
    queryKey: ['popular-packages'], 
    queryFn: fetchPopularPackages 
  });

  return (
    <section className="py-24 bg-slate-50/60 border-y border-slate-100">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* COMPONENT HEADER FIELD STACK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="space-y-2 max-w-xl"
          >
            <p className="text-primary font-bold text-xs uppercase tracking-widest">
              Handpicked Expedition Plans
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0E2A47] tracking-tight">
              Popular Route Packages
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Select comprehensively mapped travel operations packed with fixed amenities, custom paths, and verified local guidance.
            </p>
          </motion.div>
          
          <Link href="/packages">
            <Button variant="outline" className="hidden md:flex rounded-full border-slate-200 text-xs font-bold text-[#0E2A47] hover:bg-white shadow-sm">
              View All Packages
            </Button>
          </Link>
        </div>

        {/* DATA CONDITIONAL VIEWPORT CONTAINER */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-white p-1">
                <Skeleton className="aspect-[16/10] w-full bg-slate-100 rounded-xl" />
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48 bg-slate-100" />
                    <Skeleton className="h-4 w-32 bg-slate-100" />
                  </div>
                  <Skeleton className="h-4 w-24 bg-slate-100" />
                  <div className="pt-3 border-t flex justify-between items-center">
                    <Skeleton className="h-6 w-24 bg-slate-100" />
                    <Skeleton className="h-8 w-24 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data ?? []).slice(0, 3).map((pkg, i) => (
              <PackageCard 
                key={pkg.id} 
                pkg={{ 
                  id: pkg.id,
                  title: pkg.title,
                  imageUrl: pkg.imageUrl,
                  price: pkg.price,
                  originalPrice: pkg.originalPrice,
                  duration: pkg.duration,
                  groupSize: pkg.groupSize,
                  destinationName: pkg.destinationName,
                  rating: pkg.rating ?? 0, 
                  reviewCount: pkg.reviewCount ?? 0, 
                  featured: pkg.featured ?? false 
                }} 
                index={i} 
              />
            ))}
          </div>
        )}

        {/* MOBILE FALLBACK CONTROLS */}
        <div className="mt-10 text-center md:hidden">
          <Link href="/packages">
            <Button variant="outline" className="w-full rounded-full border-slate-200 bg-white text-xs font-bold text-[#0E2A47] py-3 shadow-sm">
              View All Packages
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}