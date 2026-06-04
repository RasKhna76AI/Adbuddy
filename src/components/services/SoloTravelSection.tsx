import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, CircleCheck as CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BookingForm } from '@/components/home/BookingForm';

interface SoloTravelCard {
  id: string;
  title: string;
  destination: string;
  activities: string[];
  image: string;
  price: number;
  rating: number;
}

export default function SoloTravelSection() {
  // Swapped from dynamic string matching to simple boolean state for the BookingForm component
  const [bookingOpen, setBookingOpen] = useState(false);

  const sectionDetails = {
    title: 'Solo Travel Plans',
    subtitle: 'Perfect for Independent Travelers',
    description: 'Experience the freedom and flexibility of traveling alone. Our solo travel packages are designed for independent adventurers seeking personalized experiences, meaningful connections, and the opportunity to discover yourself through travel.',
    points: [
      'Customizable itineraries tailored to your pace',
      'Solo traveler community and meetups',
      'Safety and support throughout your journey',
      'Budget-friendly options available',
    ],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  };

  const cards: SoloTravelCard[] = [
    {
      id: 'solo_adventure_1',
      title: 'European Discovery',
      destination: 'Europe',
      activities: ['City tours', 'Hiking', 'Cultural sites', 'Local cuisine'],
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      price: 1299,
      rating: 4.8,
    },
    {
      id: 'solo_adventure_2',
      title: 'Asian Exploration',
      destination: 'Asia',
      activities: ['Temple visits', 'Street food', 'Beaches', 'Mountain trekking'],
      image: 'https://images.unsplash.com/photo-1540959733332-eab4ded1ed63?w=800&q=80',
      price: 999,
      rating: 4.9,
    },
    {
      id: 'solo_adventure_3',
      title: 'Island Hopping',
      destination: 'Southeast Asia',
      activities: ['Snorkeling', 'Beach relax', 'Water sports', 'Island tours'],
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a51bf7?w=800&q=80',
      price: 899,
      rating: 4.7,
    },
  ];

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={sectionDetails.image}
                  alt={sectionDetails.title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            {/* Right: Details and Points */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <Badge className="bg-blue-100 text-blue-700 border-none mb-3 text-xs font-semibold">
                  SOLO TRAVELER
                </Badge>
                <h2 className="text-4xl font-black text-gray-900 mb-2">{sectionDetails.title}</h2>
                <p className="text-blue-600 font-semibold text-lg">{sectionDetails.subtitle}</p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {sectionDetails.description}
              </p>

              <div className="space-y-3 mb-8">
                {sectionDetails.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Solo Journey
              </button>
            </motion.div>
          </div>

          {/* Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto px-4"
          >
            {/* Centered Headline Core Element */}
            <h3 className="text-3xl font-black text-foreground mb-10 text-center tracking-tight">
              Popular Uttarakhand Outings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative w-full mx-auto"
                >
                  {/* Smooth Rounded Corner Frame Layout Container */}
                  <div className="relative overflow-hidden rounded-[24px] aspect-[3/4] cursor-pointer bg-card border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Bottom Heavy Protective Overlay Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />

                    {/* Floating Top Card Badging Layout */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <Badge className="bg-primary text-primary-foreground border-none text-xs font-bold px-3 shadow-md rounded-full">
                        Featured
                      </Badge>
                      <div className="ml-auto flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-xs font-black">{(card.rating || 0).toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Interaction Responsive Base Context Block */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1 text-white/80 text-xs mb-1 font-medium">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span className="truncate">{card.destination}</span>
                      </div>
                      <h3 className="text-white font-black text-xl mb-2 leading-tight tracking-tight">
                        {card.title}
                      </h3>

                      {/* Animated Activity Tags block layout */}
                      <div className="mb-4 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <p className="text-white/60 text-[11px] uppercase tracking-wider font-bold mb-1.5">Highlights</p>
                        <div className="flex flex-wrap gap-1">
                          {card.activities.slice(0, 3).map((activity, i) => (
                            <span key={i} className="text-[10px] bg-primary/90 font-semibold text-primary-foreground px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Call-to-Action segment */}
                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <div>
                          <p className="text-white/50 text-[10px] uppercase font-bold tracking-wide">Starting from</p>
                          <p className="text-white font-black text-xl tracking-wide">
                            ₹{card.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          onClick={() => setBookingOpen(true)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-black px-4 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-md"
                        >
                          Explore →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Renders the multi-step form targeted directly to the booking_inquiries relation schema */}
      {bookingOpen && (
        <BookingForm open={bookingOpen} onClose={() => setBookingOpen(false)} />
      )}
    </>
  );
}