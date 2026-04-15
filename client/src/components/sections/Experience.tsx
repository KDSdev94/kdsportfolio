import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";

export default function Experience() {
  const projects = [
    {
      title: "Sampah Tuntas",
      description:
        "Sebuah aplikasi digital untuk pelaporan adanya sampah di sekitar kita dari laporan warga dengan menggunakan teknologi Expo dan posisi GPS untuk mengetahui lokasi sampah.",
      image: "/assets/image/sampah_tuntas.jpg",
      tags: [
        {
          name: "React Native",
          color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        },
        {
          name: "Expo",
          color:
            "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        },
        {
          name: "Firebase",
          color:
            "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
        },
      ],
    },
    {
      title: "Febri Store",
      description:
        "Sebuah aplikasi digital untuk menjual produk kebutuhan sehari-hari dengan menggunakan teknologi React Native dan Firebase.",
      image: "/assets/image/FebriStore.jpg",
      tags: [
        {
          name: "React Native",
          color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        },
        {
          name: "Expo",
          color:
            "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        },
        {
          name: "Firebase",
          color:
            "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
        },
      ],
    },
    {
      title: "MyLurah",
      description:
        "Sebuah aplikasi digital untuk membantu warga dalam mengakses informasi terkait pemerintahan daerah dengan menggunakan teknologi React Native dan Firebase.",
      image: "/assets/image/MyLurah.jpg",
      tags: [
        {
          name: "React Native",
          color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        },
        {
          name: "Expo",
          color:
            "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        },
        {
          name: "Firebase",
          color:
            "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
        },
      ],
    },
  ];

  return (
    <section id="experience" className="bg-gray-50 dark:bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Pengalaman
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Setiap proyek memberikan cerita, dan di sini adalah perjalanan saya.
          Dari menciptakan solusi inovatif hingga menghadapi tantangan nyata,
          pengalaman-pengalaman ini telah membentuk saya menjadi seorang
          pengembang yang saya adalah hari ini.
        </p>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
            <span className="text-gray-400 mr-2">•</span>
            Freelance
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-4">
              2025 - now
            </span>
          </h3>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border dark:border-gray-700"
              >
                <div className="p-4">
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain sm:object-cover transition-transform duration-300 hover:scale-105 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
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

          {/* Featured project*/}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                  <div className="relative overflow-hidden rounded-lg aspect-video lg:aspect-[4/3]">
                    <img
                      src="/assets/image/E-SkuulTime.jpg"
                      alt="Educational website with colorful design"
                      className="w-full h-full object-contain sm:object-cover transition-transform duration-300 hover:scale-105 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    App Development - E-SkuulTime
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Januari 2025 - April 2025
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Proyek ini adalah sebuah aplikasi mobile yang dirancang
                    untuk menyelesaikan studi kasus TA alias Tugas Akhir saya,
                    aplikasi ini bisa berguna untuk sistem penjadwalan pelajaran
                    sekolah, petugas bisa mengatur jadwal pelajaran, dan siswa
                    bisa melihat jadwal pelajaran, termasuk guru bisa melihat
                    jadwal mengajar mereka.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Remote
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Brebes, Indonesia
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xs rounded-full font-medium">
                      React Native
                    </Badge>
                    <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs rounded-full font-medium">
                      Expo
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full font-medium">
                      Firebase
                    </Badge>
                  </div>
                  <Button
                    className="sidebar-dark text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-colors flex items-center gap-2"
                    onClick={() =>
                      window.open("https://github.com/KDSdev94", "_blank")
                    }
                  >
                    Visit Github
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                  <div className="relative overflow-hidden rounded-lg aspect-video lg:aspect-[4/3]">
                    <img
                      src="/assets/image/absen-app.png"
                      alt="Educational website with colorful design"
                      className="w-full h-full object-cover sm:object-cover transition-transform duration-300 hover:scale-105 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Admin Website - HR Group
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Januari 2025 - April 2025
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Proyek ini adalah sebuah aplikasi mobile yang dirancang
                    untuk menyelesaikan studi kasus TA alias Tugas Akhir saya,
                    aplikasi ini bisa berguna untuk sistem penjadwalan pelajaran
                    sekolah, petugas bisa mengatur jadwal pelajaran, dan siswa
                    bisa melihat jadwal pelajaran, termasuk guru bisa melihat
                    jadwal mengajar mereka.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Office
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Brebes, Indonesia
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xs rounded-full font-medium">
                      React Native
                    </Badge>
                    <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs rounded-full font-medium">
                      Expo
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full font-medium">
                      Firebase
                    </Badge>
                  </div>
                  <Button
                    className="sidebar-dark text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-colors flex items-center gap-2"
                    onClick={() =>
                      window.open("https://github.com/KDSdev94", "_blank")
                    }
                  >
                    Visit Github
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
