module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'NexusPHP 文档 | Documentation',
      description: '包含 NexusPHP 的安装、使用、设置、升级、开发等相关知识',
    },
    '/en/': {
      lang: 'en-US',
      title: 'NexusPHP | Documentation',
      description: 'Installation, usage, setting, upgrade and development about NexusPHP',
    }
  },
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true,
    sidebarDepth: 2,
    locales: {
      '/': {
        selectText: '选择语言',
        Label: '中文',
        ariaLabel: '选择语言',
        sidebar: [
          ['start', '起步'],
          ['installation', '安装'],
          ['configuration', '设置'],
          ['update', '升级'],
          ['development', '开发'],
        ],
      },
      '/en/': {
        selectText: 'Languages',
        Label: 'English',
        ariaLabel: 'Languages',
        sidebar: {
          '/en/': [
            ['start', 'Start'],
            ['installation', 'Installation'],
            ['configuration', 'Configuration'],
            ['update', 'Upgrade'],
            ['development', 'Devlopment'],
          ]
        }
      }
    },
    nav: [
        { text: 'Blog', link: 'http://nexusphp.org/' },
        { text: 'Github', link: 'https://github.com/xiaomlove/nexusphp' }
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
    ['meta', { name: 'keywords', content: 'PT, BT, bitbucket, torrent, Private Tracker, Documentation, Doc, 使用文档'}],
    ['meta', { name: 'keywords', content: 'NexusPHP, Install, Update, Configuration, Development'}]
  ],
  plugins: [
    ['@vuepress/back-to-top'],
    [
      "vuepress-plugin-comment",
      {
        choosen: "valine",
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: "#valine-vuepress-comment",
          appId: "aMSykHHsQF27dUU9ucankbc9-gzGzoHsz",
          appKey: "Oqf9pvRrAoFfuEL0C3CtJJId",
          path: '<%- frontmatter.to.path %>',
          visitor: true // 阅读量统计
        }
      }
    ]
  ]
}