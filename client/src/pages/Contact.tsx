import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FaWhatsapp, FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { SiGmail, SiInstagram, SiGooglemaps } from "react-icons/si";

import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import socialsData from "../data/socials.json";
import { useLanguage } from "../contexts/LanguageContext";
import { usePageMeta } from "../hooks/use-page-meta";
import { useLocation } from "wouter";

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState("contact");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  usePageMeta(t("page.contact"));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Map fields for the EmailJS template
    const first_name = String(formData.get("first_name") || "").trim();
    const last_name = String(formData.get("last_name") || "").trim();
    const from_email = String(formData.get("from_email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const payload = {
      first_name,
      last_name,
      from_email,
      subject,
      message,
      to_email: "kdwisaputra04@gmail.com",
      reply_to: from_email,
      from_name: `${first_name} ${last_name}`.trim(),
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("missing-email-config");
      }

      await emailjs.send(serviceId, templateId, payload, publicKey);

      toast({
        title: t("contact.toast.success_title"),
        description: t("contact.toast.success_description"),
      });
      form.reset();
    } catch (err) {
      console.error(err);
      toast({
        title: t("contact.toast.error_title"),
        description: t("contact.toast.error_description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact"];
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
    if (sectionId === "contact") {
      return;
    }
    setLocation("/");
  };

  const contactInfo = [
    {
      icon: SiGmail,
      title: t("contact.info.email"),
      value: "kdwisaputra04@gmail.com",
      link: "mailto:kdwisaputra04@gmail.com",
    },
    {
      icon: FaWhatsapp,
      title: t("contact.info.whatsapp"),
      value: "+62 821-3452-8638",
      link: "https://wa.me/6282134528638",
    },
    {
      icon: SiGooglemaps,
      title: t("contact.info.location"),
      value: t("contact.location_value"),
      link: "https://maps.app.goo.gl/p8kCFVPh4dXbhcU68",
    },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github": return FaGithub;
      case "telegram": return FaTelegram;
      case "instagram": return SiInstagram;
      case "linkedin": return FaLinkedin;
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
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <MobileHeader
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      <div className="lg:ml-80 pt-20 lg:pt-0">
        <section id="contact" className="bg-white dark:bg-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header Section */}
            <div className="mb-12">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                {t("contact.title")}
              </h1>
              <div className="mb-6 h-1 w-16 bg-slate-200 dark:bg-slate-700"></div>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-6xl leading-relaxed">
                {t("contact.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {t("contact.get_in_touch")}
                </h2>

                {/* Contact Details */}
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {info.title}
                          </h3>
                          <a
                            href={info.link}
                            className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {t("contact.follow_me")}
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                          aria-label={social.label}
                        >
                          <IconComponent className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {t("contact.send_message")}
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {t("contact.form.first_name")}
                      </label>
                      <Input
                        id="firstName"
                        name="first_name"
                        type="text"
                        placeholder={t("contact.form.first_name_placeholder")}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {t("contact.form.last_name")}
                      </label>
                      <Input
                        id="lastName"
                        name="last_name"
                        type="text"
                        placeholder={t("contact.form.last_name_placeholder")}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.email")}
                    </label>
                    <Input
                      id="email"
                      name="from_email"
                      type="email"
                      placeholder={t("contact.form.email_placeholder")}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.subject")}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={t("contact.form.subject_placeholder")}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={t("contact.form.message_placeholder")}
                      className="w-full"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sidebar-dark text-white hover:opacity-90 transition-colors"
                  >
                    <FiSend className="w-4 h-4 mr-2" />
                    {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                  </Button>
                </form>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("contact.response_time")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("contact.closing")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
