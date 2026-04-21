import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { LocalizedText, useLanguage } from "../contexts/LanguageContext";
import projectsData from "../data/projects.json";
import { usePageMeta } from "../hooks/use-page-meta";
import ProjectDetailDialog from "@/components/ProjectDetailDialog";



interface Project {
  title: string;
  description: LocalizedText;
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
  const { t, localize } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [, setLocation] = useLocation();

  usePageMeta(t("page.portfolio"));

  const categories = [
    { id: "All", label: t("portfolio.filter.all") },
    { id: "Mobile App", label: t("portfolio.filter.mobile") },
    { id: "Website", label: t("portfolio.filter.web") },
    { id: "Desktop App", label: t("portfolio.filter.desktop") },
  ];

  const categoryLabelMap: Record<string, string> = {
    "Mobile App": t("portfolio.filter.mobile"),
    "Website": t("portfolio.filter.web"),
    "Desktop App": t("portfolio.filter.desktop"),
  };


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

  const projects: Project[] = projectsData as Project[];
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
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
                {t("portfolio.title")}
              </h1>
              <div className="mb-6 h-1 w-16 bg-slate-200 dark:bg-slate-700"></div>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-6xl leading-relaxed">
                {t("portfolio.description")}
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-6 transition-all duration-300 ${selectedCategory === cat.id
                    ? "sidebar-dark text-white ring-2 ring-teal-500 ring-offset-2"
                    : "text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                    }`}
                >
                  {cat.label}
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
                      loading="lazy"
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
                        {categoryLabelMap[project.category] || project.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                      {localize(project.description)}
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
                          {t("portfolio.view_website")}
                        </Button>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <ProjectDetailDialog
              project={selectedProject}
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
            />

            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("portfolio.cta.text")}
              </p>
              <Button
                onClick={() => setLocation("/contact")}
                className="sidebar-dark text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-colors"
              >
                {t("portfolio.cta.button")}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
