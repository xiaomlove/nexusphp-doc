import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh',
    title: 'NexusPHP 文档',
    description: '包含 NexusPHP 的安装、使用、设置、升级、开发等相关知识',

    themeConfig: {
        nav: nav(),
        sidebar: [
            { text: '起步', link: '/start' },
            { text: '手动安装', link: '/installation' },
            { text: '宝塔面板安装', link: '/installation_bt' },
            { text: '1Panel 安装', link: '/installation_1panel' },
            { text: 'Docker 安装(>=1.9)', link: '/installation_docker' },
            { text: '设置', link: '/configuration' },
            { text: 'Go Tracker', link: '/go_tracker' },
            { text: 'ClickHouse', link: '/clickhouse' },
            { text: '升级1.6', link: '/update' },
            { text: '升级1.7', link: '/update1.7' },
            { text: '升级1.8', link: '/update1.8' },
            { text: '升级1.9', link: '/update1.9' },
            { text: '常见问题', link: '/faq' },
        ],
        outline: [2, 3],
    }
})

function nav() {
    return [
        { text: '博客', link: 'https://nexusphp.org/' },
    ]
}
