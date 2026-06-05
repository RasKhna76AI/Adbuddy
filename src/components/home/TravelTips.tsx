import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts } from '@/lib/supabase-queries';

interface BlogPostData {
  id: number;
  title: string;
  imageUrl: string;
  category?: string | null;
  readTime?: string | null;
  excerpt?: string | null;
}

export function TravelTips() {
  const { data, isLoading } = useQuery<BlogPostData[]>({ 
    queryKey: ['blog-tips'], 
    queryFn: () => fetchBlogPosts(3) 
  });

  return (
    <section className="py-24 bg-slate-100 border-t border-slate-100">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* COMPONENT INTERFACE MANAGEMENT ROW */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2 max-w-xl"
          >
            <p className="text-primary font-bold text-xs uppercase tracking-widest">
              Ground Intelligence
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0E2A47] tracking-tight">
              Logistics &amp; Terrain Guides
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Analyze comprehensive high-altitude summaries, tactical route planning, and checklist metrics published regularly by our transit supervisors.
            </p>
          </motion.div>
          
          <Link href="/blog">
            <Button variant="outline" className="hidden md:flex rounded-full border-slate-200 text-xs font-bold text-[#0E2A47] hover:bg-slate-50">
              View All Manuals
            </Button>
          </Link>
        </div>

        {/* CONDITION-BASED VIEWPORT COMPILATION */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-white">
                <Skeleton className="aspect-[16/9] w-full bg-slate-100" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-20 bg-slate-100" />
                  <Skeleton className="h-5 w-48 bg-slate-100" />
                  <Skeleton className="h-4 w-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data ?? []).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                data-testid={`card-blog-${post.id}`}
              >
                {/* Media Image Card Layout */}
                <div className="aspect-[16/9] overflow-hidden bg-slate-50">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                {/* Content Details Block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {post.category && (
                        <Badge className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-none text-[10px] font-black tracking-wide uppercase px-2 py-0.5 rounded">
                          {post.category}
                        </Badge>
                      )}
                      {post.readTime && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                          LOG INDEX: {post.readTime.toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-black text-base text-[#0E2A47] tracking-tight line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-slate-500 font-medium text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Operational Action Row */}
                  <div className="pt-2 border-t border-slate-50">
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="inline-flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider group-hover:text-blue-700 transition-all" 
                      data-testid={`link-read-more-${post.id}`}
                    >
                      Analyze Blueprint Documentation
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* MOBILE FALLBACK TRIGGERS */}
        <div className="mt-10 text-center md:hidden">
          <Link href="/blog">
            <Button variant="outline" className="w-full rounded-full border-slate-200 text-xs font-bold text-[#0E2A47] py-3">
              View All Manuals
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}