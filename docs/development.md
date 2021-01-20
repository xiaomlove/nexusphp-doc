## NP 基础知识

### 目录结构

NP 是传统的多入口应用，根目录下每个文件都是入口。没有使用命名空间，基本是面向函数编程，只有缓存 Cache、IMDB 等几个类。

大的功能模块可以分为 Web 端、Tracker 端两块（以下文件均位于 include 目录）。
- Web 端：主入口 `bittorrent.php`，函数文件 `functions.php`
- Tracker 端：主入口 `bittorrent_announce.php`，函数文件　`functions_announce.php`
- 二者公共部分：公共函数文件 `globalfunctions.php`，`core.php`

要增加新功能时，只需：新建入口文件 -> 引入主入口 -> 开始具体业务逻辑。

### 常用函数

|函数名|说明|
|:---|:---|
|dbconn()|连接数据库|
|dbconn_announce()|Tracker 端，连接数据库|
|userlogin()|设置登录态|
|loggedinorreturn()|判断用户是否登录|
|parked()|判断账号是否已经封存|
|parse_imdb_id()|标准化 imdb_id，不足 7 位的补充前导 0|

