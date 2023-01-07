<ArticleTopAd></ArticleTopAd>

## 说明
本文档指引你从 1.7 升级到 1.8。原始 1.5 版本的建议先升级到 1.6 后再按顺序升级。

## 环境要求

- PHP 扩展要求新增 opcache

## 执行升级

:::warning
注意：`1.8.x` 标签目前没有打，请自觉将以下的 `1.8.x` 替换为 `dev` 使用最新开发代码
:::

首先下载升级命令的执行文件 `app/Console/Commands/NexusUpdate.php` 进行覆盖之。可直接通过 wget 命令下载再复制到相应目录：
```
wget https://raw.githubusercontent.com/xiaomlove/nexusphp/php8/app/Console/Commands/NexusUpdate.php
```

**无插件用户**，直接使用命令行升级即可：
```
# 下载最新代码，注意要 --include_composer
php artisan nexus:update --tag=1.8.0 --include_composer

# 安装依赖
composer install

# 执行升级
php artisan nexus:update
php artisan filament:upgrade
```

**有插件用户**，手工变更依赖。按下图，扩展新增 zend-opcache，filament 修改为 `2.16.52`

<img :src="$withBase('/images/composer.json_1.8.png')">

接着删除 `composer.lock`，最后执行命令：
```
# 下载最新代码
php artisan nexus:update --tag=1.8.0

# 安装依赖
composer install

# 执行升级
php artisan nexus:update
php artisan filament:upgrade

# 升级后，插件需要升级最新版，否则管理后台 404 且插件可能工作不正常
composer require xiaomlove/nexusphp-xxx:dev-master
```

**自己合并代码的用户**，与有插件用户一致的步骤，只是不需要下载最新代码的步骤。

## 创建队列守护进程
见 [安装](./installation.md#创建队列守护进程-1-8需要)

## 1.8 版本之间升级

以下针对没有修改代码的用户：

```
# 下载代码
php artisan nexus:update --tag=1.8.x

# 执行更新
php artisan nexus:update
```