## 从 v1.5 升级到 v1.6

### 注意事项
::: warning
对于 NP 的所有 .php 后缀文件，需要用新版本的进行全量覆盖！  
因此如果有改动，会丢失，请知悉。

升级前请对原代码目录和 Mysql 数据库进行全量备份！  
升级前请对原代码目录和 Mysql 数据库进行全量备份！  
升级前请对原代码目录和 Mysql 数据库进行全量备份！  

建议将当前网站数据及数据库复制一份进行升级测试，没有问题后再正式启用。
:::

### 准备工作

#### 安装 composer
到 [官网](https://getcomposer.org/) 按其文档进行安装即可。

#### 新增 composer.json 文件并安装依赖
将新版中的 `composer.json` 复制到 <ROOT_PATH> 中，并在该目录下执行 `composer install`。

#### 增加 public 目录
将新版中的 `public` 目录及下边的全部文件复制到 <ROOT_PATH> 中。

#### 增加 class_cache_redis 类
将版本中 `classes/class_cache_redis.php` 复制到 `classes` 目录中。

#### 增加配置文件
将版本中 `config/database.php` 和 `config/nexus.php` 复制到 `config` 目录中。

#### 增加数据表结构文件
将版本中 `_db/dbstructure_v1.6.sql` 复制到 `_db` 目录中。

#### 增加 nexus 目录
将新版本中的 `nexus` 目录及下边全部文件复制到 <ROOT_PATH> 中。

#### 增加 .env.example 文件
将新版本中的 `.env.example` 文件复制到 <ROOT_PATH> 中。

#### 替换 include 目录
将新版本中的 `include` 目录下的全部文件复制到 `include` 目录中进行替换。

#### 复制升级程序
将新版中的 `nexus/Install/update.php` 复制到 `public/update/update.php` 中。

以上步骤完成后，打开 `<DOMAIN>/update/update.php`，将进入升级界面。


