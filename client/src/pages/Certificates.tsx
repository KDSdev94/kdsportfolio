import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import Certificates from "@/components/sections/Certificates";
import { useLanguage } from "../contexts/LanguageContext";
import { usePageMeta } from "../hooks/use-page-meta";
import { useLocation } from "wouter";

export default function CertificatesPage() {
  const [activeSection, setActiveSection] = useState("certificates");
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  usePageMeta(t("certificates.title"));

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("certificates");
      if (element) {
        setActiveSection("certificates");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "certificates") {
      return;
    }

    setLocation("/");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <MobileHeader
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      <div className="lg:ml-80 pt-20 lg:pt-0">
        <Certificates />
      </div>
    </div>
  );
}
