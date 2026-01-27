import { useI18nContext } from "../i18n/index";
import { languages } from "../i18n/languages";

export const useI18n = () => {
  const ctx = useI18nContext();
  return {
    ...ctx,
    languages,
  };
};

