import React from "react";
import FooterCopyright from "./FooterCopyright";

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;

