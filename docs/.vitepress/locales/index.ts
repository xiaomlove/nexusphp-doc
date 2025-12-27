import { defineConfig } from 'vitepress'
import en from './en'
import zh from './zh'

export default defineConfig({
    locales: {
        root: {
            lang: 'zh',
            label: '中文',
            themeConfig: zh.themeConfig,
            title: zh.title,
            description: zh.description
        },
        en: {
            lang: 'en-US',
            label: 'English',
            themeConfig: en.themeConfig,
            title: en.title,
            description: en.description
        },
    }
})
