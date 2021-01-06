## 获取程序

- 可到 [sourceforge.net](https://sourceforge.net/projects/nexusphp/) 切换到 Files ，下载 [起步](/start.html#适用版本) 中提到的版本。
- 或者到此 [Github 仓库](https://github.com/xiaomlove/nexusphp) 选择 v1.5 这个 release 进行下载。

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

Query OK, 0 rows affected, 1 warning (0.00 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 10 rows affected (0.01 sec)
Records: 10  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 4 warnings (0.00 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 1 row affected (0.00 sec)

Query OK, 0 rows affected, 5 warnings (0.01 sec)

Query OK, 17 rows affected (0.00 sec)
Records: 17  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 1 row affected (0.00 sec)

Query OK, 0 rows affected, 8 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 7 rows affected (0.00 sec)
Records: 7  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 6 rows affected (0.00 sec)
Records: 6  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 1 row affected (0.00 sec)

Query OK, 0 rows affected, 5 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 4 warnings (0.00 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 9 rows affected (0.00 sec)
Records: 9  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 2 warnings (0.02 sec)

Query OK, 1 row affected (0.01 sec)

Query OK, 0 rows affected, 12 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 5 rows affected (0.00 sec)
Records: 5  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 6 warnings (0.01 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 100 rows affected (0.00 sec)
Records: 100  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 18 rows affected (0.00 sec)
Records: 18  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 7 warnings (0.00 sec)

Query OK, 61 rows affected (0.01 sec)
Records: 61  Duplicates: 0  Warnings: 0

Query OK, 57 rows affected (0.00 sec)
Records: 57  Duplicates: 0  Warnings: 0

Query OK, 61 rows affected (0.01 sec)
Records: 61  Duplicates: 0  Warnings: 0

Query OK, 10 rows affected (0.00 sec)
Records: 10  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 9 warnings (0.00 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 0 rows affected, 2 warnings (0.00 sec)

Query OK, 7 rows affected (0.01 sec)
Records: 7  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 5 warnings (0.00 sec)

Query OK, 31 rows affected (0.01 sec)
Records: 31  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 2 warnings (0.00 sec)

Query OK, 0 rows affected, 7 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 9 rows affected (0.00 sec)
Records: 9  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 5 warnings (0.01 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 9 rows affected (0.00 sec)
Records: 9  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 0 rows affected, 7 warnings (0.00 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 11 warnings (0.00 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 5 warnings (0.01 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 0 rows affected, 5 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 0 rows affected, 5 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 0 rows affected, 6 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 22 rows affected (0.01 sec)
Records: 22  Duplicates: 0  Warnings: 0

Query OK, 8 rows affected (0.00 sec)
Records: 8  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 100 rows affected (0.00 sec)
Records: 100  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 12 warnings (0.01 sec)

Query OK, 1 row affected (0.00 sec)

Query OK, 0 rows affected, 9 warnings (0.00 sec)

Query OK, 22 rows affected (0.01 sec)
Records: 22  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 4 warnings (0.00 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 0 rows affected, 10 warnings (0.00 sec)

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 6 rows affected (0.00 sec)
Records: 6  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 5 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 4 rows affected (0.01 sec)
Records: 4  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 2 warnings (0.00 sec)

Query OK, 5 rows affected (0.00 sec)
Records: 5  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 7 warnings (0.01 sec)

Query OK, 0 rows affected, 3 warnings (0.00 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 12 rows affected (0.00 sec)
Records: 12  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 3 warnings (0.01 sec)

Query OK, 5 rows affected (0.00 sec)
Records: 5  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected, 8 warnings (0.00 sec)

Query OK, 0 rows affected, 22 warnings (0.01 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 1 row affected (0.00 sec)

Query OK, 0 rows affected, 2 warnings (0.01 sec)

Query OK, 18 rows affected (0.00 sec)
Records: 18  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 32 warnings (0.02 sec)

Query OK, 0 rows affected (0.05 sec)
Records: 0  Duplicates: 0  Warnings: 0

Query OK, 1 row affected (0.00 sec)

Query OK, 0 rows affected, 4 warnings (0.01 sec)

Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

Query OK, 0 rows affected, 1 warning (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 1

Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

Query OK, 1 row affected (0.00 sec)

Query OK, 1 row affected (0.00 sec)
```

## 配置 Web 服务器

以 nginx 为例，只需要最基本的配置即可。在 nginx 配置目录（一般为 /etc/nginx/conf.d/）下新增一个 nexusphp.conf

```
server {

    root /YOUR_WEB_PATH;

    server_name xxx.xxx.com;

    location / {
        index index.html index.php;
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php {
        fastcgi_pass 127.0.0.1:9000; # 以实际为准
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    access_log /var/log/nginx/xxx.xxx.com.access.log;
    error_log /var/log/nginx/xxx.xxx.come.error.log;
}
```

添加完成后，nginx -t 测试是否有错误，无错误 nginx -s reload 重启生效。

