export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [`assets/css/style.css`],
  
  modules: [
    '@pinia/nuxt',
    'nuxt-icon'
  ],

  imports: {
    dirs: ["./store"],
  },

  pinia: {
    storesDirs: ["defineStore", "acceptHMRUpdate", "storeToRefs"],
  },
  
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL || "http://127.0.0.1:8000/api",
    },
  },

})
