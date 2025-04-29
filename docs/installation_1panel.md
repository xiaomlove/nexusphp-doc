<ArticleTopAd></ArticleTopAd>


## 安装 1Panel

访问 [1Panel官网](https://1panel.cn/)，按照官方文档进行安装。

## 安装基础组件

直接在其应用商店安装 OpenResty + Mysql + Redis，选择最新版安装即可。

对于 PHP ，建议安装 8.2 版本。来源选择应用商店，扩展模板选择 Default, 再额外添加 redis + gmp + opcache 即可。

<img :src="$withBase('/images/1panel-php.png')">

## 创建网站

创建网站时，选择从运行环境创建，类型是 PHP，运行环境则是刚才安装的 PHP 环境，填写域名与代号，其他均默认即可。

在网站配置，在网站目录一项，将运行目录选择为 `/public`，点击保存并重截。对于运行用户/组一项要求你保存的，也点击保存。

切换至下边的伪静态一项，粘贴以下内容后点击保存并重载：
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
至于 HTTPS 证书，可以直接使用 cloudflare 的，这里略。

## 上传代码

到 Github 下载程序最新版 [release](https://github.com/xiaomlove/nexusphp/releases/latest)。
这里以网站域名为 `1panel.nexusphp.org` 为例。假如你下载到的文件是 `v1.8.15.zip`, 上传到网站根目录的上一层，就是 `/opt/1panel/apps/openresty/openresty/www/sites/1panel.nexusphp.org/v1.8.15.zip`。
将压缩包解压，得到的另外一个文件夹。将原 index 文件夹删除，再将解压出来的目录重命名为 index。

进入到 index 目录，复制 `nexus/Install/install` 到 `public/`，保证最后 `public/install/install.php` 存在。

## 安装依赖
点击 1Panel 容器大菜单，创建网站会自动创建一个 PHP 容器，点击终端按钮，在弹出的页面中什么都不用做直接点击连接，进入容器内部。
默认是在 /www 目录，一直走入到内容内部的网站根目录 `/www/sites/1panel.nexusphp.org/index`，执行 `composer install` 安装依赖：

<img :src="$withBase('/images/1panel-composer-install.png')">

## 安装程序

点击 1Panel 大菜单——数据库，创建一个库用。  
回到网站配置，在运行用户/组，如果有提示保存，点击保存之。  
打开域名，会进入到安装界面。连接信息，Mysql+Redis要使用容器连接部分的地址和端口。

<img :src="$withBase('/images/1panel-database-connections.png')">

选择正确的时区，一直下一步即可。

## 创建后台任务

点击 1Panel 大菜单——计划任务，创建计划任务：

- 类型为 Shell 脚本
- 名称随意，比如 NP清理任务
- 周期是每分钟
- 勾选在容器中执行
- 选择创建网站使用的 PHP 容器

脚本内容如下(记得修改为自己的真实的容器内网站根目录)：
```
su -c "php /www/sites/1panel.nexusphp.org/index/include/cleanup_cli.php" -s /bin/sh www-data
```
<img :src="$withBase('/images/1panel-cleanup.png')">

## 创建任务调度

同后台任务，脚本内容如下：
```
su -c "cd /www/sites/1panel.nexusphp.org/index && php artisan schedule:run" -s /bin/sh www-data
```

:::danger
**特别提醒：执行周期是每分钟，不能修改！这里的配置只是一个入口，实际运行频率是程序控制的，修改频率整个网站运行不正常！比如魔力不会如期增涨！**

完成后，删除 `public/install` 目录。安装日志包含敏感数据，不要泄露。
:::

## 守护队列工作器进程

这里与手工安装或者宝塔均不同，无法使用 `supervisor`。我们单独起一个容器，添加入口命令运行队列工作器，通过重启规则为一直重启达到进程守护的目的。

**镜像必须与创建网站时使用的镜像一致，且网络要选择同一个**。添加挂载本机目录，将网站根目录挂载到容器内，这里使用 /www。Command 添加以下内容：
```
php /www/artisan queue:work --no-interaction
```
重启规则勾选一直重启。

<img :src="$withBase('/images/1panel-queue.png')">

确定后创建容器，至此安装工作全部结束。以上步骤一共创建了5个容器：

<img :src="$withBase('/images/1panel-all-containers.png')">

## 关于日志

NP 默认日志是写到 /tmp 目录下。容器内查看如果觉得不便，可以写到标准输出，编辑 .env 文件修改以下配置项：
```
LOG_FILE=php://stdout
```
如果习惯原始的写到文件的方式，编辑容器，将容器的 /tmp 目录映射到宿主机。

## 关于更新
更新依赖于 rsync，进入容器执行以下安装之：
```
apk add rsync
```
之后就是跟其他安装方式一样的了。