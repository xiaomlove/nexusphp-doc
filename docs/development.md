## NP 基础知识

### 目录结构

NP 是传统的多入口应用，根目录下每个文件都是入口。没有使用命名空间，基本是面向函数编程，只有缓存 Cache、IMDB 等几个类。

大的功能模块可以分为 Web 端、Tracker 端两块（以下文件均位于 include 目录）。
- Web 端：主入口 `bittorrent.php`，函数文件 `functions.php`
- Tracker 端：主入口 `bittorrent_announce.php`，函数文件　`functions_announce.php`
- 二者公共部分：公共函数文件 `globalfunctions.php`，`core.php`

要增加新功能时，只需：新建入口文件 -> 引入主入口 -> 开始具体业务逻辑。

### 常用函数
以下是常用到的函数，末尾 [Web]/[Tracker] 表示用在哪一端。
- 连接数据库：functions.php::dbconn() [Web]，functions_announce.php::dbconn_announce() [Tracker]。Web 端连接数据库方法中会调用  userlogin() 设置登录态
- 判断用户是否登录：loggedinorreturn() [Web]
- 判断账号是否已经封存：parked() [Tracker]
