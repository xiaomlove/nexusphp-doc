<ArticleTopAd></ArticleTopAd>

## Applicable Versions

This document applies to the modified version of NexusPHP (hereafter referred to as NP), version number: >= `1.6`.

## Definition of the term

The meanings of some of the proper nouns included in this document.
- ROOT_PATH, the root directory where the application is deployed, in this case `/usr/share/nginx/html/demo.nexusphp.org`.
- RUN_PATH, the root directory that the web server accesses, in this case `ROOT_PATH . 'public'`, **Note to configure to the public directory ! Note to configure to the public directory! Note to configure to the public directory!**
- PHP_USER, the user running PHP, usually `www-data or www`, please be practical.
- DOMAIN, the domain name of the website, e.g. `demo.nexusphp.org`.

## Environment requirements

### PHP
- 1.6～1.8: 8.0｜8.1｜8.2  
- 1.9+: 8.2｜8.3｜8.4

required extensions:  
`bcmath, ctype, curl, fileinfo, json, mbstring, openssl, pdo_mysql, tokenizer, xml, mysqli, gd, redis, pcntl, sockets, posix, gmp, opcache, zip, intl, pdo_sqlite, sqlite3`

### Database
- Mysql: 5.7 latest version or above is recommended
- Redis: 2.6.12 or above

### Other
- rsync, sync files when updating versions
- supervisor, queue executor process guarding



