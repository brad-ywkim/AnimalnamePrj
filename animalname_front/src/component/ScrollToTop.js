import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Fab from "@mui/material/Fab";
import "../component/scrollToTop.css"; // 스타일을 위한 CSS 파일
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop > 300 && scrollTop + windowHeight < documentHeight - 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <Fab
          onClick={scrollToTop}
          aria-label="scroll to top"
          style={{ backgroundColor: "#1976d2", color: "#fff" }} // 색상 설정
          size="small" // Fab 크기 설정 (small, medium, large)
        >
          <ArrowUpwardIcon style={{ fontSize: 30 }} /> {/* 아이콘 크기 설정 */}
        </Fab>
      )}
    </div>
  );
};

export default ScrollToTop;
