import { Award, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { LocalizedText, useLanguage } from "../../contexts/LanguageContext";

interface Certificate {
  title: LocalizedText;
  issuer: string;
  image: string;
  thumbnail?: string;
  date?: string;
  category?: string;
  credentialUrl?: string;
}

import certificatesData from "../../data/certificates.json";

interface CertificatesProps {
  preview?: boolean;
}

export default function Certificates({ preview = false }: CertificatesProps) {
  const { t, localize } = useLanguage();
  const [, setLocation] = useLocation();
  const certificates = certificatesData as Certificate[];
  const displayedCertificates = preview ? certificates.slice(0, 3) : certificates;

  return (
    <section id="certificates" className="bg-white dark:bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("certificates.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {t("certificates.description")}
        </p>

        {displayedCertificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {displayedCertificates.map((certificate, index) => {
              const previewImage = certificate.thumbnail ?? certificate.image;

              return (
                <article
                  key={`${certificate.issuer}-${index}`}
                  className="overflow-hidden bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300"
                >
                <a
                  href={certificate.image}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-white dark:bg-gray-800"
                  aria-label={`${t("certificates.open_image")}: ${localize(certificate.title)}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={previewImage}
                      alt={localize(certificate.title)}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </a>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 shrink-0 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                        {localize(certificate.title)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {certificate.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-5">
                    {certificate.date && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {certificate.date}
                      </span>
                    )}
                    {certificate.category && (
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        {certificate.category}
                      </span>
                    )}
                  </div>

                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 mt-5"
                    >
                      {t("certificates.view_credential")}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 sm:p-8 border border-dashed border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("certificates.empty_title")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  {t("certificates.empty_description")}
                </p>
              </div>
            </div>
          </div>
        )}

        {preview && certificates.length > displayedCertificates.length && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setLocation("/certificates")}
              variant="outline"
              className="rounded-full px-8 dark:border-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300"
            >
              {t("certificates.see_all")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
