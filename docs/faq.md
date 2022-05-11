<ArticleTopAd></ArticleTopAd>

## 日志怎么看

有问题第一时间查看日志，一个程序如果运行出错了不写日志，那这个程序是不及格的！  
提问问题最好附上错误日志，否则神仙也帮不了你。主要有以下日志可以查看：  
- NexusPHP 自身写的日志，默认位于 /tmp/目录下，按日期生成，如 nexus-2022-03-24.log
- PHP-FPM 的错误日志，在宝塔上：软件商店->已安装->PHP-8.0->设置->日志 可查看
- Nginx 的错误日志，在宝塔上：网站设置->网站日志->错误日志 可查看

**没有错误日志，一切免谈！**
<img :src="$withBase('/images/show-the-error-log.jpg')">

**实在找不到相关的日志，可以把错误展示在页面上，解决问题后再关闭错误展示。**
### 正常页面
```php
//include/core.php 第3行，display_errors 的值由 0 改为 1
ini_set('display_errors', 1);
```

### 安装/升级
```php
//nexus/Install/install_update_start.php 第3行，display_errors 的值由 0 改为 1
ini_set('display_errors', 1);
```

## 日志太多撑爆硬盘
NexusPHP 默认的日志级别为 `info` 即一般的日志都记录，如果过多可以修改为 `error` 只记录错误日志，将 .env 文件中 `LOG_LEVEL` 修改为 `error`：
```
LOG_LEVEL=error
```
另外 PHP-FPM 的错误日志级别也可以修改为 `error` 以减少其日志输出。

::: danger
记录日志有助于还原现场，对排查问题起着十分关键的作用。不建议修改。  
可以选择保留最近几天的日志，定时删除过旧的日志。  
以下示例：每天凌晨 03 点删除 7 天以前的日志（注意替换自己的过滤关键字）

```
0 3 * * * find /tmp/ -mtime +7 |grep -E 'nexus' |xargs rm -rf
```
:::

## 邮件无法发送

请参考[配置](./configuration.md#smtp-设定)部分说明进行正确设置，确保：

- [站点设定]->[主要设定]->[网站邮箱地址] 与 SMTP 中的用户名是同一个
- SMTP 地址开头不要有协议如 `ssl://`，只需要要主机地址
- 正确选择加密方式，如果没有选择 `none`，参考你的邮件服务商

## 管理后台白屏

确保 nginx 配置中 js/css 相关的 location 规则在 [管理后台] 的规则之后。

<img :src="$withBase('/images/nginx_config_admin.png')">

## can not make symbolic link

无法创建软链接。这一般是 PHP 权限不足，保证把 ROOT_PATH 拥有者设置为了 PHP_USER，或者直接设置了 777 权限。如果还是不行，可以手工创建：
```
ln -s /你的ROOT_PATH路径/bitbucket /你的ROOT_PATH路径/public
ln -s /你的ROOT_PATH路径/attachments /你的ROOT_PATH路径/public
```

如果已经存在，尝试删除这两个目录，程序会自动重新创建。

## 热门种子不展示在热门模块

热门模块需要展示封面，请确保填写了 imdb 链接，或描述里边包含了海报图片。
