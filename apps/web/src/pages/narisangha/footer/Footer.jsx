import React from "react";
import FooterCopyright from "./FooterCopyright";

const Footer = ({ setViewMode }) => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;

