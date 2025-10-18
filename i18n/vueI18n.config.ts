export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ja",
  fallbackLocale: "ja",
  datetimeFormats: {
    ja: {
      short: { year: "numeric", month: "2-digit", day: "2-digit" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
    en: {
      short: { year: "numeric", month: "2-digit", day: "2-digit" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
  },
  numberFormats: {
    ja: {
      currency: { style: "currency", currency: "JPY" },
    },
    en: {
      currency: { style: "currency", currency: "USD" },
    },
  },
}));
