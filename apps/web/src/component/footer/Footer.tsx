import React from "react";
import FooterCopyright from "./FooterCopyright";
import ModernLanguageSelector from "../header/ModernLanguageSelector";
import { useI18n } from "../../hooks/useI18n";

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
  const { language, setLanguage, languages } = useI18n();

  return (
    <footer className="site-footer">
      <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FooterCopyright />
        <ModernLanguageSelector
          language={language}
          setLanguage={setLanguage}
          languages={languages}
          variant="light"
        />
      </div>
    </footer>
  );
};

export default Footer;

