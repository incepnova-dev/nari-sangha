const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'nari-swasthya-complete', 'preeclampsia_education.html');
const tsxPath = path.join(__dirname, 'src', 'component', 'pages', 'PreeclampsiaEducation.tsx');

const html = fs.readFileSync(htmlPath, 'utf8');
const lines = html.split('\n');

// Extract body content: lines 38-3054 (1-indexed), skip header (lines 14-35) and script/closing tags
// Line 38 = <div class="page-shell">, Line 3054 = </div> closing page-shell
const bodyLines = lines.slice(37, 3054);
let bodyHtml = bodyLines.join('\n');

// Escape backticks and template literal expressions for JS template string
bodyHtml = bodyHtml.replace(/\\/g, '\\\\');
bodyHtml = bodyHtml.replace(/`/g, '\\`');
bodyHtml = bodyHtml.replace(/\$\{/g, '\\${');

const tsx = `import React, { useEffect } from 'react';
import '../../../nari-swasthya-complete/preeclampsia_education.css';

const PreeclampsiaEducation: React.FC = () => {
  useEffect(() => {
    const loadScript = (src: string) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
      return s;
    };

    const s1 = loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    const s2 = loadScript('/js/preeclampsia_education.js');
    const s3 = loadScript('/js/preeclampsia_education_enhanced.js');

    return () => {
      [s1, s2, s3].forEach(s => {
        try { document.body.removeChild(s); } catch (e) {}
      });
    };
  }, []);

  const htmlContent = \`${bodyHtml}\`;

  return (
    <div
      className="preeclampsia-page"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default PreeclampsiaEducation;
`;

fs.writeFileSync(tsxPath, tsx, 'utf8');
console.log('SUCCESS! TSX written with ' + bodyLines.length + ' lines of HTML content.');
console.log('Output: ' + tsxPath);
`;
