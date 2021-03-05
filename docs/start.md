## 适用版本

本文档适用于 NexusPHP(以下简称 NP) 经修改的版本，版本号：`1.6.*`

## 名词释义

本文档所包含的一些专有名词含义：
- ROOT_PATH，指部署应用的根目录，如 `/usr/share/nginx/html/demo.nexusphp.org`
- WEB_ROOT，指 Web 服务器访问到的根目录，在这里为 `ROOT_PATH . 'public'`，**注意要配置到 public 目录！！！注意要配置到 public 目录！！！注意要配置到 public 目录！！！**
- PHP_USER，指运行 PHP 的用户，一般为 `www-data 或 www`，以具体为准
- DOMAIN, 指网站域名，如 `demo.nexusphp.org`

## 环境要求

- PHP: 7.2 或以上，必须扩展 mysqli, mbstring, gd。PHP 7.0/7.1未测试。PHP 5.x 不支持，如有需要，请使用 [v1.5 原始版本](https://github.com/xiaomlove/nexusphp/releases/tag/v1.5)。
- Mysql: 5.0 ~ 8.0 均可，低于 5.0 不敢保证没有问题。
- Redis: 任意版本。这是可选的缓存组件，若要启用，PHP 需要安装 redis 扩展。强烈建议启用。



