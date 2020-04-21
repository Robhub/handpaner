export default {
    head: {
        titleTemplate: 'Handpaner',
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
    buildModules: ['@nuxt/typescript-build'],
    build: {
        extend(config, { isDev, isClient }) {
            config.output.publicPath = '/pan/_nuxt/'
            return config
        },
    },
    router: {
        base: '/pan/',
    },
}
