## Applicable Versions

This document applies to the modified version of NexusPHP (hereafter referred to as NP), version number: `1.6.*`.

## Definition of the term

The meanings of some of the proper nouns included in this document.
- ROOT_PATH, the root directory where the application is deployed, in this case `/usr/share/nginx/html/demo.nexusphp.org`.
- WEB_ROOT, the root directory that the web server accesses, in this case `ROOT_PATH . 'public'`, **Note to configure to the public directory ! Note to configure to the public directory! Note to configure to the public directory!**
- PHP_USER, the user running PHP, usually `www-data or www`, please be practical.
- DOMAIN, the domain name of the website, e.g. `demo.nexusphp.org`.

## Environment requirements

- PHP: 7.3 or above, must have extensions: ctype, fileinfo, json, mbstring, openssl, pdo_mysql, tokenizer, xml, mysqli, gd.
- Mysql: 5.7 or above is recommended.
- Redis: Any version. This is an optional caching component, to enable it, PHP needs to install the redis extension. It is highly recommended to enable it.



