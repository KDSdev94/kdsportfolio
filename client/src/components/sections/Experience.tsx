import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import ProjectDetailDialog from "@/components/ProjectDetailDialog";

import { LocalizedText, useLanguage } from "../../contexts/LanguageContext";

// Helper to get color for tech badges
const getTechColor = (tech: string) => {
  const colors: Record<string, string> = {
    "React Native": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    "Expo": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    "Firebase": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    "Flutter": "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
    "Dart": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    "VueJS": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    "Tailwind CSS": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    "React Vite": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    "Java": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };
  return colors[tech] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
};

interface Project {
  title: string;
  description: LocalizedText;
  image: string;
  images?: string[];
  technologies: string[];
  category: string;
  type: string;
  demo?: string;
}

export default function Experience() {
  const [freelanceProjects, setFreelanceProjects] = useState<Project[]>([]);
  const [adminProjects, setAdminProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language, t, localize } = useLanguage();

  useEffect(() => {
    // Filter projects by type
    const allProjects = projectsData as Project[];
    const freelance = allProjects.filter(p => p.type === "Freelance");
    const admin = allProjects.filter(p => p.type === "Admin Website");

    // Pick 3 random freelance projects
    const shuffledFreelance = [...freelance].sort(() => 0.5 - Math.random());
    setFreelanceProjects(shuffledFreelance.slice(0, 3));

    // Show all admin projects
    setAdminProjects(admin);
  }, []);

  const formatProject = (p: Project) => ({
    ...p,
    tags: p.technologies.map((tech: string) => ({
      name: tech,
      color: getTechColor(tech)
    }))
  });

  const displayFreelance = useMemo(() => freelanceProjects.map(formatProject), [freelanceProjects, language]);
  const displayAdmin = useMemo(() => adminProjects.map(formatProject), [adminProjects, language]);

  const [, setLocation] = useLocation();

  return (
    <section id="experience" className="bg-gray-50 dark:bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("experience.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {t("experience.description")}
        </p>

        {/* Admin Website Section */}
        {displayAdmin.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
              <span className="text-gray-400 mr-2">•</span>
              {t("experience.admin_website")}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-4">
                2025 - {t("experience.present")}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayAdmin.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project as any)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border dark:border-gray-700"
                >
                  <div className="p-4">
                    <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {localize(project.description)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          className={`${tag.color} text-xs rounded-full font-medium`}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Freelance Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
            <span className="text-gray-400 mr-2">•</span>
            {t("experience.freelance")}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-4">
              2025 - {t("experience.present")}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFreelance.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project as any)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border dark:border-gray-700"
              >
                <div className="p-4">
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {localize(project.description)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        className={`${tag.color} text-xs rounded-full font-medium`}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              onClick={() => setLocation("/portfolio")}
              variant="outline"
              className="rounded-full px-8 dark:border-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300"
            >
              {t("experience.see_all")}
            </Button>
          </div>
        </div>

        {/* Project Detail Dialog */}
        <ProjectDetailDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
