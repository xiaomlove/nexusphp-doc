module.exports = {
  title: 'NexusPHP 使用文档',
  description: 'by xiaomlove',
  themeConfig: {
    sidebarDepth: 2,
    sidebar: [
      ['start', '起步'],
      ['installation', '安装'],
      ['configuration', '设置'],
      ['update', '升级'],
      ['development', '开发'],
    ],
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
    ]
  ]
}