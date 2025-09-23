import { defineConfig } from 'vitepress'
import locales from './locales'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NexusPHP 文档",
  locales: locales.locales,
  description: "包含 NexusPHP 的安装、使用、设置、升级、开发等相关知识",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Blog', link: 'https://nexusphp.org/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaomlove/nexusphp' }
    ]
  },

  head: [
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?84c0d2679e49f1c63eb79fe1f08b6b11";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ],
    ['meta', { name: 'keywords', content: 'PT, BT, bitbucket, torrent, Private Tracker, Documentation, Doc, 使用文档' }],
    ['meta', { name: 'keywords', content: 'NexusPHP, Install, Update, Configuration, Development' }]
  ]
})
