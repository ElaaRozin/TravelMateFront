import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <div className="footer-content">
        <p>✈️ TravelMate &copy; {new Date().getFullYear()} | All Rights Reserved</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
