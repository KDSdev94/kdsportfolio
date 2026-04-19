import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Introduction() {
  const [, setLocation] = useLocation();

  const handlePortfolioView = () => {
    setLocation("/portfolio");
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/resume.pdf";
    link.download = "Kurniawan_Dwi_Saputra_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="introduction" className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Halo, Saya Kurniawan Dwi Saputra
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Saya seorang freelance junior app developer berasal dari Brebes,
              Indonesia, dengan pengalaman dalam pengembangan aplikasi mobile.
              Dengan menggunakan teknologi React Native ataupun Flutter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={handlePortfolioView}
                className="sidebar-dark text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                See Portfolio
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleResumeDownload}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                Download Resume
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-center relative">
            {/* Tilted frame container */}
            <div className="relative inline-block transition-transform duration-300 ease-in-out hover:scale-95">
              {/* Background frame with tilt */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl transform rotate-3 scale-105"></div>
              {/* Second frame for depth */}
              <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-2xl transform -rotate-1 scale-102 shadow-lg"></div>
              {/* Main image container */}
              <div className="relative bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/assets/hero-image.jpg"
                  alt="Watching movies and tea time 🍵✨"
                  className="rounded-xl w-80 h-80 object-cover mb-4"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                  Watching movies and tea time 🍵✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
