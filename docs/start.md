## 适用版本

本文档适用于 NexusPHP(以下简称 NP) 未经修改的原始版本，版本号：`nexusphp.v1.5.beta5.20120707`

## 环境要求

- PHP: 5.3 ~ 5.6，必须扩展 mysql, mbstring, gd。PHP 7.x 或 PHP 8.x 不支持。如需支持，请使用 [修改版本](http://nexusphp.cn/2021/01/04/update-nexusphp-support-with-php7-and-php8/)。
- Mysql: 5.0 ~ 8.0 均可，低于 5.0 不敢保证没有问题。
- Memcache: 任意版本。这是可选的缓存组件，若要启用，PHP 需要安装 memcache 扩展（注意不是 memcached）。

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
