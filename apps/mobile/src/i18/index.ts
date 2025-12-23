// Language utility - dynamically loads properties based on language code

import englishProperties from './en';
import hindiProperties from './hi';
import kannadaProperties from './kn';
import bengaliProperties from './bn';

// Language property maps
const languageMaps: Record<string, Record<string, string>> = {
  en: englishProperties,
  hi: hindiProperties,
  kn: kannadaProperties,
  bn: bengaliProperties,
};

// Get properties for a specific language
export const getLanguageProperties = (languageCode: string = 'en'): Record<string, string> => {
  return languageMaps[languageCode] || languageMaps['en'];
};

// Get a property value for a specific language
export const getProperty = (key: string, languageCode: string = 'en'): string => {
  const properties = getLanguageProperties(languageCode);
  return properties[key] || key;
};

// Language options for the language switcher (common for all languages)
export const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'বাংলা' },
];

