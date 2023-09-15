// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxt/image",
        "nuxt-icon",
        "@pinia/nuxt",
        "@vee-validate/nuxt",
        '@ant-design-vue/nuxt'
    ],
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        },
    },
});
