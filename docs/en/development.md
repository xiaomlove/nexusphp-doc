<ArticleTopAd></ArticleTopAd>

## NP Basics

### Directory structure

NP is a traditional multi-entry application, where each file in the public directory is an entry. The original version does not use namespaces and is basically function-oriented programming.

The big function module can be divided into two pieces: Web side and Tracker side (the following files are located in the include directory).
- Web side: main entry `bittorrent.php`, function file `functions.php`
- Tracker side: main entry `bittorrent_announce.php`, functions file `functions_announce.php`
- Common parts of both: common functions files `globalfunctions.php`, `core.php`

To add a new function, just: create a new entry file -> introduce the main entry -> start the specific business logic.

### Common functions

|function name|description|
|:---|:---|
|dbconn($autoclean = false, $doLogin = true)|Web side, connect to database. In v1.6 there is no need to call it manually, it will connect automatically|
|dbconn_announce()|Tracker side, connects to database|
|userlogin()|set login state|
|loggedinorreturn()|determine if the user is logged in|
|parked()|determine if the account has been blocked|
|parse_imdb_id($id)|standardize imdb_id, add leading 0 if less than 7 bits|
|sql_query($query)|execute DDL + DML statements, one of the most common methods|
|get_row_count($table, $suffix = '')|count query, suffix is the where condition (must contain where)|
|do_log($log, $level = 'info')|record logs to text|
|get_setting($name, $default = null)|read site setting data|
|nexus_env($name, $default = null)|read the configuration values of the .env file|
|nexus_config($name, $default = null)|read the values of configuration files in the config directory (except allconfig.php)|
|getSchemaAndHttpHost()|Get the URL address of the protocol, host, and port only|
|getBaseUrl()|Get the URL address of the protocol, host, port, and path only|