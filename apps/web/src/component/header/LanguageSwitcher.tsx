import React, { ChangeEvent } from "react";
import { languageOptions } from "../../i18";

interface LanguageSwitcherProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  return (
    <div className="wp-language-switcher">
      {/* <label htmlFor="wp-language-select">Language:</label> */}
      <select
        id="wp-language-select"
        value={language}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
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

