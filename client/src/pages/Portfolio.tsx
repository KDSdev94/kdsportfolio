import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import projectsData from "../data/projects.json";
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
  category: string;
  demo?: string;
}

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("portfolio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [, setLocation] = useLocation();

  const categories = ["All", "Mobile App", "Website", "Desktop App"];


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

  const projects: Project[] = projectsData;
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-6 transition-all duration-300 ${selectedCategory === cat
                    ? "sidebar-dark text-white ring-2 ring-teal-500 ring-offset-2"
                    : "text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                    }`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
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
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider font-bold">
                        {project.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
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
                      {project.demo && (
                        <Button
                          size="sm"
                          className="flex-1 sidebar-dark text-white hover:opacity-90"
                          onClick={(e) => {
                            e.stopPropagation();
                            const url = project.demo?.startsWith('http') ? project.demo : `https://${project.demo}`;
                            window.open(url, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Lihat Website
                        </Button>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Project Detail Dialog */}
            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
              <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 p-0 overflow-y-auto max-h-[90vh] border-none shadow-2xl">
                {selectedProject && (
                  <>
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {selectedProject.images && selectedProject.images.length > 1 ? (
                        <Carousel className="w-full">
                          <CarouselContent>
                            {selectedProject.images.map((img, i) => (
                              <CarouselItem key={i}>
                                <div
                                  className="aspect-video cursor-pointer relative group"
                                  onClick={() => setFullscreenImage(img)}
                                >
                                  <img
                                    src={img}
                                    alt={`${selectedProject.title} ${i + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-opacity">
                                      Klik untuk zoom
                                    </span>
                                  </div>
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
                        <div
                          className="aspect-video cursor-pointer relative group"
                          onClick={() => setFullscreenImage(selectedProject.image)}
                        >
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-opacity">
                              Klik untuk zoom
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <DialogHeader className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedProject.title}
                          </DialogTitle>
                          <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider font-bold">
                            {selectedProject.category}
                          </Badge>
                        </div>
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
                        {selectedProject.demo && (
                          <Button
                            className="flex-1 sidebar-dark text-white hover:opacity-90 h-12"
                            onClick={(e) => {
                              e.stopPropagation();
                              const url = selectedProject.demo?.startsWith('http') ? selectedProject.demo : `https://${selectedProject.demo}`;
                              window.open(url, "_blank");
                            }}
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Lihat Website
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>


            <Dialog open={!!fullscreenImage} onOpenChange={(open) => !open && setFullscreenImage(null)}>
              <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[95vh] p-0 overflow-hidden bg-transparent border-none shadow-none flex flex-col items-center justify-center">
                {fullscreenImage && (
                  <div className="relative w-full h-full flex items-center justify-center" onClick={() => setFullscreenImage(null)}>
                    <img
                      src={fullscreenImage}
                      alt="Fullscreen focus view"
                      className="max-w-full max-h-[90vh] object-contain rounded-md"
                    />
                  </div>
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
