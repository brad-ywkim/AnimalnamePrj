import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./default.css";
import Swal from "sweetalert2";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/name-stat") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    handleScroll();
  }, [location]);

  const handleMenuClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    }
  };

  const ready = () => {
    Swal.fire({
      icon: "info",
      text: "멍냥이들을 위한 신규 콘텐츠 준비중 🐶",
    });
  };

  return (
    <header className="header">
      <div className="header-wrap">
        <div className="header-content">
          <Link to="/" className="main-logo">
            <h1>🐶 멍냥이름</h1>
          </Link>
        </div>
        <div className="header-menu">
          <ul>
            <li onClick={() => handleMenuClick("/name-stat")}>
              <Link to="/name-stat">
                <p>순위</p>
              </Link>
            </li>
            <li onClick={() => handleMenuClick("/name-compatibility")}>
              <Link to="/name-compatibility">
                <p>궁합</p>
              </Link>
            </li>
            <li onClick={() => handleMenuClick("/name-luck")}>
              <Link to="/name-luck">
                <p>운세</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
