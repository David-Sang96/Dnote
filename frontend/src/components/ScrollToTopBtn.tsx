import { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      //   height: 300px; (window.scrollY value)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <FaArrowAltCircleUp
        onClick={scrollToTop}
        className="text-orange fixed bottom-16 right-5 z-20 cursor-pointer rounded-full bg-teal-600 text-3xl text-white"
      />
    )
  );
};

export default ScrollToTopBtn;
