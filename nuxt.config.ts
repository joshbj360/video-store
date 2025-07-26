// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: [
    'nuxt-icon', 
    '@pinia/nuxt', 
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/cloudinary',
    '@nuxtjs/supabase',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  cloudinary: {
    cloudName: 'dcci05bzj'
  },
  supabase: {

  }
});
