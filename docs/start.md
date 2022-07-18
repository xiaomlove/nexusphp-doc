<ArticleTopAd></ArticleTopAd>

## 适用版本

本文档适用于 NexusPHP(以下简称 NP) 经修改的版本，版本号：`1.6.*`

## 名词释义

本文档所包含的一些专有名词含义：
- ROOT_PATH，指部署应用的根目录，如 `/usr/share/nginx/html/demo.nexusphp.org`
- RUN_PATH，指入口文件所在目录，在这里为 `ROOT_PATH . 'public'`，**注意要配置到 public 目录！！！注意要配置到 public 目录！！！注意要配置到 public 目录！！！**
- PHP_USER，指运行 PHP 的用户，一般为 `www-data 或 www`，以具体为准
- DOMAIN, 指网站域名，如 `demo.nexusphp.org`

## 环境要求

- PHP: 8.0，必须扩展：bcmath, ctype, curl, fileinfo, json, mbstring, openssl, pdo_mysql, tokenizer, xml, mysqli, gd, redis, pcntl, sockets, posix。强烈建议开启 opcache！
- Mysql: 推荐 5.7 最新版或以上
- Redis: 2.0.0 或以上



