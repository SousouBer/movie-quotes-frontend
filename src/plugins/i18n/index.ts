import { createI18n } from "vue-i18n";
import en from "./lang/en/index.ts";
import ka from "./lang/ka/index.ts";

const messages = {
  en,
  ka,
};

const i18n = createI18n({
  legacy: false,
  locale: "ka",
  fallbackLocale: "en",
  messages,
});

export default i18n;
