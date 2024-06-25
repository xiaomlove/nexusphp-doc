<ArticleTopAd></ArticleTopAd>

## 关于宝塔面板

宝塔面板是一款简单好用的服务器运维管理面板，支持中文，有较好的中文社区支持。

## 安装宝塔面板

访问 [宝塔官网](https://www.bt.cn/)，选择适合自己服务器系统的宝塔面板安装命令，按照宝塔面板官方文档进行安装。

## 使用宝塔面板安装 LNMP 环境

在宝塔面板中，我们可以一键安装 LNMP 环境，即 Linux, Nginx, MySQL, PHP。

1. 登录宝塔面板。绑定账号。在弹出的一键安装窗口选择Lnmp。
2. 如果没有发现弹出窗口，可在面板菜单点击 `软件商店`。
3. 分别安装 Nginx, MySQL, PHP, phpMyAdmin(可选)。

Nginx 建议直接最新版，MySQL建议8.0，PHP 需要8.0+

安装好PHP后点击软件商店，选择已安装PHP的设置，确保以下函数没有被禁用：
- symlink
- putenv
- proc_open
- proc_get_status
- exec
- pcntl_signal
- pcntl_alarm
- pcntl_async_signals

安装如下扩展：
- fileinfo
- redis
- gmp
- opcache

注意： 若gmp安装不成功，请执行以下命令(针对Ubuntu/Debian系统)：
```shell
apt install -y libgmp-dev
```
或者（针对CentOS/Redhat/Fedora）
```
yum install -y libgmp-dev
```

以下扩展默认已安装，你可以在最后检查一下：
- bcmath
- ctype
- curl
- json
- mbstring
- openssl
- pdo_mysql
- tokenizer
- xml
- mysqli
- gd
- pcntl
- sockets
- posix


## 获取程序

克隆 [xiaomlove/nexusphp](https://github.com/xiaomlove/nexusphp)，然后切换到最新的 release 标签再安装，或者直接下载最新 [release](https://github.com/xiaomlove/nexusphp/releases/latest)。
:::warning
克隆时务必切换到某个 release 进行安装。不要使用最新的开发代码！
:::

## 上传程序和配置数据库

1. 在宝塔面板点击 `网站`，点击对应网站的根目录（/www/wwwroot/你的域名），进入文件管理界面。
2. 上传你的程序到站点根目录下。
3. 上传完成后解压。需要注意的是确保文件在网站根目录下，而不是子目录中。应确保 'public' 目录位于根目录的首层。
4. 复制 `nexus/Install/install` 到 `public/`，保证最后 `public/install/install.php` 存在。


## 配置网站

1. 在宝塔面板中点击 `网站`。
2. 点击 `添加站点`。
3. 按提示填写域名，选择 PHP 版本，数据库，类型选择 MySQL，并使用 utf8mb4 编码。填写账号名称，如：nexusphp，然后点击提交。
4. 创建好网站后，点击对应网站的设置。
5. 网站目录: 取消勾选防跨站攻击(open_basedir)，运行目录选择 /public 
6. SSL子菜单，选择Let's Encrypt，一键申请证书
7. 在 Composer 子菜单中，选择相应的 PHP 版本，执行参数设置为 install，其余保持默认设置，然后点击执行。
8. 伪静态，复制粘贴如下配置：
    ```
    location / {
        index index.html index.php;
        try_files $uri $uri/ /nexus.php$is_args$args;
    }
    
    # Filament
    location ^~ /filament {
        try_files $uri $uri/ /nexus.php$is_args$args;
    }
    ```

9. 设置根目录所有者为运行 PHP 的用户www。终端执行命令`chown -R www:www /www/wwwroot/你的域名` 
10. 上面一步如果出错或不知道是什么意思，亦可将整个目录赋予 0777 权限：`chmod -R 0777 /www/wwwroot/你的域名`

以上准备工作做完，打开网站域名正常会跳转安装界面。



### 执行安装
按实际情况填写每一步，**注意选对时区，否则时间不对，更有可能客户端无法汇报**。点击下一步，直到完成。

## 创建后台任务

点击宝塔左侧的计划任务。创建两个计划任务
- 任务类型 Shell脚本
- 任务名称 自由填写
- 执行周期 每N分钟 1分钟

脚本内容如下（记得把 DOMAIN 替换为自己的域名）：

```
su -c "cd /www/wwwroot/DOMAIN && php include/cleanup_cli.php >> /tmp/cleanup_cli_DOMAIN.log" -s /bin/sh www

su -c "cd /www/wwwroot/DOMAIN && php artisan schedule:run >> /tmp/schedule_DOMAIN.log" -s /bin/sh www
```

其中一个示例如下(注意是配置两个独立的任务，每个任务使用上方的一行脚本，而非将两行脚本用于单一任务。)：

<img :src="$withBase('/images/NexusPHP_crontab.png')">

:::danger
**特别提醒：执行周期是每分钟，不能修改！这里的配置只是一个入口，实际运行频率是程序控制的，修改频率整个网站运行不正常！比如魔力不会如期增涨！**

完成后，删除 `public/install` 目录。安装日志包含敏感数据，不要泄露。
:::

### 创建队列守护进程(>=1.8需要)

从宝塔面板的商店安装`进程守护管理器`，点击添加守护进程，按以下格式填写(**注意替换 ROOT_PATH, PHP_USER**)：
```
名称：nexus-queue
启动用户：PHP_USER
运行目录: ROOT_PATH
启动命令：php ROOT_PATH/artisan queue:work --tries=3 --max-time=3600
进程数量：2
```


## 问题排查

如果不能正常跳转安装界面，查看 error log。（/www/wwwlogs/域名.error.log）

如果看不到错误，修改 `include/core.php` 约第 18 行，把 0 改为 1，把错误展示到页面上。
``` php
ini_set('display_errors', 1);
```

::: danger
一旦错误修复，请务必将错误展示设置为关闭状态。
:::

## 其他

### 关于 https

建议使用 cloudflare 的 DNS 解析服务，它会提供免费的 ssl 证书，免费的网站CDN，防止暴漏源站。

在 SSL/TLS 菜单下，加密模式选择完全或严格，在 [源服务器] 子菜单下创建好证书，保存上传到源服务器，按上边文档所说配置即可。

### 调整 PHP 设置

:::warning
宝塔默认 PHP 脚本最大使用内存是 128M，对于网页端请求可能足够，但对于整个 NP 来说是不够的。安装升级依赖以及一些后台任务如定时清理、认领结算等需要循环大量的用户数据，内存不够可能产生一些莫名其妙的问题，因此建议在"PHP 设置" -> "性能设置"中，将最大使用内存修改为 2048 MB。具体依配置而定。
:::