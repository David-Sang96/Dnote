import { useEffect, useState } from "react";
import { BiSolidArrowToTop } from "react-icons/bi";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      //   height: 100px;
      if (window.scrollY > 110) {
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
      <BiSolidArrowToTop
        onClick={scrollToTop}
        className="text-orange fixed bottom-16 right-5 z-20 cursor-pointer rounded-full bg-teal-600 text-3xl text-white"
      />
    )
  );
};

export default ScrollToTopBtn;
