<ArticleTopAd></ArticleTopAd>

## 说明
对于某些数量较大而又不是很重要的数据，如做种魔力记录，之前是写文本，现改为存储到 ClickHouse 中，以方便使用。ClickHouse 的数据不需要定时备份，这些数据可以丢失。
这个功能也是可选的，不安装不影响使用。

## 环境要求
- NexusPHP 版本 >= 1.9.7

## 宝塔面板安装
直接点击宝塔面板 Docker 大菜单，搜索 ClickHouse。点击安装，取消勾选允许外部访问，点击确定即可。

<img :src="$withBase('/images/bt_clickhouse_install.png')">

宝塔默认没有设置密码，现在高版本要求必须设置密码。点击顶部的[容器编排]，编辑其 docker-compose 文件内容，在 environment(没有就新增) 中指定密码：
```
environment:
   - CLICKHOUSE_PASSWORD=yourpassword
```
<img :src="$withBase('/images/bt_clickhouse_password2.png')">

最后点击保存->确定即可。

## 手工安装
如果使用的是其他面板，或者没有使用面板，根据以下 docker-compose 内容自行安装亦可：

```
services:
  clickhouse:
    image: clickhouse/clickhouse-server:latest
    network_mode: host
    ports:
      - 8123:8123
      - 9000:9000
    volumes:
      - $PWD/clickhouse/data:/var/lib/clickhouse
      - $PWD/clickhouse/log:/var/log/clickhouse-server
      - $PWD/clickhouse/config/server:/etc/clickhouse-server/config.d
      - $PWD/clickhouse/config/user:/etc/clickhouse-server/users.d
      - $PWD/clickhouse/init:/docker-entrypoint-initdb.d
    environment:
      - CLICKHOUSE_PASSWORD=yourpassword
```
## 执行迁移

在网站根目录下执行以下命令完成数据表迁移：
```
php artisan clickhouse:migrate
```
## 配置并启用

在 .env 中配置好 ClickHouse 的相关参数。以下根据实际情况调整为真实的数值。如果你按此教程只修改了密码，那么以下除了密码其他保持一致即可。
```
CLICKHOUSE_HOST=127.0.0.1
CLICKHOUSE_HTTP_PORT=8123
CLICKHOUSE_TCP_PORT=
CLICKHOUSE_USER=default
CLICKHOUSE_PASSWORD=yourpassword
CLICKHOUSE_DATABASE=default
```
**最后在管理后台，[设置]->[系统]中，[是否记录做种魔力日志] 勾选 yes，再重启队列任务执行器守护进程，即完成全部工作。**

确认是否真实记录了数据，等一个最低的自动清理周期过后，登录 ClickHouse 控制台，或者使用三方工具连接来查看。

至于管理后台直接查看的功能，待后续版本添加。
