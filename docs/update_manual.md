## 新增 .env 文件

复制根目录下的 `.env.example` 命名为 `.env`，修改为正确的值。
```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=nexusphp

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DATABASE=0
```

更改网站目录拥有者为 PHP 运行用户（一般为 www-data），保证有 PHP 有权限对以下目录进行读写。

- 附件目录：attachments
- 字幕目录：subs
- 种子目录：torrents
- imdb 页面缓存目录：imdb/cache
- imdb 电影海报目录：imdb/images

```
chown /YOUR_WEB_PATH www-data:www-data
```

如果不知道 PHP 运行用户是哪个，亦可修改这几个目录的读取模式为 777（必须有执行权限，否则会有问题），在根目录下执行：
```
chmod 777 attachments subs torrents imdb/cache imdb/images
```
