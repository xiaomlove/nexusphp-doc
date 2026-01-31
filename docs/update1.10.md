<ArticleTopAd></ArticleTopAd>

## 说明
本文档指引你从 1.9 升级到 1.10。原始 1.5 版本的建议先升级到 1.6 后再按顺序升级。  

**其他注意事项，参考博客 [此文（必读）！](https://nexusphp.org/2026/01/30/nexusphp-v1-10-0/)**

## 环境要求
环境要求没有变化

## 执行升级

:::warning
由于变动数据量较大的数据表，建议停机(比如停止 Nginx)进行更新！
:::

依赖变动不大, 可以使用 `--include_composer` 选项直接覆盖 composer.json 文件, 如果自己有添加内容, 可以先备份以便后面手动添加回来.

或者直接根据以下变化，手工修改之。

<img :src="$withBase('/images/composer.json_1.10_change.png')">

接着删除 `composer.lock`，最后执行命令：

```
# 下载最新代码
php artisan nexus:update --tag=1.10.0 --include_composer

# 安装依赖
composer install

# 执行升级
php artisan nexus:update
php artisan filament:upgrade

```
:::warning
升级后, 有插件的请安装 3.x 版本以保证能正确工作
:::

## 1.10 版本之间升级

以下针对没有修改代码的用户：

```
# 下载代码（如若要最新开发代码，--tag=dev）
php artisan nexus:update --tag=1.10.x

# 执行更新
php artisan nexus:update

# 重启 supervisor（宝塔用户在界面操作即可，使用 Docker 的重启 queue 服务即可）
supervisorctl reload
```

