import { supabase } from './supabase';

// ──────────────────────────────────────────────────────────
// ── DATA TYPE & SCHEMA DEFINITIONS
// ──────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  mobile: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user_id: string;
  order_id: number | null;
  trip_id: number | null;
  packageTitle: string | null;
  package_title?: string | null; // For database compliance fallback
  amount: number;
  status: string;
  paymentMethod: string | null;
  payment_method?: string | null; // For database compliance fallback
  payment_id: string | null;
  createdAt: string;
  created_at?: string; // For database compliance fallback
}

export interface Trip {
  id: number;
  user_id: string;
  order_id: number | null;
  package_id: number | null;
  package_title: string | null;
  destination_name: string | null;
  image_url: string | null;
  status: string;
  travel_date: string;
  return_date: string | null;
  travelers: number;
  price: number;
  is_favorite: boolean;
  created_at: string;
}

export interface UserAddress {
  id: number;
  user_id: string;
  label: string;
  address_line: string;
  city: string;
  state: string | null;
  country: string;
  pincode: string | null;
  is_default: boolean;
  created_at: string;
}

export interface PackageSummary {
  id: number;
  title: string;
  destination_name: string | null;
  image_url: string;
  price: number;
  duration: string;
  rating: number | null;
}

export interface CartItem {
  id: number;
  user_id: string;
  package_id: number;
  quantity: number;
  travelers: number;
  added_at: string;
  package?: PackageSummary;
}

export interface OrderItem {
  id: number;
  order_id: number;
  package_id: number | null;
  package_title: string;
  destination: string | null;
  image_url: string | null;
  unit_price: number;
  travelers: number;
  total_price: number;
}

export interface Order {
  id: number;
  user_id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_method: string | null;
  payment_id: string | null;
  payment_status: string;
  traveler_name: string | null;
  traveler_email: string | null;
  traveler_mobile: string | null;
  travel_date: string | null;
  notes: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  description?: string | null;
  imageUrl?: string;
  image_url?: string | null;
  rating: number;
  reviewCount?: number;
  review_count?: number | null;
  price: number;
  duration?: string | null;
  featured?: boolean | null;
  category?: string | null;
}

export interface Package {
  id: number;
  title: string;
  destinationId?: number;
  destinationName?: string | null;
  description?: string | null;
  imageUrl: string;
  price: number;
  originalPrice?: number | null;
  duration: string;
  groupSize?: number | null;
  rating: number;
  reviewCount: number;
  featured: boolean;
  includes?: string | null;
}

export interface TopDestination {
  id: number;
  name: string;
  country: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  price: number;
  duration?: string | null;
}

export interface PopularPackage {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  originalPrice?: number | null;
  duration: string;
  groupSize?: number | null;
  rating: number;
  reviewCount: number;
  featured: boolean;
  destinationName?: string | null;
}

export interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  location?: string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  avatarUrl?: string | null;
  location?: string | null;
}

export interface BlogPost {
  id: number;
  title: string;
  imageUrl: string;
  excerpt?: string | null;
  content?: string | null;
  author?: string | null;
  author_avatar?: string | null;
  category?: string | null;
  readTime?: string | null;
  published_at?: string | null;
}

export interface HomepageStats {
  totalDestinations: number;
  totalPackages: number;
  totalTravelers: number;
  yearsExperience: number;
}

export interface ReviewComment {
  id: number;
  review_id: number;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  comment: string;
  created_at: string;
}

export interface Review {
  id: number;
  package_id: number;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  rating: number;
  title: string | null;
  comment: string;
  likes_count: number;
  verified: boolean;
  created_at: string;
  review_comments?: ReviewComment[];
  user_liked?: boolean;
}

export interface Notification {
  id: number;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  action_url: string | null;
  created_at: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  discount_percent: number | null;
  discount_amount: number | null;
  coupon_code: string | null;
  package_id: number | null;
  destination_id: number | null;
  valid_from: string;
  valid_until: string | null;
  active: boolean;
  badge: string | null;
  created_at: string;
}

export interface CancelHistory {
  id: number;
  user_id: string;
  order_id: number | null;
  order_number: string | null;
  package_title: string | null;
  destination: string | null;
  original_amount: number | null;
  refund_amount: number | null;
  refund_status: string | null;
  reason: string | null;
  cancelled_at: string;
}

export interface EnhancedDestination {
  id: number;
  name: string;
  country: string;
  description: string | null;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  price: number;
  duration: string | null;
  featured: boolean;
  category: string | null;
  about_p1: string | null;
  about_p2: string | null;
  about_p3: string | null;
  about_image_url: string | null;
  highlights: string[];
  activities: { step_number: number; title: string; description: string | null }[];
  gallery: string[];
}

// Replace or add this specific detail retrieval function
export async function fetchEnhancedDestination(id: number): Promise<EnhancedDestination | null> {
  const { data, error } = await supabase
    .from('destinations')
    .select(`
      *,
      destination_highlights(highlight),
      destination_activities(step_number, activity_title, activity_description),
      destination_gallery(image_url)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching detailed destination data:", error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    country: data.country,
    description: data.description,
    imageUrl: data.image_url,
    rating: data.rating ?? 0,
    reviewCount: data.review_count ?? 0,
    price: data.price ?? 0,
    duration: data.duration,
    featured: data.featured,
    category: data.category,
    
    // Parsed relational properties
    about_p1: data.about_p1 ?? null,
    about_p2: data.about_p2 ?? null,
    about_p3: data.about_p3 ?? null,
    about_image_url: data.about_image_url ?? null,
    
    highlights: (data.destination_highlights ?? []).map((h: any) => h.highlight),
    
    activities: (data.destination_activities ?? [])
      .sort((a: any, b: any) => a.step_number - b.step_number)
      .map((act: any) => ({
        step_number: act.step_number,
        title: act.activity_title,
        description: act.activity_description
      })),
      
    gallery: (data.destination_gallery ?? []).map((g: any) => g.image_url)
  };
}

// ──────────────────────────────────────────────────────────
// ── USER PROFILE & IDENTIFICATION
// ──────────────────────────────────────────────────────────

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return { data: data as UserProfile | null, error };
}

export async function upsertUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      id: userId,
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data: data as UserProfile | null, error };
}

// ──────────────────────────────────────────────────────────
// ── HOMEPAGE DATA AGGREGATIONS
// ──────────────────────────────────────────────────────────

export async function fetchHomepageStats(): Promise<HomepageStats> {
  const [{ count: totalDestinations }, { count: totalPackages }, { count: totalTravelers }] =
    await Promise.all([
      supabase.from('destinations').select('*', { count: 'exact', head: true }),
      supabase.from('packages').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
    ]);

  return {
    totalDestinations: totalDestinations ?? 0,
    totalPackages: totalPackages ?? 0,
    totalTravelers: totalTravelers ?? 0,
    yearsExperience: 10,
  };
}

// ──────────────────────────────────────────────────────────
// ── DESTINATIONS DATA LAYER
// ──────────────────────────────────────────────────────────

export async function fetchDestinations(limit = 50): Promise<Destination[]> {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((d) => ({
    id: d.id,
    name: d.name || 'Unnamed Spot',
    country: d.country || 'Unknown',
    description: d.description || '',
    imageUrl: d.image_url || '',
    image_url: d.image_url || '',
    rating: d.rating ?? 0,
    reviewCount: d.review_count ?? 0,
    review_count: d.review_count ?? 0,
    price: d.price ?? 0,
    duration: d.duration ?? null,
    // CRITICAL FIX: Explicitly fall back to false if the database field is null
    featured: d.featured === true, 
    // CRITICAL FIX: Trim whitespace and handle empty categories safely
    category: d.category ? d.category.trim() : 'Nature', 
  }));
}

export async function fetchTopDestinations(limit = 8): Promise<TopDestination[]> {
  const { data, error } = await supabase
    .from('destinations')
    .select('id, name, country, image_url, rating, review_count, price, duration')
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((d) => ({
    id: d.id,
    name: d.name,
    country: d.country,
    imageUrl: d.image_url,
    rating: d.rating ?? 0,
    reviewCount: d.review_count ?? 0,
    price: d.price ?? 0,
    duration: d.duration ?? null,
  }));
}

export async function fetchDestination(id: number): Promise<Destination | null> {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    country: data.country,
    description: data.description,
    imageUrl: data.image_url,
    image_url: data.image_url,
    rating: data.rating ?? 0,
    reviewCount: data.review_count ?? 0,
    review_count: data.review_count ?? 0,
    price: data.price ?? 0,
    duration: data.duration ?? null,
    featured: data.featured ?? false,
    category: data.category ?? null,
  };
}

// ──────────────────────────────────────────────────────────
// ── PACKAGES DATA LAYER
// ──────────────────────────────────────────────────────────

export async function fetchPackages(filters?: {
  destinationId?: number;
  featured?: boolean;
  limit?: number;
}): Promise<Package[]> {
  let query = supabase
    .from('packages')
    .select('*')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false });

  if (filters?.destinationId) {
    query = query.eq('destination_id', filters.destinationId);
  }
  if (filters?.featured) {
    query = query.eq('featured', true);
  }
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    destinationId: pkg.destination_id,
    destinationName: pkg.destination_name,
    description: pkg.description,
    imageUrl: pkg.image_url,
    price: pkg.price ?? 0,
    originalPrice: pkg.original_price ?? null,
    duration: pkg.duration ?? '',
    groupSize: pkg.group_size ?? null,
    rating: pkg.rating ?? 0,
    reviewCount: pkg.review_count ?? 0,
    featured: pkg.featured ?? false,
    includes: pkg.includes ?? null,
  }));
}

export async function fetchPopularPackages(limit = 6): Promise<PopularPackage[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('id, title, image_url, price, original_price, duration, group_size, rating, review_count, featured, destination_name')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    imageUrl: pkg.image_url,
    price: pkg.price ?? 0,
    originalPrice: pkg.original_price ?? null,
    duration: pkg.duration ?? '',
    groupSize: pkg.group_size ?? null,
    rating: pkg.rating ?? 0,
    reviewCount: pkg.review_count ?? 0,
    featured: pkg.featured ?? false,
    destinationName: pkg.destination_name ?? null,
  }));
}

export async function fetchPackage(id: number): Promise<Package | null> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    destinationId: data.destination_id,
    destinationName: data.destination_name,
    description: data.description,
    imageUrl: data.image_url,
    price: data.price ?? 0,
    originalPrice: data.original_price ?? null,
    duration: data.duration,
    groupSize: data.group_size ?? null,
    rating: data.rating ?? 0,
    reviewCount: data.review_count ?? 0,
    featured: data.featured ?? false,
    includes: data.includes ?? null,
  };
}

// ──────────────────────────────────────────────────────────
// ── MEDIA & MEDIA GALLERY ARCHIVE
// ──────────────────────────────────────────────────────────

export async function fetchGallery(limit = 9): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery')
    .select('id, title, image_url, location')
    .order('id', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((img) => ({
    id: img.id,
    title: img.title ?? '',
    imageUrl: img.image_url,
    location: img.location ?? null,
  }));
}

// ──────────────────────────────────────────────────────────
// ── TESTIMONIAL SERVICE HANDLERS
// ──────────────────────────────────────────────────────────

export async function fetchTestimonials(limit = 12): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, name, review, rating, avatar_url, location')
    .order('id', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((t) => ({
    id: t.id,
    name: t.name ?? 'Anonymous',
    review: t.review ?? '',
    rating: t.rating ?? 5,
    avatarUrl: t.avatar_url ?? null,
    location: t.location ?? null,
  }));
}

// ──────────────────────────────────────────────────────────
// ── CONTENT MANAGEMENT ENGINE (BLOG ENGINE)
// ──────────────────────────────────────────────────────────

export async function fetchBlogPosts(limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, image_url, excerpt, category, read_time')
    .order('id', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((post) => ({
    id: post.id,
    title: post.title ?? '',
    imageUrl: post.image_url ?? '',
    excerpt: post.excerpt ?? null,
    category: post.category ?? null,
    readTime: post.read_time ?? null,
  }));
}

// ──────────────────────────────────────────────────────────
// ── UTILITIES
// ──────────────────────────────────────────────────────────

export function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TT-${ts}-${rand}`;
}

export async function fetchBlogPost(id: number): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title ?? '',
    imageUrl: data.image_url ?? '',
    excerpt: data.excerpt ?? null,
    content: data.content ?? null,
    author: data.author ?? null,
    author_avatar: data.author_avatar ?? null,
    category: data.category ?? null,
    readTime: data.read_time ?? null,
    published_at: data.published_at,
  };
}

// ──────────────────────────────────────────────────────────
// ── TRIPS DATA LAYER
// ──────────────────────────────────────────────────────────

export async function fetchTrips(userId: string): Promise<Trip[]> {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .order('travel_date', { ascending: true });

  if (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }

  return (data ?? []).map((t) => ({
    id: t.id,
    user_id: t.user_id,
    order_id: t.order_id ?? null,
    package_id: t.package_id ?? null,
    package_title: t.package_title ?? null,
    destination_name: t.destination_name ?? null,
    image_url: t.image_url ?? null,
    status: t.status,
    travel_date: t.travel_date,
    return_date: t.return_date ?? null,
    travelers: t.travelers ?? 1,
    price: t.price ?? 0,
    is_favorite: t.is_favorite ?? false,
    created_at: t.created_at,
  }));
}

export async function toggleFavoriteTrip(tripId: number, isFavorite: boolean): Promise<boolean> {
  const { data, error } = await supabase
    .from('trips')
    .update({ is_favorite: isFavorite })
    .eq('id', tripId)
    .select()
    .single();

  if (error) {
    console.error("Error updating trip favorite status:", error);
    throw error;
  }

  return data.is_favorite;
}

export async function fetchFavoriteTrips(userId: string): Promise<Trip[]> {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .order('travel_date', { ascending: true });

  if (error) {
    console.error("Error fetching favorite trips:", error);
    throw error;
  }

  return (data ?? []).map((t) => ({
    id: t.id,
    user_id: t.user_id,
    order_id: t.order_id ?? null,
    package_id: t.package_id ?? null,
    package_title: t.package_title ?? null,
    destination_name: t.destination_name ?? null,
    image_url: t.image_url ?? null,
    status: t.status,
    travel_date: t.travel_date,
    return_date: t.return_date ?? null,
    travelers: t.travelers ?? 1,
    price: t.price ?? 0,
    is_favorite: t.is_favorite ?? false,
    created_at: t.created_at,
  }));
}

export async function fetchTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }

  return (data ?? []).map((tx) => ({
    id: tx.id,
    user_id: tx.user_id,
    order_id: tx.order_id ?? null,
    trip_id: tx.trip_id ?? null,
    packageTitle: tx.package_title ?? 'Travel Package',
    package_title: tx.package_title,
    amount: tx.amount ?? 0,
    status: tx.status,
    paymentMethod: tx.payment_method ?? null,
    payment_method: tx.payment_method,
    payment_id: tx.payment_id ?? null,
    createdAt: tx.created_at,
    created_at: tx.created_at,
  }));
}