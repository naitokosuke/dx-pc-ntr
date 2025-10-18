// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@pinia/colada-nuxt",
    "nuxt-typed-router",
    "@nuxtjs/i18n",
  ],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  devServer: {
    port: 7110,
  },
  compatibilityDate: "2025-07-15",
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: "double",
        semi: true,
      },
    },
  },
  i18n: {
    defaultLocale: "ja",
    locales: [
      { code: "ja", language: "ja-JP", name: "日本語", files: ["ja.yaml"] },
      { code: "en", language: "en-US", name: "English", files: ["en.yaml"] },
    ],
    langDir: "locales",
    vueI18n: "./vueI18n.config.ts",
    strategy: "prefix_except_default",
  },
});
