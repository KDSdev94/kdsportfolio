import { useLanguage } from "../../contexts/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  const skills = [
    {
      name: "Javascript",
      image: "/assets/logo/js.jpg",
    },
    {
      name: "Firebase",
      image: "/assets/logo/firebase.png",
    },
    {
      name: "Git",
      image: "/assets/logo/git.png",
    },
    {
      name: "Flutter",
      image: "/assets/logo/flutter.png",
    },
    {
      name: "Expo",
      image: "/assets/logo/expo.webp",
    },
    {
      name: "Next.js",
      image: "/assets/logo/nextjs.png",
    },
    {
      name: "Vue.js",
      image: "/assets/logo/vue.png",
    },
    {
      name: "Java",
      image: "/assets/logo/java.png",
    },
    {
      name: "MySQL",
      image: "/assets/logo/mysql.png",
    },
  ];

  return (
    <section id="skills" className="bg-gray-50 dark:bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("skills.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {t("skills.description")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border dark:border-gray-700"
            >
              <div
                className="w-16 h-16 bg-gray-50 dark:bg-white rounded-xl flex items-center justify-center mx-auto mb-4 p-3 shadow-inner"
              >
                <img
                  src={skill.image}
                  alt={skill.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {skill.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
