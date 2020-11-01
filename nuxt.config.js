const title = 'Handpaner : harmony for Hang/Handpan players and makers'
const description =
    'Handpaner is a tool for Hang/Handpan players and makers to help them finding scales and chords with musical harmony theory'
const image = 'https://handpaner.com/handpaner.png'

export default {
    server: {
        host: '0.0.0.0',
    },
    head: {
        titleTemplate: 'Handpaner',
        meta: [
            { charset: 'utf-8' },
            { name: 'color-scheme', content: 'light' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: description },
            { name: 'og:title', content: title },
            { name: 'og:image', content: image },
            { name: 'og:description', content: description },
            { name: 'twitter:image', content: image },
            { name: 'twitter:description', content: description },
            { name: 'twitter:title', content: title },
        ],
        link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
    buildModules: ['@nuxt/typescript-build'],
    build: {
        publicPath: '/nuxt/'
    },
    target: 'static',
}
