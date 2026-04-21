import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { LocalizedText, useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

interface Project {
    title: string;
    description: LocalizedText;
    image: string;
    images?: string[];
    technologies: string[];
    category: string;
    demo?: string;
}

interface ProjectDetailDialogProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectDetailDialog({ project, isOpen, onClose }: ProjectDetailDialogProps) {
    const { t, localize } = useLanguage();
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    if (!project) return null;

    const categoryLabelMap: Record<string, string> = {
        "Mobile App": t("portfolio.filter.mobile"),
        "Website": t("portfolio.filter.web"),
        "Desktop App": t("portfolio.filter.desktop"),
    };

    const handleOpenDemo = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (project.demo) {
            const url = project.demo.startsWith('http') ? project.demo : `https://${project.demo}`;
            window.open(url, "_blank");
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 p-0 overflow-y-auto max-h-[90vh] border-none shadow-2xl">
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {project.images && project.images.length > 1 ? (
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {project.images.map((img, i) => (
                                        <CarouselItem key={i}>
                                            <div
                                                className="aspect-video cursor-pointer relative group"
                                                onClick={() => setFullscreenImage(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${project.title} ${i + 1}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                    <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-opacity">
                                                        {t("portfolio.click_to_zoom")}
                                                    </span>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                                    <CarouselPrevious className="relative pointer-events-auto left-0 translate-y-0" />
                                    <CarouselNext className="relative pointer-events-auto right-0 translate-y-0" />
                                </div>
                            </Carousel>
                        ) : (
                            <div
                                className="aspect-video cursor-pointer relative group"
                                onClick={() => setFullscreenImage(project.image)}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-opacity">
                                        {t("portfolio.click_to_zoom")}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8">
                        <DialogHeader className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {project.title}
                                </DialogTitle>
                                <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider font-bold">
                                    {categoryLabelMap[project.category] || project.category}
                                </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <Badge
                                        key={techIndex}
                                        className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs rounded-full font-medium px-3 py-1"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </DialogHeader>
                        <DialogDescription className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                            {localize(project.description)}
                        </DialogDescription>

                        <div className="flex gap-4">
                            {project.demo && (
                                <Button
                                    className="flex-1 sidebar-dark text-white hover:opacity-90 h-12"
                                    onClick={handleOpenDemo}
                                >
                                    <ExternalLink className="w-5 h-5 mr-2" />
                                    {t("portfolio.view_website")}
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={!!fullscreenImage} onOpenChange={(open) => !open && setFullscreenImage(null)}>
                <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[95vh] p-0 overflow-hidden bg-transparent border-none shadow-none flex flex-col items-center justify-center">
                    {fullscreenImage && (
                        <div className="relative w-full h-full flex items-center justify-center shadow-2xl" onClick={() => setFullscreenImage(null)}>
                            <img
                                src={fullscreenImage}
                                alt="Fullscreen focus view"
                                loading="lazy"
                                className="max-w-full max-h-[90vh] object-contain rounded-md"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
