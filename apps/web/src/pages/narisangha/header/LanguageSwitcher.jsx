import React from "react";
import { languageOptions } from "../../../i18";

const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <div className="wp-language-switcher">
      {/* <label htmlFor="wp-language-select">Language:</label> */}
      <select
        id="wp-language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;

