import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import Introduction from "./sections/Introduction";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import { useLanguage } from "../contexts/LanguageContext";
import { usePageMeta } from "../hooks/use-page-meta";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("introduction");
  const { t } = useLanguage();

  usePageMeta(t("page.home"));

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduction", "experience", "education", "skills"];
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
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - (window.innerWidth < 1024 ? 80 : 0);
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <MobileHeader
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      <div className="lg:ml-80 pt-20 lg:pt-0">
        <Introduction />
        <Experience />
        <Education />
        <Skills />
      </div>
    </div>
  );
}
