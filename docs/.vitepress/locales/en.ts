import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'en-US',

    title: 'NexusPHP Documentation',
    description: 'Installation, usage, setting, upgrade and development about NexusPHP',
    themeConfig: {
        nav: nav(),
        sidebar: [
            { text: 'Start', link: '/en/start' },
            { text: 'Installation', link: '/en/installation' },
            { text: 'Installation By AAPannel', link: '/en/installation_bt' },
            { text: 'Installation By Docker(>=1.9)', link: '/en/installation_docker' },
            { text: 'Configuration', link: '/en/configuration' },
            { text: 'Upgrade 1.6', link: '/en/update' },
            { text: 'Upgrade 1.7', link: '/en/update1.7' },
            { text: 'Upgrade 1.8', link: '/en/update1.8' },
            { text: 'Upgrade 1.9', link: '/en/update1.9' },
            { text: 'FAQ', link: '/en/faq' },
        ],
        outline: [2, 3],
    }
})

function nav() {
    return [
        { text: 'Blog', link: 'https://nexusphp.org/' },
    ]
}
