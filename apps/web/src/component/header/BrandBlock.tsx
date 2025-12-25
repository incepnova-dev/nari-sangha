import React from "react";
import { Link } from "react-router-dom";
import { getProperty } from "../../i18";
import logoSvg from "../../assets/logo.svg";

interface BrandBlockProps {
  language?: string;
}

const BrandBlock: React.FC<BrandBlockProps> = ({ language = "en" }) => {
  return (
    <div className="brand-block">
      <Link to="/home" className="brand-logo-link">
        <img src={logoSvg} alt="NariSangha Logo" className="brand-logo" />
      </Link>
      <div className="brand-text">
        <Link to="/home" className="brand-title-link">
          <div className="brand-title">{getProperty("brand.title", language)}</div>
        </Link>
        <div className="brand-subtitle">
          {getProperty("brand.subtitle", language)}
        </div>
      </div>
    </div>
  );
};

export default BrandBlock;

