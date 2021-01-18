## 适用版本

本文档适用于 NexusPHP(以下简称 NP) 经修改的版本，版本号：`1.6.*`

## 环境要求

- PHP: 7.2 或以上，必须扩展 mysqli, mbstring, gd。PHP 7.0/7.1未测试，PHP 5.x 不支持，如有需要，请使用 [v1.5 原始版本](https://github.com/xiaomlove/nexusphp/releases/tag/v1.5)。
- Mysql: 5.0 ~ 8.0 均可，低于 5.0 不敢保证没有问题。
- Redis: 任意版本。这是可选的缓存组件，若要启用，PHP 需要安装 redis 扩展。强烈建议启用。

::: tip
PHP  gd 扩展必须启用对 jpeg 的支持。可通过打印函数 `gd_info()` 的结果来确认是否已经支持。下边是已经支持的输出结果：
:::
```

array(13) {
  ["GD Version"]=>
  string(26) "bundled (2.1.0 compatible)"
  ["FreeType Support"]=>
  bool(true)
  ["FreeType Linkage"]=>
  string(13) "with freetype"
  ["GIF Read Support"]=>
  bool(true)
  ["GIF Create Support"]=>
  bool(true)
  ["JPEG Support"]=>
  bool(true)
  ["PNG Support"]=>
  bool(true)
  ["WBMP Support"]=>
  bool(true)
  ["XPM Support"]=>
  bool(true)
  ["XBM Support"]=>
  bool(true)
  ["WebP Support"]=>
  bool(true)
  ["BMP Support"]=>
  bool(true)
  ["JIS-mapped Japanese Font Support"]=>
  bool(false)
}
```
