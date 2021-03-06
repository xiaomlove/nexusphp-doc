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

### 保留原资源数据
由于变动较大，把新版本代码全部下载后，将旧项目的以下资源复制到对应目录中进行覆盖。
- attachments
- bitbucket
- config/allconfig.php
- imdb
- subs
- torrents


### 安装 composer
到 [官网](https://getcomposer.org/) 按其文档进行安装。安装完成后，在 <ROOT_PATH> 下执行 `composer install`。


### 复制升级程序
将新版中的 `nexus/Install/update/update.php` 复制到 `public/update/update.php` 中。

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

### 第5步：创建后台任务
创建用户 <PHP_USER> 的定时任务，执行：crontab -u <PHP_USER> -e，在打开的界面输入以下：
```
* * * * * cd <ROOT_PATH> && php artisan schedule:run >> /tmp/schedule.log
```

## 结语

升级完成后，记得删除 `public/update` 目录，同时 <ROOT_PATH> 目录下的 .php 文件已不再使用，是否删除看个人需要。  
升级日志包含第敏感数据，不要泄露。

## 1.6.0-beta 之间升级

如从 `1.6.0-beta1` 升级到 `1.6.0-beta2`，可以将新代码整个目录覆盖（不会删除已有资源，如种子、附件等），然后修改相关目录权限、执行 `composer install`，最后运行一遍升级程序（升级程序会补充相关配置或数据表字段）即可。

