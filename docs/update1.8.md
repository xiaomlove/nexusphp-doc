<ArticleTopAd></ArticleTopAd>

## 说明
本文档指引你从 1.7 升级到 1.8。原始 1.5 版本的建议先升级到 1.6 后再按顺序升级。

## 环境要求

- PHP 扩展要求新增 opcache

## 执行升级

使用命令行升级：
```
# 升级 NexusPHP，注意要 --include_composer
php artisan nexus:update --tag=1.8.0 --include_composer

# 升级 Filament
php artisan filament:upgrade
```

## 创建队列守护进程
见 [安装](./installation.md#创建队列守护进程-1-8需要)

## 1.8 版本之间升级

同 [1.7](./update1.7.md#17-版本之间升级)