import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import testimonialsData from "../data/testimonials.json";

export default function TestimonialsPage() {
  const [activeSection, setActiveSection] = useState("testimonials");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["testimonials"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "testimonials") {
      // Already on testimonials page
      return;
    }
    // Navigate back to home page
    window.location.href = "/";
  };

  const testimonials = testimonialsData;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600"
          }`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
      <title>Kurniawan Dwi Saputra - {activeSection}</title>
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <MobileHeader
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      <div className="lg:ml-80 pt-20 lg:pt-0">
        <section id="testimonials" className="bg-white dark:bg-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header Section */}
            <div className="mb-12">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                Testimoni
              </h1>
              <div className="mb-6 h-1 w-16 bg-slate-200 dark:bg-slate-700"></div>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-6xl leading-relaxed">
                Dalam setiap proyek, kepuasan klien adalah prioritas utama saya.
                Testimoni ini mencerminkan dedikasi saya untuk membangun
                aplikasi yang berfungsi dengan baik dan sesuai dengan yang
                diinginkan.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border dark:border-gray-700 overflow-hidden group"
                >
                  {/* Testimonial Content */}
                  <div className="p-6">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.rating}/5
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>

                    {/* Order Details */}
                    <div className="mb-4">
                      <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs rounded-full font-medium px-3 py-1">
                        {testimonial.order}
                      </Badge>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}
                        >
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {testimonial.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Siap untuk bergabung dengan klien yang puas? Ayo mulai proyek
                Anda dengan saya hari ini!
              </p>
              <Button
                onClick={() => (window.location.href = "/contact")}
                className="sidebar-dark text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-colors"
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
