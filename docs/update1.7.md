<ArticleTopAd></ArticleTopAd>

## 说明
本文档指引你从 1.6 升级到 1.7。原始 1.5 版本的建议先升级到 1.6 后再按此文档进行升级。

## 环境要求

- PHP 扩展要求新增 pcntl, sokcets
- PHP 函数 `pcntl_signal, pcntl_async_signals, pcntl_alarm` 不能被禁用

## 升级依赖
如果是手动执行 `composer install` 的，正常执行即可。如果是手动下载依赖包的，请到下载页面下载适用 1.7 的依赖包。

## 执行升级
类似升级 1.6，获取最新代码，进行覆盖，复制 `nexus/Install/update/update.php` 到 `public/update/update.php`，运行之。完成后检查各项功能是否正常。

## 配置 announce URL

### 更改设置
1.7 重构了 announce 和 scrape 接口，默认的 announce URL 地址是 `api/announce`，旧的 `announce.php` 不再维护。  
[站点设定]->[基础设定]->[Tracker地址] 修改为 `DOMAIN/api/announce`。    
[站点设定]->[安全设定]->[HTTPS Tracker地址]，如果有填写，也更改之。  

### 旧 announce 转发
对于之前下载的种子，仍然会请求旧接口。
如果配置了 Octane 加速，可以添加一个配置项，便会中转请求到新接口，否则依然使用旧的 announce 处理。由于不再维护，强烈建议配置 Octane 加速并配置转发。 
在 .env 中添加一项：
```
TRACKER_API_LOCAL_HOST=http://127.0.0.1:8000
```

## 配置 Octane 加速(推荐)
可选驱动为 roadrunner 或 swoole。  
如果使用 roadrunner，需要[下载其二进制文件](./downloads.md#roadrunner)放到 ROOT_PATH 下。  
如果使用 swoole，需要安装 swoole PHP 扩展。  

以下以 centos 7.9 为例：

### 安装 supervisor
```
# 安装
yum install supervisor 
 
# 启动
supervisord -c /etc/supervisor/supervisord.conf
```

其配置文件位于：`/etc/supervisor/supervisord.conf`，打开可以看到最后一行会引入 `/etc/supervisor/conf.d/` 目录下的 .ini 文件。  
在 conf.d 目录下新建 `nexus-worker.ini` 文件，内容为(**注意替换 ROOT_PATH, PHP_USER**，其中 `--server=xxx` 根据自己选择使用 `swoole` 或 `roadrunner`)：
```
[program:nexus-worker]
process_name=%(program_name)s_%(process_num)02d
command=php -d variables_order=EGPCS ROOT_PATH/artisan octane:start --server=xxx --host=0.0.0.0 --port=8000
autostart=true
autorestart=true
user=PHP_USER
redirect_stderr=true
stdout_logfile=/tmp/nexus-worker.log

```

保存好后执行以下命令启动之：
```
# 重新读取配置文件
supervisorctl reread

# 更新进程组
supervisorctl update

# 启动
supervisorctl start all
```

日志文件位于 `/tmp/nexus-worker.log`，查看是否正常。

### 配置 nginx 转发

在 nginx 配置的 `/api` 部分，注释掉 try_files，添加转发内容：
```
location ^~ /api {

    # try_files $uri $uri/ /nexus.php$is_args$args;

    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header Scheme $scheme;
    proxy_set_header SERVER_PORT $server_port;
    proxy_set_header REMOTE_ADDR $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Platform $http_platform;
    proxy_set_header User-Agent $http_user_agent;
    proxy_set_header Request-Id $request_id;
    proxy_pass http://127.0.0.1:8000;
}
```

重启 Nginx 后登录管理后台，看是否工作正常。如果正常，可以进入下一步执行升级，过程类似升级 1.6，不再赘述。



## 接入 Elasticsearch(可选)

如果搜索功能对 Mysql 造成了较大压力，可以考虑将搜索功能交给 Elasticsearch（以下简称 ES）。  
建议在另外一台机器安装 ES ，内存至少 8G，具体安装教程网上搜索，并安装好 ik 中文分词。  
安装好后，在 .env 文件补充好相关配置：
```
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_SCHEME=https
ELASTICSEARCH_USER=elastic
ELASTICSEARCH_PASS=******
ELASTICSEARCH_SSL_VERIFICATION=/tmp/http_ca.crt
ELASTICSEARCH_ENABLED=1
```

现在 ES 都要求使用 https 连接，注意其证书要保证 php 有权限读取。最后一项是是否启用的意思，设置为 1 表示启用。若不启用留空即可。  
在数据导入之前可以设置为空，其他选项填写好后，在 ROOT_PATH 下执行到下命令进行测试并导入数据：

```
# 测试配置是否完好，如果没问题会返回 ES 服务器信息
php artisan es:info

# 创建索引
php artisan es:create_index

# 导入数据
php artisan es:import
```

数据导入成功后，好可将 `ELASTICSEARCH_ENABLED` 设置为 1，然后查看种子列表、新增/更新/删除/收藏种子看是否工作正常。  
如果发现不正常，可以修改为空不使用。


## 1.7 版本之间升级
跟 1.6 一样。如果启用了 Octane 加速，记得重启它。进入 ROOT_PATH 执行(server 根据实际情况填写 `swoole` 或 `roadrunner`)：
```
php artisan octane:reload --server=xxx
```