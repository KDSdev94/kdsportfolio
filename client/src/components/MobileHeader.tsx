import { useState } from "react";
import {
  X,
  Sun,
  Moon,
  Home,
  Briefcase,
  Star,
  Mail,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "../contexts/LanguageContext";
import { useLocation } from "wouter";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { SiGmail } from "react-icons/si";
import socialsData from "../data/socials.json";

interface MobileHeaderProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
}

export default function MobileHeader({
  onNavigate,
  activeSection = "",
}: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [, setLocation] = useLocation();

  // Custom hamburger icon similar to Tabler's "menu-deep"
  const MenuDeepIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 6h16" />
      <path d="M7 12h13" />
      <path d="M10 18h10" />
    </svg>
  );

  const navItems = [
    { id: "introduction", label: t("nav.home"), icon: Home },
    { id: "portfolio", label: t("nav.portfolio"), icon: Briefcase },
    { id: "testimonials", label: t("nav.testimonials"), icon: Star },
    { id: "contact", label: t("nav.contact"), icon: Mail },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github": return IoLogoGithub;
      case "telegram": return FaTelegram;
      case "instagram": return IoLogoInstagram;
      case "linkedin": return IoLogoLinkedin;
      case "whatsapp": return FaWhatsapp;
      case "gmail": return SiGmail;
      default: return FaTelegram;
    }
  };

  const socialLinks = socialsData.map((item) => ({
    ...item,
    icon: getSocialIcon(item.platform),
  }));

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "portfolio") {
      setLocation("/portfolio");
    } else if (sectionId === "testimonials") {
      setLocation("/testimonials");
    } else if (sectionId === "introduction") {
      setLocation("/");
    } else if (sectionId === "contact") {
      setLocation("/contact");
    } else {
      onNavigate(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`lg:hidden shadow-sm border-b fixed top-0 left-0 right-0 z-50 ${theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
        }`}
    >
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src="/assets/logo.png"
              alt="Kurniawan Dwi Saputra"
              loading="lazy"
              className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-700 shadow-sm"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-sm"></div>
          </div>
          <div className="min-w-0">
            <h3
              className={`font-bold text-sm truncate ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              Kurniawan Dwi Saputra
            </h3>
            <p
              className={`text-[10px] font-medium uppercase tracking-tight truncate ${theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
            >
              {t("role.admin")} • {t("role.designer")}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === "id" ? "en" : "id")}
            className={`text-[10px] font-bold w-9 h-9 rounded-full transition-all flex items-center justify-center border ${theme === "dark"
              ? "border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            title={language === "id" ? t("common.switch_to_english") : t("common.switch_to_indonesian")}
          >
            {language.toUpperCase()}
          </button>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full transition-all flex items-center justify-center border ${theme === "dark"
              ? "border-gray-700 text-slate-300 hover:bg-gray-700"
              : "border-gray-200 text-slate-600 hover:bg-gray-50"
              }`}
            aria-label={t("common.toggle_theme")}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {/* Menu Toggle Button */}
          <button
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${theme === "dark"
              ? "text-slate-200 hover:bg-gray-700"
              : "text-slate-600 hover:bg-gray-100"
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("common.menu")}
            title={t("common.menu")}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MenuDeepIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          className={`border-t ${theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            }`}
        >
          {/* Navigation */}
          <nav className="py-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-2 transition-colors ${activeSection === item.id
                    ? theme === "dark"
                      ? "text-white bg-gray-700"
                      : "text-blue-600 bg-blue-50"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Social section */}
          <div className="px-4 py-4">
            <p
              className={`text-xs mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
            >
              {t("nav.social_media")}
            </p>
            <div className="grid grid-cols-6 gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`transition-colors ${theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p
              className={`text-xs mt-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
            >
              © {new Date().getFullYear()} Kurniawan Dwi Saputra
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
