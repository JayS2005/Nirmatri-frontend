import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1594047820492-fed4bcfbbdd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGJhbm5lcnxlbnwxfHx8fDE3Njg5ODIzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Discover Handcrafted Excellence",
    subtitle: "Exclusive Collection from Master Artisans",
    cta: "Shop Now",
    tag: "NEW ARRIVALS",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1728379860220-acb84e9d1274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd29ya2luZ3xlbnwxfHx8fDE3Njg5MTEzNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Support Local Artisans",
    subtitle: "Every Purchase Empowers Women Creators",
    cta: "Learn More",
    tag: "MAKE AN IMPACT",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1660980041852-230420b8f99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwd2VhdmluZ3xlbnwxfHx8fDE3Njg4ODE3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Handwoven Treasures",
    subtitle: "Traditional Crafts, Modern Designs",
    cta: "Explore",
    tag: "BEST SELLERS",
  },
];

export function VideoLikeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-black dark:bg-gray-950 transition-colors duration-300">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                {/* Tag */}
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
                    {slide.tag}
                  </span>
                </div>

                {/* Title with glowing effect */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
                  {slide.subtitle}
                </p>

                {/* CTA */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-950 hover:to-blue-900 text-white px-8 py-6 text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    {slide.cta}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? "bg-white w-12 h-2" 
                : "bg-white/50 w-2 h-2 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-900 to-blue-800 transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </section>
  );
}