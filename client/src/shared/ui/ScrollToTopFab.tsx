import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export const ScrollToTopFab = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[#1a2b49] text-white shadow-lg transition-all duration-200"
      title="Баргаштан ба боло"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};
