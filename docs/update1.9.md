<ArticleTopAd></ArticleTopAd>

## 说明
本文档指引你从 1.8 升级到 1.9。原始 1.5 版本的建议先升级到 1.6 后再按顺序升级。

## 环境要求
- PHP 最低版本要求升至 8.2
- PHP 扩展要求新增 zip, intl

## 执行升级

:::warning
由于变动数据量较大的数据表，建议停机(比如停止 Nginx)进行更新！
:::

首先下载升级命令的执行文件 `app/Console/Commands/NexusUpdate.php` 进行覆盖之。可直接通过 wget 命令下载再复制到相应目录：
```
wget https://raw.githubusercontent.com/xiaomlove/nexusphp/php8/app/Console/Commands/NexusUpdate.php
```

删除以下文件:
- config/octane.php

:::warning
由于依赖变动较大, 下面会使用 `--include_composer` 选项直接覆盖 composer.json 文件, 如果自己有添加内容, 可以先备份以便后面手动添加回来.
:::

接着删除 `composer.lock`，最后执行命令：

```
# 下载最新代码
php artisan nexus:update --tag=1.9.0 --include_composer

# 安装依赖
composer install

# 执行升级
php artisan nexus:update
php artisan filament:upgrade

```
:::warning
升级后, 有插件的请安装最新版以保证能正确工作
:::

## 1.9 版本之间升级

以下针对没有修改代码的用户：

```
# 下载代码（如若要最新开发代码，--tag=dev）
php artisan nexus:update --tag=1.9.x

# 执行更新
php artisan nexus:update

# 重启 supervisor（宝塔用户在界面操作即可）
supervisorctl reload
```