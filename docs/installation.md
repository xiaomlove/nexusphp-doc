<ArticleTopAd></ArticleTopAd>

## 获取程序

克隆 [xiaomlove/nexusphp](https://github.com/xiaomlove/nexusphp)，然后切换到最新的 release 标签再安装，或者直接下载最新 [release](https://github.com/xiaomlove/nexusphp/releases/latest)。
:::warning
克隆时务必切换到某个 release 进行安装。不要使用最新的开发代码！ 
:::

## 创建数据库

首先登录 Mysql，新建一个数据库，字符集(charset)及排序规则(collate)选择 `utf8 + utf8_general_ci` 或 `utf8mb4 + utf8mb4_general_ci` 。后者支持存储 emoji 表情，前者不支持。
```
mysql> create database `nexusphp` default charset=utf8mb4 collate utf8mb4_general_ci;
Query OK, 1 row affected (0.06 sec)
```

::: tip
`utf8mb4` 需要 Mysql 5.5.3 或以上才支持。
:::


## 配置 Web 服务器

### 不启用 https 配置
以 nginx 为例，只需要最基本的配置即可。在 nginx 配置目录（一般为 /etc/nginx/conf.d/）下新增一个 nexusphp.conf

```
server {

    # 以实际为准
    root /RUN_PATH; 

    server_name DOMAIN;

    location / {
        index index.html index.php;
        try_files $uri $uri/ /nexus.php$is_args$args;
    }

    # Filament
    location ^~ /filament {
        try_files $uri $uri/ /nexus.php$is_args$args;
    }

    location ~ \.php {
        # 以实际为准
        fastcgi_pass 127.0.0.1:9000; 
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    access_log /var/log/nginx/DOMAIN.access.log;
    error_log /var/log/nginx/DOMAIN.error.log;
}
```

### 启用 https 配置
启用 https，首先得准备好证书（参见下方 [关于 https]）。
```
server {
    listen 443 ssl;
    ssl_certificate /SOME/PATH/DOMAIN.pem;
    ssl_certificate_key /SOME/PATH/DOMAIN.key;

    # 以实际为准
    root /RUN_PATH; 

    server_name DOMAIN;

    location / {
        index index.html index.php;
        try_files $uri $uri/ /nexus.php$is_args$args;
    }

    # Filament
    location ^~ /filament {
        try_files $uri $uri/ /nexus.php$is_args$args;
    }

    location ~ \.php {
        # 以实际为准
        fastcgi_pass 127.0.0.1:9000; 
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    access_log /var/log/nginx/DOMAIN.access.log;
    error_log /var/log/nginx/DOMAIN.error.log;
}
# http 跳转 https
server {
    if ($host = DOMAIN) {
        return 301 https://$host$request_uri;
    }
    server_name DOMAIN;
    listen 80;
    return 404;
}
```

添加完成后，`nginx -t` 测试是否有错误，无错误 `nginx -s reload` 重启生效。


## 安装过程

### 安装准备

以下在ROOT_PATH下执行：
- `composer install`，安装依赖 
- `cp -R nexus/Install/install public/`，复制 `nexus/Install/install` 到 `public/`，保证最后 `public/install/install.php` 存在
- `chown -R PHP_USER:PHP_USER ROOT_PATH`，设置根目录所有者为运行 PHP 的用户
- 上面一步如果不知道 PHP_USER 是谁，亦可将整个目录赋予 0777 权限：`chmod -R 0777 ROOT_PATH`

以上准备工作做完，打开网站域名正常会跳转安装界面。

### 执行安装
按实际情况填写每一步，**注意选对时区，否则时间不对，更有可能客户端无法汇报**。点击下一步，直到完成。

### 创建后台任务

创建用户 PHP_USER 的定时任务，执行：crontab -u PHP_USER -e，在打开的界面输入以下：
```
* * * * * cd ROOT_PATH && php artisan schedule:run >> /tmp/schedule_DOMAIN.log
* * * * * cd ROOT_PATH && php include/cleanup_cli.php >> /tmp/cleanup_cli_DOMAIN.log
```
如果没有生效，查看 `/etc` 下是否有 `crontab` 文件，如果有，在里边编辑亦可：
```
* * * * * PHP_USER cd ROOT_PATH && php artisan schedule:run >> /tmp/schedule_DOMAIN.log
* * * * * PHP_USER cd ROOT_PATH && php include/cleanup_cli.php >> /tmp/cleanup_cli_DOMAIN.log
```
可通过查看重定向文件（也就是 >> 后面指向的那个文件）是否有内容输出确定是否生效。
:::danger
完成后，删除 `public/install` 目录。安装日志包含敏感数据，不要泄露。
:::

### 创建队列守护进程(>=1.8需要)

安装好 supervisor，在其配置目录（一般为 /etc/supervisor/conf.d/）下新增一个配置文件 nexus-queue.conf，**注意替换 ROOT_PATH, PHP_USER**，其中 numprocs 是启动的进程数，一般为自己 CPU 核心数即可。
```
[program:nexus-queue]
process_name=%(program_name)s_%(process_num)02d
command=php ROOT_PATH/artisan queue:work --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=PHP_USER
numprocs=2
redirect_stderr=true
stopwaitsecs=3600
stdout_logfile=/tmp/nexus-queue.log
```

:::tip
对于 1.9 以上版本，使用 horizon 代替 queue:work
```
[program:nexus-queue]
process_name=%(program_name)s_%(process_num)02d
command=php ROOT_PATH/artisan horizon
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=PHP_USER
redirect_stderr=true
stopwaitsecs=3600
stdout_logfile=/tmp/nexus-queue.log
```
:::

保存好后执行以下命令启动之：
```
# 启动
supervisord -c /etc/supervisor/supervisord.conf

# 重新读取配置文件
supervisorctl reread

# 更新进程组
supervisorctl update

# 启动
supervisorctl start nexus-queue:*
```

## 问题排查

如果不能正常跳转安装界面，查看 nginx error log。  

如果看不到错误，可能是 php-fpm 错误没有输出到 nginx error log。打开 www.conf（不知道在哪尝试 `whereis php-fpm`，能看到基本目录），找到 `catch_workers_out` 及 `php_admin_flag[log_errors]`，保证其为打开状态。  

修改重启 php-fpm 生效。
```
catch_workers_out = yes
php_admin_flag[log_errors] = on
```

如果依然看不到错误，修改 `include/core.php` 约第 18 行，把 0 改为 1，把错误展示到页面上。
``` php
ini_set('display_errors', 1);
```

::: danger
修复错误后，记得把错误展示关闭！
:::

## 其他

### 关于 https

建议使用 cloudflare 的 DNS 解析服务，它会提供免费的 ssl 证书。在 SSL/TLS 菜单下，加密模式选择完全或严格，在 [源服务器] 子菜单下创建好证书，保存上传到源服务器，按上边文档所说配置即可。
