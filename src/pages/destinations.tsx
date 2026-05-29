import { useState } from 'react';
import { Link } from 'wouter';
import { Star, MapPin, Search, Globe, TrendingUp, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchDestinations } from '@/lib/supabase-queries';

const CATEGORIES = ['All', 'Hill Station', 'Adventure', 'Wildlife', 'Pilgrimage', 'Nature', 'Heritage'];

interface Destination {
  id: number;
  name: string;
  country: string;
  image_url?: string;
  imageUrl?: string;
  price: number;
  rating: number;
  review_count?: number;
  reviewCount?: number;
  featured?: boolean;
  description?: string | null;
  category?: string | null;
}

function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  const img = dest.imageUrl || dest.image_url || '';
  const currentRating = dest.rating ?? 0;
  const currentPrice = dest.price ?? 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group relative"
      data-testid={`card-destination-${dest.id}`}
    >
      <Link href={`/destinations/${dest.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
          <img
            src={img}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Advanced Depth Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black" />

          {/* Top layout metrics badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            {dest.featured ? (
              <Badge className="bg-primary hover:bg-primary text-primary-foreground border-none text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider">
                Featured
              </Badge>
            ) : dest.category ? (
              <Badge variant="secondary" className="bg-black/40 backdrop-blur-md text-white border-none text-[10px] font-medium px-2.5 py-0.5 rounded-md">
                {dest.category}
              </Badge>
            ) : <div />}
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-lg px-2 py-0.5 border border-white/10">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white text-xs font-bold">{currentRating.toFixed(1)}</span>
            </div>
          </div>

          {/* Core Info Block */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 w-full flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
            <div className="flex items-center gap-1 text-white/70 text-xs mb-1">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="font-medium tracking-wide">{dest.country}</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-1.5 leading-tight group-hover:text-primary transition-colors duration-200">
              {dest.name}
            </h3>

            {/* Structured transition container to protect content alignment bounds */}
            <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 pb-2">
              <div className="overflow-hidden">
                {dest.description && (
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-1">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">From</p>
                <p className="text-white font-extrabold text-lg">₹{currentPrice.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-primary text-primary-foreground text-xs font-bold px-3.5 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 shadow-md shadow-primary/20">
                Explore →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function DestinationCardWide({ dest, index }: { dest: Destination; index: number }) {
  const img = dest.imageUrl || dest.image_url || '';
  const currentRating = dest.rating ?? 0;
  const reviews = dest.reviewCount ?? dest.review_count ?? 0;
  const currentPrice = dest.price ?? 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group"
      data-testid={`card-destination-${dest.id}`}
    >
      <Link href={`/destinations/${dest.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
          <img src={img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-primary text-primary-foreground border-none text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-md uppercase">
              Top Pick
            </Badge>
          </div>

          <div className="absolute inset-0 flex items-end p-6 z-10">
            <div className="w-full">
              <p className="text-white/70 text-xs flex items-center gap-1 mb-1.5">
                <MapPin className="h-3 w-3 text-primary" />
                {dest.country}
              </p>
              <h3 className="text-white font-extrabold text-2xl md:text-3xl mb-2 group-hover:text-primary transition-colors">
                {dest.name}
              </h3>
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-md px-2 py-0.5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-semibold">{currentRating.toFixed(1)}</span>
                  </div>
                  <span className="text-white/60 text-xs">({reviews} reviews)</span>
                </div>
                <span className="text-primary font-black text-lg md:text-xl">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, isLoading } = useQuery({ queryKey: ['destinations'], queryFn: () => fetchDestinations(50) });

  const filtered = (data as Destination[] ?? []).filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    
    const matchCategory = activeCategory === 'All' || 
      (d.category && d.category.toLowerCase() === activeCategory.toLowerCase());

    return matchSearch && matchCategory;
  });

  const featured = filtered.filter(d => d.featured);
  const rest = filtered.filter(d => !d.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Layout Banner Hero */}
      <div className="relative h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80"
          alt="Destinations Background"
          className="w-full h-full object-cover scale-105 transform motion-safe:animate-[pulse_8s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-bold uppercase tracking-widest mb-4">
              <Globe className="h-3.5 w-3.5 text-primary animate-spin-slow" /> Explore your next journey
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Find Your Destination
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto mb-8 font-medium">
              Explore magnificent hidden gems, holy shrines, and adventure tracks across Uttarakhand.
            </p>

            <div className="relative max-w-xl mx-auto w-full px-2">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              {/* Fixed pl-13 layout compilation failure with standard pl-12 classes */}
              <Input
                className="pl-12 pr-6 h-14 rounded-2xl bg-background/95 backdrop-blur-sm text-foreground border-none shadow-2xl text-base placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Search spots, towns or districts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Subnav pill strip layout */}
      <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-16 z-30 shadow-sm">
        <div className="container flex items-center gap-3 py-3.5 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2 border-r border-border pr-4 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
            <span>Filters</span>
          </div>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
                activeCategory === c
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10 scale-[1.02]'
                  : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="container py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
              <Globe className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <p className="font-bold text-foreground text-lg mb-1">No destinations found</p>
            <p className="text-muted-foreground text-sm">We couldn't match any travel spot to your active filters. Try adjustments.</p>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <p className="text-sm text-muted-foreground font-medium">
                Showing <span className="font-bold text-foreground">{filtered.length}</span> luxury spot{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="h-4 w-4" />
                <span>Popularity Index</span>
              </div>
            </div>

            {/* Featured Section Banner Highlight matrices */}
            {featured.length > 0 && !search && activeCategory === 'All' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-foreground tracking-tight">Featured Collections</h2>
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {featured.slice(0, 2).map((dest, i) => (
                    <DestinationCardWide key={dest.id} dest={dest} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Main structural loop array map */}
            <div className="space-y-6">
              {featured.length > 0 && !search && activeCategory === 'All' && (
                <h2 className="text-2xl font-black text-foreground tracking-tight">Explore More Getaways</h2>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                <AnimatePresence mode="popLayout">
                  {(search || activeCategory !== 'All' ? filtered : rest.length > 0 ? rest : filtered).map((dest, i) => (
                    <DestinationCard key={dest.id} dest={dest} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
