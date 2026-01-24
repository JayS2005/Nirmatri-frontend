import { Heart, ShoppingCart, Star, TrendingUp, Award } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Card } from "@/app/components/ui/card";
const sponsoredProducts = [
  {
    id: 1,
    name: "Premium Silk Hand-Embroidered Kurta Set",
    artisan: "Priya Sharma",
    price: 2499,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1568371600021-36b968768c30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNsb3RoaW5nfGVufDF8fHx8MTc2ODk4MDg4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Bestseller",
    sponsored: true,
    inStock: true,
    soldCount: "2.5K+ sold",
  },
  {
    id: 2,
    name: "Artisan Handwoven Cotton Saree",
    artisan: "Lakshmi Reddy",
    price: 3299,
    originalPrice: 4999,
    rating: 5.0,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd292ZW4lMjB0ZXh0aWxlc3xlbnwxfHx8fDE3Njg5ODA4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Bestseller",
    sponsored: true,
    inStock: true,
    soldCount: "5K+ sold",
  },
  {
    id: 3,
    name: "Luxury Crochet Designer Shawl",
    artisan: "Anjali Devi",
    price: 1899,
    originalPrice: 2999,
    rating: 4.8,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1612208141706-2fbd2d45a143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzY4OTUzMDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Trending",
    sponsored: true,
    inStock: true,
    soldCount: "1.8K+ sold",
  },
  {
    id: 4,
    name: "Heritage Terracotta Dinner Set (24 pieces)",
    artisan: "Meera Patel",
    price: 2799,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1611152171907-886a565484b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwYXJ0aXNhbnxlbnwxfHx8fDE3Njg5ODA4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Bestseller",
    sponsored: true,
    inStock: true,
    soldCount: "3.2K+ sold",
  },
];

export function SponsoredProducts() {
  const discount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/30 to-white dark:from-gray-800/30 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="font-semibold">Sponsored</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl dark:text-gray-100">Top Rated Products</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highly recommended by our community</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsoredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 bg-white dark:bg-gray-800"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Sponsored Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 shadow-lg">
                  <TrendingUp className="h-3 w-3" />
                  Sponsored
                </div>

                {/* Badge */}
                <Badge className="absolute top-3 right-3 bg-blue-900 shadow-lg animate-pulse">
                  {product.badge}
                </Badge>

                {/* Discount */}
                <div className="absolute top-14 right-3 bg-red-600 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                  {discount(product.originalPrice, product.price)}% OFF
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick Actions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex gap-3">
                  <Button 
                    size="icon" 
                    className="rounded-full shadow-2xl bg-white text-gray-800 hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:scale-110"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="rounded-full shadow-2xl bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-950 hover:to-blue-900 transition-all duration-300 hover:scale-110"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Product Name */}
                <h3 className="text-base line-clamp-2 min-h-[48px] dark:text-gray-100 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {product.name}
                </h3>
                
                {/* Artisan */}
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-300" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">by {product.artisan}</p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    <Star className="h-3 w-3 fill-white" />
                    {product.rating}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Sold Count */}
                <div className="text-sm text-green-700 dark:text-green-400 font-semibold">
                  {product.soldCount}
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-2xl text-blue-900 dark:text-blue-400">₹{product.price.toLocaleString()}</span>
                  <span className="text-base text-gray-500 dark:text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-950 hover:to-blue-900 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}