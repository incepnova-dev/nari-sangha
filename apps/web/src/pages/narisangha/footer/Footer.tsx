import React from "react";
import FooterCopyright from "./FooterCopyright";

interface FooterProps {
  setViewMode: (mode: string) => void;
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

