<ArticleTopAd></ArticleTopAd>

## 说明

本文档将指引你将 NP 从原始的 nexusphp.v1.5.beta5.20120707 版本升级到 v1.6。

## 注意
::: warning
升级仅保留网站资源数据和数据库数据，对原版代码上的改动会丢失，请知悉！  

升级前请对原代码目录和 Mysql 数据库进行全量备份！  
升级前请对原代码目录和 Mysql 数据库进行全量备份！  
升级前请对原代码目录和 Mysql 数据库进行全量备份！  
:::

## 前期测试

### 准备环境
按要求准备好环境，可以与原网站在同一台机器，也可以不是同一台。不再赘述。
::: tip
如果是宝塔面板，确保以下函数没有被禁用：`symlink, putenv, proc_open, exec`。不要勾选：防跨站攻击(open_basedir)。
:::

### 配置新的网站
线上网站不要受到影响，配置一个新的二级域名或新域名指向一个新的网站目录，具体配置参考安装文档。

### 建立新的数据库
导出原网站数据库，导入到一个新建的数据库中。  
`peers` 表使用的是 `memory` 引擎，如果数据量较大，为确保导入顺利，在 `my.cnf`（一般为 /etc/my.cnf）`[mysqld]`部分添加以下值保证表能装下全部数据，加完记得重启：
```
tmp_table_size = 10G
max_heap_table_size = 10G
```
为加快导入速度，登录终端后执行以下语句再使用`source`命令导入：
```
set sql_mode = '';
set foreign_key_checks = 0;
set unique_checks = 0;
set sql_log_bin = 0;
```

### 获取新代码
克隆或下载新的代码到新配置的网站根目录<ROOT_PATH>。

### 保留原资源数据
将旧网站的以下文件夹复制到新网站相应文件夹进行覆盖：
|原文件夹|新文件夹|
|--|--|
|attachments|attachments|
|bitbucket|bitbucket|
|config|config|
|imdb|imdb|
|subs|subs|
|torrents|torrents|
|styles|public/styles|
|pic|public/pic|

将以上文件夹覆盖之后，打开`config/allconfig.php`，将`BASEURL`和`announce_url`修改为新的：
```
$BASIC=array(
	'SITENAME' => 'NexusPHP',
	'BASEURL' => 'localhost',
	'announce_url' => 'localhost/announce.php',
	'mysql_host' => 'localhost',
	'mysql_user' => 'root',
	'mysql_pass' => 'nexusphprocks',
	'mysql_db' => 'nexusphp',
);
```

### 安装 composer
到 [官网](https://getcomposer.org/) 按其文档进行安装。安装完成后，在新网站根目录下执行 `composer install`。


### 执行升级程序
在新网站中将 `nexus/Install/update/update.php` 复制到 `public/update/update.php` 中。

打开 `<新网站域名>/update/update.php`，将进入升级界面。按步骤填写，**注意过程中数据库要使用新建立的那个！** ，下一步，直到完成。

最后登录数据库，选择新建立的数据库，执行以下语句将与旧域名相关的项目改为新域名：
```
update `settings` set `value` = replace(`value`, '旧域名', '新域名') where `value` like '%旧域名%';
```

### 验证
打开新网站首页，进行登录，检查数据是否完整，基本功能是否正常。  
下载一个种子，或者进行辅种(注意 tracker 地址要为新网站的地址)，看是否正常。  

没有问题后，证明测试通过，旧网站可以升级。否则，请解决问题之后再考虑。

如若测试通过，而且以上测试没有花费太多时间，旧网站中间没有产生多少数据，可以直接切换使用即可（如何切换参考下面）。假如花费了不少时间产生了很多新数据，则需要将旧网站停机，重复以上步骤。这里看个人取舍。

## 后续工作

### 切换
将数据库中网站域名恢复为旧域名，可以执行上边提到的语句（注意新旧是反过来了）。接着将新网站的配置中 server_name 修改为原域名，旧网站的配置文件可以转移或更改其 server_name，重启网站服务器即切换完成。至此，线上就是使用新的网站目录和数据库了，旧的可以继续保留。

:::tip
恢复旧版，将新网站配置文件转移，旧配置文件恢复即可。
:::

### 创建后台任务
参见[安装](./installation.md#创建后台任务)。

### 清理签到数据
如果你网站原来已经有签到功能，它是每签到一次记录一条数据，新版改为每个用户一条数据，在根目录下执行以下命令进行多余数据的清理：
```
php artisan attendance:cleanup
```

::: danger
升级完成后，记得删除 `public/update` 目录，升级日志包含第敏感数据，不要泄露。
:::

## 1.6 之间升级

如从 `1.6.0-beta1` 升级到 `1.6.0-beta2`，可以将新代码整个目录覆盖（不会删除已有资源，如种子、附件等），然后修改相关目录权限、执行 `composer install`，最后运行一遍升级程序，升级过程中获取文件勾选第一个`手工`。

