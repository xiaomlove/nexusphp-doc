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
点此下载二进制文件，放到网站根目录下。使用 nohup 直接启动即可。可用参数：
- -env_file: 指定 env 文件路径，默认当前目录下
- -log_level: 日志级别，默认 info. 可用：debug,info,warn,error
- -is_enable_frequency_limit: 是否启用频率限制，默认 true. 可用: true,false
- -http_port: HTTP 端口，默认: 7777

```
nohup ./tracker > tracker.log 2>&1 &
```
打开日志输出文件，当看到类似 `going to start http server at: :7777` 则表示是启动成功了。打开管理后台 `Other -> Tracker` 菜单，在 Basic 部分，看到有效期，可以确定一切准备就绪。
## 流量切换
修改 nginx 配置，在偏上的位置（至少在 \.php$ 这个 location 之前）添加以下内容，将 announce.php + scrape.php 的流量转发到 Go Tracker 上来。
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