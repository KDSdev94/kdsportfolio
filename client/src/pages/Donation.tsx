import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Rocket, HandHeart } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { usePageMeta } from "../hooks/use-page-meta";
import { useLocation } from "wouter";

export default function DonationPage() {
  const [activeSection, setActiveSection] = useState("donation");
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { language, t } = useLanguage();
  const [, setLocation] = useLocation();

  usePageMeta(t("page.donation"));

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["donation"];
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
    if (sectionId === "donation") {
      // Already on donation page
      return;
    }
    setLocation("/");
  };

  const predefinedAmounts = [
    "Rp 25.000",
    "Rp 50.000",
    "Rp 100.000",
    "Rp 250.000",
    "Rp 500.000",
  ];

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setShowCustomInput(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const getSelectedAmountValue = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) {
      return `Rp ${parseInt(customAmount, 10).toLocaleString(language === "id" ? "id-ID" : "en-US")}`;
    }
    return "";
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <MobileHeader
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      <div className="lg:ml-80 pt-20 lg:pt-0">
        <section id="donation" className="bg-white dark:bg-gray-800 py-4">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-white fill-current" />
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                  {t("donation.title")}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {t("donation.description")}
                </p>
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                {t("donation.form.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
                {t("donation.form.description")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("donation.form.name")}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("donation.form.name_placeholder")}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t("donation.form.name_hint")}
                  </p>
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("donation.form.email")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("donation.form.email_placeholder")}
                    className="w-full"
                    required
                  />
                </div>

                {/* Amount Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {t("donation.form.amount_title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t("donation.form.amount_description")}
                  </p>

                  {/* Predefined Amounts */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {predefinedAmounts.map((amount, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedAmount === amount
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                        }`}
                      >
                        <span className="font-semibold">{amount}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAmount("");
                        setShowCustomInput(true);
                      }}
                      className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-center space-x-2 ${
                        !selectedAmount && (customAmount || showCustomInput)
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                          : "border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600"
                      }`}
                    >
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="font-semibold">{t("donation.form.custom_amount")}</span>
                    </button>
                  </div>

                  {/* Custom Amount Input */}
                  {showCustomInput && (
                    <div className="transition-all duration-300">
                      <Input
                        type="number"
                        placeholder={t("donation.form.custom_amount_placeholder")}
                        value={customAmount}
                        onChange={(e) =>
                          handleCustomAmountChange(e.target.value)
                        }
                        min="10000"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg transition-colors"
                  disabled={!selectedAmount && !customAmount}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {t("donation.form.submit")}
                </Button>
              </form>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <HandHeart className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                  {t("donation.success_title")}
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  {t("donation.success_description")}
                </p>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("donation.usage_title")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t("donation.usage.content_title")}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("donation.usage.content_description")}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Rocket className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t("donation.usage.opensource_title")}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("donation.usage.opensource_description")}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <HandHeart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t("donation.usage.community_title")}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("donation.usage.community_description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
