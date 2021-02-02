## 说明

本文档将指引你将 NP 从原始的 nexusphp.v1.5.beta5.20120707 版本升级到 v1.6。

## 注意
::: warning
对于 NP 的所有 .php 后缀文件，需要用新版本的进行全量覆盖！  
因此如果有改动，会丢失，请知悉。

升级前请对原代码目录和 Mysql 数据库进行全量备份！  
升级前请对原代码目录和 Mysql 数据库进行全量备份！  
升级前请对原代码目录和 Mysql 数据库进行全量备份！  

建议将当前网站数据及数据库复制一份进行升级测试，没有问题后再正式启用。
:::

## 准备工作

### 增加新的目录及文件
将新版本中的以下目录及文件复制到旧项目中，若已存在，进行覆盖。  
以下均相对于 <ROOT_PATH> 而言。

|类型|路径|
|--|--|
|文件|composer.json|
|文件|.env.example|
|文件|classes/class_cache_redis.php|
|文件|config/database.php|
|文件|config/nexus.php|
|文件|_db/dbstructure_v1.6.sql|
|目录|public|
|目录|nexus|
|目录|include|

另外涉及多语言的，三种语言自行复制替换。涉及到的文件有（以 chs 为例）：
- lang/chs/lang_details.php
- lang/chs/lang_functions.php
- lang/chs/lang_mybonus.php
- lang/chs/lang_settings.php
- lang/chs/lang_staffpanel.php


### 安装 composer
到 [官网](https://getcomposer.org/) 按其文档进行安装。安装完成后，在 <ROOT_PATH> 下执行 `composer install`。


### 复制升级程序
将新版中的 `nexus/Install/update.php` 复制到 `public/update/update.php` 中。

以上步骤完成后，打开 `<DOMAIN>/update/update.php`，将进入升级界面。

## 升级过程

### 第1步：环境检测
检测当前环境是否满足升级要求。

### 第2步：创建 .env 文件
根据实际情况填写相关字段 即可。

### 第3步：新增或修改修改表(字段)
这一步会将旧表中时间相关字段的默认值 `0000-00-00 00:00:00` 修改为 null。  
并且将不为 null 的字段设置默认值。

### 第4步：导入数据
将站点设定的新数据和旧数据合并，入库。

## 结语

升级完成后，记得删除 `public/update` 目录，同时 <ROOT_PATH> 目录下的 .php 文件已不再使用，是否删除看个人需要。  
升级日志包含第敏感数据，不要泄露。
