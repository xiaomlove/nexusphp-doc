<ArticleTopAd></ArticleTopAd>

## Applicable Versions

This document applies to the modified version of NexusPHP (hereafter referred to as NP), version number: `1.6.*`.

## Definition of the term

The meanings of some of the proper nouns included in this document.
- ROOT_PATH, the root directory where the application is deployed, in this case `/usr/share/nginx/html/demo.nexusphp.org`.
- RUN_PATH, the root directory that the web server accesses, in this case `ROOT_PATH . 'public'`, **Note to configure to the public directory ! Note to configure to the public directory! Note to configure to the public directory!**
- PHP_USER, the user running PHP, usually `www-data or www`, please be practical.
- DOMAIN, the domain name of the website, e.g. `demo.nexusphp.org`.

## Environment requirements

- PHP: 8.0, must have extensions: bcmath, ctype, fileinfo, json, mbstring, openssl, pdo_mysql, tokenizer, xml, mysqli, gd, redis. opcache is highly recommended!
- Mysql: 5.7 latest version or above is recommended
- Redis: 1.0.0 or above




