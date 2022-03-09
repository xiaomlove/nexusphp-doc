<InArticleAdsense
    data-ad-client="ca-pub-5801780876442364"
    data-ad-slot="3630490768">
</InArticleAdsense>

## NP 基础知识

### 目录结构

NP 是传统的多入口应用，public 目录下每个文件都是入口。原始版本没有使用命名空间，基本是面向函数编程。

大的功能模块可以分为 Web 端、Tracker 端两块（以下文件均位于 include 目录）。
- Web 端：主入口 `bittorrent.php`，函数文件 `functions.php`
- Tracker 端：主入口 `bittorrent_announce.php`，函数文件　`functions_announce.php`
- 二者公共部分：公共函数文件 `globalfunctions.php`，`core.php`

要增加新功能时，只需：新建入口文件 -> 引入主入口 -> 开始具体业务逻辑。

### 常用函数

|函数名|说明|
|:---|:---|
|dbconn($autoclean = false, $doLogin = true)|Web 端，连接数据库。在 v1.6 中不需要手动调用，会自动连接|
|dbconn_announce()|Tracker 端，连接数据库|
|userlogin()|设置登录态|
|loggedinorreturn()|判断用户是否登录|
|parked()|判断账号是否已经封存|
|parse_imdb_id($id)|标准化 imdb_id，不足 7 位的补充前导 0|
|sql_query($query)|执行 DDL + DML 语句，最常用的方法之一|
|get_row_count($table, $suffix = '')|计数查询，suffix 即是 where 条件（必须包含 where）|
|do_log($log, $level = 'info')|记录日志到文本|
|get_setting($name, $default = null)|读取站点设定数据|
|nexus_env($name, $default = null)|读取 .env 文件配置值|
|nexus_config($name, $default = null)|读取 config 目录下配置文件（allconfig.php除外）的值|
|getSchemaAndHttpHost()|获取仅包含协议、主机、端口的 URL 地址|
|getBaseUrl()|获取仅包含协议、主机、端口、路径的 URL 地址|