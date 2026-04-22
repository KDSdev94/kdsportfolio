import {
  IoHomeOutline,
  IoBriefcaseOutline,
  IoStarOutline,
  IoMailOutline,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io5";
import { FaSun, FaMoon, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

import { useTheme } from "./ThemeProvider";
import { useLanguage } from "../contexts/LanguageContext";
import { useLocation } from "wouter";
import socialsData from "../data/socials.json";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [, setLocation] = useLocation();

  const navItems = [
    { id: "introduction", label: t("nav.home"), icon: IoHomeOutline },
    { id: "portfolio", label: t("nav.portfolio"), icon: IoBriefcaseOutline },
    { id: "testimonials", label: t("nav.testimonials"), icon: IoStarOutline },
    { id: "contact", label: t("nav.contact"), icon: IoMailOutline },
  ];

  const handleNavigation = (itemId: string) => {
    if (itemId === "portfolio") {
      setLocation("/portfolio");
    } else if (itemId === "testimonials") {
      setLocation("/testimonials");
    } else if (itemId === "introduction") {
      setLocation("/");
    } else if (itemId === "contact") {
      setLocation("/contact");
    } else {
      onNavigate(itemId);
    }
  };

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

  return (
    <div
      className={`fixed left-0 top-0 h-full w-80 text-white z-50 lg:block hidden ${theme === "dark" ? "sidebar-dark" : "bg-white border-r border-gray-200"
        }`}
    >
      {/* Profile Section */}
      <div
        className={`p-6 border-b ${theme === "dark" ? "border-white/10" : "border-gray-100"
          }`}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <img
                src="/assets/logo.png"
                alt="Kurniawan Dwi Saputra"
                loading="lazy"
                className="relative w-20 h-20 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              {/* Language Switch */}
              <button
                onClick={() => setLanguage(language === "id" ? "en" : "id")}
                className={`w-9 h-9 rounded-full transition-all flex items-center justify-center text-[10px] font-bold border ${theme === "dark"
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600 shadow-sm"
                  : "border-gray-200 text-gray-600 hover:bg-white hover:text-gray-900 hover:border-gray-300 shadow-sm"
                  }`}
                title={language === "id" ? t("common.switch_to_english") : t("common.switch_to_indonesian")}
              >
                {language.toUpperCase()}
              </button>
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`w-9 h-9 rounded-full transition-all flex items-center justify-center border ${theme === "dark"
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600 shadow-sm"
                  : "border-gray-200 text-gray-600 hover:bg-white hover:text-gray-900 hover:border-gray-300 shadow-sm"
                  }`}
                aria-label={t("common.toggle_theme")}
              >
                {theme === "dark" ? (
                  <FaSun className="w-3.5 h-3.5 text-yellow-400" />
                ) : (
                  <FaMoon className="w-3.5 h-3.5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <div>
            <h3
              className={`text-lg font-bold tracking-tight mb-1.5 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              Kurniawan Dwi Saputra
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme === "dark"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-blue-50 text-blue-600 border border-blue-100"
                  }`}
              >
                {t("role.admin")}
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme === "dark"
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "bg-purple-50 text-purple-600 border border-purple-100"
                  }`}
              >
                {t("role.designer")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 transition-colors ${isActive
                ? theme === "dark"
                  ? "text-white sidebar-hover border-r-2 border-blue-500"
                  : "text-blue-600 bg-blue-50 border-r-2 border-blue-500"
                : theme === "dark"
                  ? "text-gray-300 hover:text-white hover:sidebar-hover"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Social Media Section */}
      <div className="absolute bottom-6 left-4 right-4">
        <p
          className={`text-xs mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
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
          className={`text-xs mt-6 ${theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
        >
          © {new Date().getFullYear()} Kurniawan Dwi Saputra
        </p>
      </div>
    </div>
  );
}
