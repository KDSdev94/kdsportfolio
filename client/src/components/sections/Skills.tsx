export default function Skills() {
  const skills = [
    {
      name: "Javascript",
      icon: "🟨",
      color:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
    },
    {
      name: "Firebase",
      icon: "🔵",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      name: "Git",
      icon: "⚫",
      color: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    },
    {
      name: "Flutter",
      icon: "🟣",
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      name: "React Native",
      icon: "🩷",
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
    },
    {
      name: "Next.js",
      icon: "🟣",
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
    },
  ];

  return (
    <section id="skills" className="bg-gray-50 dark:bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Keterampilan
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Keterampilan berasal dari pengalaman dan pengetahuan yang saya kuasai.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border dark:border-gray-700"
            >
              <div
                className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <span className="text-2xl">{skill.icon}</span>
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
