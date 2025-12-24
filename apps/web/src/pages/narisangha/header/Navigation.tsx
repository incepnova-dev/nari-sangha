import React from "react";
import { getProperty } from "../../../i18";

interface NavigationProps {
  setViewMode: (mode: string) => void;
  language?: string;
}

const Navigation: React.FC<NavigationProps> = ({ setViewMode, language = "en" }) => {
  return (
    <nav className="nav-links">
      {/* <a href="#start">Start</a> */}
      <a href="#mygroups" onClick={() => setViewMode("mygroups")}>
        {getProperty("navigation.myGroups", language)}
      </a>
      <a href="#forum">
        {getProperty("navigation.liveQA", language)}
      </a>
      {/* <a href="#safety">Safety</a> */}
      {/* <a href="#external">External</a> */}
    </nav>
  );
};

export default Navigation;

