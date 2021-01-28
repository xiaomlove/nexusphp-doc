## 获取程序

克隆 [xiaomlove/nexusphp](https://github.com/xiaomlove/nexusphp) 即可。

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
    root /<WEB_ROOT>; 

    server_name <DOMAIN>;

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

    access_log /var/log/nginx/<DOMAIN>.access.log;
    error_log /var/log/nginx/<DOMAIN>.error.log;
}
```

### 启用 https 配置
启用 https，首先得准备好证书。
```
server {
    listen 443 ssl;
    ssl_certificate /SOME/PATH/<DOMAIN>.pem;
    ssl_certificate_key /SOME/PATH/<DOMAIN>.key;

    # 以实际为准
    root /<WEB_ROOT>; 

    server_name <DOMAIN>;

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

    access_log /var/log/nginx/<DOMAIN>.access.log;
    error_log /var/log/nginx/<DOMAIN>.error.log;
}
# http 跳转 https
server {
    if ($host = <DOMAIN>) {
        return 301 https://$host$request_uri;
    }
    server_name <DOMAIN>;
    listen 80;
    return 404;
}
```

添加完成后，`nginx -t` 测试是否有错误，无错误 `nginx -s reload` 重启生效。

## 过程程序

### 安装准备

以下在<ROOT_PATH>下执行：
- `composer install`，安装依赖 
- `cp -R nexus/Install/install public/`，复制 `nexus/Install/install` 到 `public/`，保证最后 `public/install/install.php` 存在
- `chown -R <PHP_USER>:<PHP_USER> <ROOT_PATH>`，设置根目录所有者为运行 PHP 的用户
- 上面一步如果不知道 <PHP_USER> 是谁，亦可将整个目录赋予 0777 权限：`chmod -R 0777 <ROOT_PATH>`

以上准备工作做完，打开网站域名正常会跳转安装界面。

### 第1步：环境检测
检测 PHP 版本以及相关扩展是否符合要求。

### 第2步：添加 .env 文件
检测程序自带的 `.env.example` 是否存在。若存在，读取显示出来，按实际情况填写提交便会生成 `.env` 文件。

### 第3步：创建数据表
新建的所需要的数据表。

### 第4步：导入数据
导入默认的数据，并根据设定链接相关存储目录到 public 目录。

### 第5步：创建系统管理员
填写用户名、邮箱、密码，创建一个最高权限的系统管理员。

:::danger
完成后，删除 `public/install` 目录
:::

## 问题排查

如果不能正常跳转安装界面，查看 nginx error log。  

如果看不到错误，可能是 php-fpm 错误没有输出到 nginx error log。打开 www.conf（不知道在哪尝试 `whereis php-fpm`，能看到基本目录），找到 `catch_workers_out` 及 `php_admin_flag[log_errors]`，保证其为打开状态。  

修改重启 php-fpm 生效。
```
catch_workers_out = yes
php_admin_flag[log_errors] = on
```

如果依然看不到错误，修改 `include/core.php` 约第 10 行，把 0 改为 1，把错误展示到页面上。
``` php
ini_set('display_errors', 1);
```

::: danger
修复错误后，记得把错误展示关闭！
:::

## 其他

### 要不要启用 https

建议启用。一是为了安全，二也为了去除浏览器碍眼的“不安全”字样。免费的证书有 [Let's Encrypt](https://letsencrypt.org/)，其他一些云服务器厂商也有提供。

### 要不要上 Cloudflare

没必要。国内 PT 站都喜欢上，但不备案不付费是没有国内节点提供的，上了反而慢很多（防攻击当没说...）。
