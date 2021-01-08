## 获取程序

- 可到 [sourceforge.net](https://sourceforge.net/projects/nexusphp/) 切换到 Files ，下载 [起步](/start.html#适用版本) 中提到的版本。
- 或者到此 [Github 仓库](https://github.com/xiaomlove/nexusphp) 选择 v1.5 这个 release 进行下载。二者是一样的。

## 初始化数据库

首先登录 Mysql，新建一个数据库，字符集(charset)及排序规则(collate)选择 `utf8 + utf8_general_ci` 或 `utf8mb4 + utf8mb4_general_ci` 。后者支持存储 emoji 表情，前者不支持。
```
mysql> create database `nexusphp` default charset=utf8mb4 collate utf8mb4_general_ci;
Query OK, 1 row affected (0.06 sec)
```

::: tip
`utf8mb4` 需要 Mysql 5.5.3 或以上才支持。
:::
表结构及初始化基础数据脚本是程序根目录下的 `_db/dbstructure.sql` 文件，将之导入到库中。在使用 source 命令导入之前要先 use 那个数据库。

```
mysql> use nexusphp;
Database changed
mysql> source /YOUR_WEB_PATH/_db/dbstructure.sql;
Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

.
.
.
```

## 配置 Web 服务器

以 nginx 为例，只需要最基本的配置即可。在 nginx 配置目录（一般为 /etc/nginx/conf.d/）下新增一个 nexusphp.conf

```
server {

    # 以实际为准
    root /YOUR_WEB_PATH; 

    server_name demo.nexusphp.cn;

    location / {
        index index.html index.php;
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php {
        # 以实际为准
        fastcgi_pass 127.0.0.1:9000; 
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    access_log /var/log/nginx/demo.nexusphp.cn.access.log;
    error_log /var/log/nginx/demo.nexusphp.cn.error.log;
}
```

添加完成后，`nginx -t` 测试是否有错误，无错误 `nginx -s reload` 重启生效。

## 基本配置

在开始访问之前需要先配置下数据信息。打开 `config/allconfig.php`, 找到约 151 行的 $BASIC，修改为正确的值。
```php
$BASIC=array(
    'SITENAME' => 'NexusPHP',
    'BASEURL' => 'demo.nexusphp.cn',
    'announce_url' => 'demo.nexusphp.cn/announce.php',
    'mysql_host' => 'localhost',
    'mysql_user' => 'root',
    'mysql_pass' => 'nexusphprocks',
    'mysql_db' => 'nexusphp',
);
```

更改网站目录拥有者为 PHP 运行用户（一般为 www-data），保证有 PHP 有权限对以下目录进行读写。

- 配置文件目录：config
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
chmod 777 config attachments subs torrents imdb/cache imdb/images
```

这时访问网站 URL，不出问题会跳转到登录页。注册一个账号，成功后，将其设置为超级管理员。
```
mysql> update users set class=16 where username='xiaomlove';
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

使用此超级管理员账号登录，即安装完成。

## 问题排查

如果不能正常访问，查看 nginx error log。  

如果看不到错误，可能是 php-fpm 错误没有输出到 nginx error log。打开 www.conf（不知道在哪尝试 `whereis php-fpm`，能看到基本目录），找到 `catch_workers_out` 及 `php_admin_flag[log_errors]`，保证其为打开状态。  

修改重启 php-fpm 生效。
```
catch_workers_out = yes
php_admin_flag[log_errors] = on
```

如果依然看不到错误，修改 `include/core.php` 约第 5 行，把错误展示到页面上。
``` php
ini_set('display_errors', 1);
```

::: danger
修复错误后，记得把错误展示关闭！
:::