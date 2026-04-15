import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";



interface Project {
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  github?: string;

  demo?: string;
}

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("portfolio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [, setLocation] = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["portfolio"];
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
    if (sectionId === "portfolio") {
      // Already on portfolio page
      return;
    }
    // Navigate back to home page
    window.location.href = "/";
  };

  const projects: Project[] = [
    {
      title: "E-SkuulTime",
      description:
        "Aplikasi ini dirancang untuk memudahkan pengelolaan jadwal, aktivitas akademik, dan komunikasi antara admin, guru, dan siswa.",
      image: "/assets/image/E-SkuulTime.jpg",
      images: ["/assets/image/E-SkuulTime.jpg", "/assets/image/E-SkuulTime.jpg"],
      technologies: ["Expo", "React Native", "Firebase"],
      github: "https://github.com/KDSdev94/E-SkuulTime",
    },
    {
      title: "Toko Amartha",
      description:
        "Aplikasi ini dirancang khusus untuk membantu bisnis retail dalam mengelola transaksi, inventori, dan laporan penjualan dengan interface yang modern dan user-friendly.",
      image: "/assets/image/toko_amartha.png",
      images: ["/assets/image/toko_amartha.png", "/assets/image/toko_amartha.png"],
      technologies: ["Flutter", "Dart", "Hive"],
      github: "https://github.com/KDSdev94/TokoAmartha",
    },

    {
      title: "MyLurah",
      description:
        "Aplikasi mobile layanan digital kelurahan untuk memudahkan akses layanan administratif dan informasi bagi warga.",
      image: "/assets/image/MyLurah.jpg",
      technologies: ["Expo", "React Native", "Firebase"],
      github: "https://github.com/KDSdev94/MyLurah",
    },
    {
      title: "Sampah Tuntas",
      description:
        "Aplikasi yang dapat membantu warga dalam melaporkan masalah sampah, memantau jadwal pengangkutan.",
      image: "/assets/image/sampah_tuntas.jpg",
      technologies: ["Expo", "React Native", "Firebase"],
      github: "https://github.com/KDSdev94/SampahTuntas",
    },
    {
      title: "Febri Store",
      description:
        "Aplikasi ini menyediakan platform lengkap untuk toko online dengan fitur-fitur modern dan user-friendly interface.",
      image: "/assets/image/FebriStore.jpg",
      technologies: ["Expo", "React Native", "Firebase"],
      github: "https://github.com/KDSdev94/FebriStore",
    },

    {
      title: "Belajar Anak",
      description:
        "Aplikasi ini bertujuan untuk membantu anak-anak dalam belajar dengan cara yang menyenangkan dengan sistem interaktif.",
      image: "/assets/image/belajar-anak.jpeg",
      technologies: ["Java", "Firebase"],
      github: "https://github.com/KDSdev94/belajar-anak",
    },
    {
      title: "Arsip Hotel",
      description:
        "Aplikasi ini bertujuan untuk membantu hotel dalam mengelola data pelanggan dengan cara yang menyenangkan dengan sistem interaktif.",
      image: "/assets/image/arsip-hotel.jpeg",
      technologies: ["React", "Node.js", "Firebase"],
      github: "https://github.com/KDSdev94/arsip-hotel",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
      <title>Kurniawan Dwi Saputra - {activeSection}</title>
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <MobileHeader
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      <div className="lg:ml-80 pt-20 lg:pt-0">
        <section id="portfolio" className="bg-white dark:bg-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header Section */}
            <div className=" mb-12">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                Portfolio
              </h1>
              <div className="mb-6 h-1 w-16 bg-slate-200 dark:bg-slate-700"></div>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-6xl leading-relaxed">
                Sebagai seorang pengembang app developer, saya membawa ide-ide
                saya menjadi kenyataan dengan membangun aplikasi yang menarik
                dan fungsional berdasarkan kebutuhan client.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border dark:border-gray-700 overflow-hidden group cursor-pointer"
                >

                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain sm:object-cover transition-transform duration-300 group-hover:scale-105 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs rounded-full font-medium px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github, "_blank");
                          }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          size="sm"
                          className="flex-1 sidebar-dark text-white hover:opacity-90"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demo, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Project Detail Dialog */}
            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
              <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 p-0 overflow-hidden border-none shadow-2xl">
                {selectedProject && (
                  <>
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {selectedProject.images && selectedProject.images.length > 1 ? (
                        <Carousel className="w-full">
                          <CarouselContent>
                            {selectedProject.images.map((img, i) => (
                              <CarouselItem key={i}>
                                <div className="aspect-video">
                                  <img
                                    src={img}
                                    alt={`${selectedProject.title} ${i + 1}`}
                                    className="w-full h-full object-contain sm:object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                            <CarouselPrevious className="relative pointer-events-auto left-0 translate-y-0" />
                            <CarouselNext className="relative pointer-events-auto right-0 translate-y-0" />
                          </div>
                        </Carousel>
                      ) : (
                        <div className="aspect-video">
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full h-full object-contain sm:object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {selectedProject.title}
                        </DialogTitle>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs rounded-full font-medium px-3 py-1"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </DialogHeader>
                      <DialogDescription className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                        {selectedProject.description}
                        <br /><br />
                        Aplikasi ini dikembangkan dengan fokus pada pengalaman pengguna yang optimal,
                        performa yang responsif, dan fungsionalitas yang sesuai dengan kebutuhan bisnis di era digital.
                      </DialogDescription>

                      <div className="flex gap-4">
                        {selectedProject.github && (
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 h-12"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(selectedProject.github, "_blank");
                            }}
                          >
                            <Github className="w-5 h-5 mr-2" />
                            Lihat Source Code
                          </Button>
                        )}
                        {selectedProject.demo && (
                          <Button
                            className="flex-1 sidebar-dark text-white hover:opacity-90 h-12"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(selectedProject.demo, "_blank");
                            }}
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Lihat Demo Live
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>


            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Interested in working together? Let's discuss your project!
              </p>
              <Button
                onClick={() => setLocation("/contact")}
                className="sidebar-dark text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-colors"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
