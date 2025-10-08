export default {
  // Non-SSR, mode SPA
  ssr: false,
  target: "static",

  // Metadata halaman
  head: {
    title: process.env.npm_package_name || "Nuxt App",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/assets/css/bootstrap.min.css" },
    ],
    script: [
      { src: "/assets/js/bootstrap.bundle.min.js", body: true },
    ],
  },

  // Warna loading bar
  loading: { color: "#fff" },

  // CSS global
  css: [],

  // Plugin sebelum mounting
  plugins: ["@/plugins/api.js"],

  // Aktifkan auto-import komponen
  components: true,

  // Build modules (dev)
  buildModules: [
    // '@nuxtjs/tailwindcss'
  ],

  // Modules Nuxt
  modules: ["@nuxtjs/axios"],

  // Konfigurasi Axios
  axios: {
    baseURL: "http://localhost:8000", // URL API SlimPHP
  },

  // Router configuration
  router: {
    mode: "history",
  },

  // Build configuration
  build: {},
};
