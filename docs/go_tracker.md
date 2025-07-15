<ArticleTopAd></ArticleTopAd>

## 说明
如果你站点规模较大，服务器配置一般，平时负载较高，可以试试这个全新的 tracker 程序。  

它基于 Go 语言编写，结合 Redis 将处理汇报所需数据加载到内存中。此外它将汇报请求进行了缓冲，达到一定数量或一定时间间隔后批量同步到数据库，可以一定程度降低服务器负载。  

它跟自带的 PHP 版本是兼容的，你可以随时切换回 PHP 版本。

## 环境要求
- Redis 版本 >= 7.4.0
- NexusPHP 版本 >= 1.9.4

## 安装辅助插件
在网站根目录下执行：
```
composer config repositories.tracker-helper git https://github.com/xiaomlove/nexusphp-tracker-helper.git
composer require xiaomlove/nexusphp-tracker-helper
php artisan plugin install xiaomlove/nexusphp-tracker-helper
```
安装后在管理后台 -> 设置，多出一个 `Go-Tracker` 的 Tab。填写你正确的 Tracker 内网地址，至于 Token 可以使用以下这个。  
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJOZXh1c1BIUCDnlKjmiLciLCJleHAiOjQxMDIzMjk1OTksInBzbCI6MX0.L_xzZzZXyrG46Oq3fi9rI6LdPRCtTmO4deKaGMQU2Q4
```

## 下载并启动 Go Tracker
在下边附件下载部分下载二进制文件，放到网站根目录下。使用 nohup 直接启动即可。可用参数：
- -env_file: 指定 env 文件路径，默认当前目录下
- -log_level: 日志级别，默认 info. 可用：debug,info,warn,error
- -is_enable_frequency_limit: 是否启用频率限制，默认 true. 可用: true,false
- -http_port: HTTP 端口，默认: 7777

```
nohup ./tracker > tracker.log 2>&1 &
```
打开日志输出文件，当看到类似 `going to start http server at: :7777` 则表示是启动成功了。打开管理后台 `Other -> Tracker` 菜单，在 Basic 部分，看到有效期，可以确定一切准备就绪。
## 流量转发
修改 nginx 配置，在偏上的位置（至少在 \.php$ 这个 location 之前，比如在宝塔中就是在 include enable-php-xx 之前）添加转发代码，将 announce.php + scrape.php 的流量转发到 Go Tracker 上来。
以下是示例（修改后记得重启）：
```
    listen 443 ssl;
    http2 on;
    server_name dev.nexusphp.org;
    root /projects/dev/public;
    ssl_certificate /ssl/nexusphp.org.pem;
    ssl_certificate_key /ssl/nexusphp.org.key;

    index index.php index.html;

    # 将 announce.php + scrape.php 的流量转发到 Go Tracker
    location ~ ^/(announce|scrape)\.php$ {
       rewrite /announce.php(.*) /announce$1 break;
       rewrite /scrape.php(.*) /scrape$1 break;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_pass http://tracker:7777; # 这里修改为你的实际值
   }

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }
```

## 独立部署
如果不想跟网站使用相同的域名，或者是想同时使用多个 tracker 域名，那么你可以将 tracker 部署为一个新的网站.  
如下是一个示例，这里只接收 HTTP Get 请求，仅有汇报相关的 /announce + /scrape 两个路由，其他一律返回 404.
```
server {
    listen 443 ssl;
    # 替换为你自己的域名，有多个域名空格隔开
    server_name tracker.nexusphp.org;
    # 证书路径替换为你自己的
    ssl_certificate /ssl/nexusphp.org.pem;
    ssl_certificate_key /ssl/nexusphp.org.key;

    # 匹配 /announce 或 /scrape
    location ~ ^/(announce|scrape)$ {
        # 替换为你自己的
        proxy_pass http://tracker:7777;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 限制仅允许 GET 请求
        limit_except GET {
            deny all;
        }
    }

    # 其他所有路径不处理
    location / {
        return 404;
    }

    # 日志路径替换为你自己的
    access_log /dev/stdout main;
    error_log /dev/stderr;
}
```
:::warning 
流量转发和独立部署是二选一！！！  

配置好后，Tracker 地址是 server_name + /announce，如示例中则是：https://tracker.nexusphp.org/announce
:::
## 特别提醒
:::danger
- 必须跟 Web 使用同一套配置，即 .env 要是同一个或内容完全一样！
- 如果有多个站点，Redis 必须是不同的实例！类似 MySQL 是不同的库，Redis 不能单换库，要换实例！
- 同一个站点，不能配置多个 go tracker 实例！否则数据错乱，你只可以配置多个域名！
:::
## 日志清理
日志是输出到标准输出，启动时重定向到了日志文件，可以借助 logrotate 来切割并清理。  
在 `/etc/logrotate.d/` 目录下，新建一个配置文件，如 go_tracker，内容如下：
```
/your/tracker/log/path/tracker.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty            
    copytruncate
    create 0640 root root
}
```

注意修改 `/your/tracker/log/path/tracker.log` 为你真实启动 Go Tracker 时重定向日志的路径。

## 使用回自带 Tracker
如果想不用了，直接去掉上边一步添加的流量转发部分，再在辅助插件中把使用`前端是否使用 Tracker 接口` 改为 `no` 即可。   
或者直接卸载辅助插件亦可，**注意去掉流量转发部分是必须的！**

## 附件下载
- [amd64](/downloads/tracker), BuildID=Rxxkmbq6p2MpwbxfhLSl/TcHMcIfSXkEW-0dgIwBq/Qo6ECK9ON7X3gE3_YOyO/5aB2M_ZC33dXXM84EpFc
- [arm64](/downloads/tracker_arm), BuildID=SICON9-CqXeXI-9bu8uz/c4AzdRv0QD-MI4NG9cd6/bnZ_HLhtjf25jLTZKB8x/IKYm4WPYuvW3z-fOrs34

## 更新日志
### 1.1.0(2025-06-20)
- 支持置顶促销插件
- 修复删种后又被重新插入
- 完善收费种子、H&R
- 支持切换 Tracker URL(主程序要求 >= 1.9.5)

### 1.0.2(2025-06-04)
- 修复更多时间字段错误

### 1.0.1(2025-06-03)
- 修复 port 端口不能为 0
- 修复种子优惠到期时间等时间字段包含时区信息导致错误
- 修复 worker 同步时 peer_id 包含非法字符导致错误

### 1.0.0(2025-06-02)
- 初次发布
