## 从 v1.5 升级到 v1.6

### 前提条件
::: warning
v1.6 为了兼容 PHP7 & PHP8 以及修复大量 warning/notice 等级别错误对大量文件做了小修改，升级第一步就是要以新文件全量覆盖旧文件。
- 如果你的网站没有对原 NP 没有任何改动，覆盖没有任何问题。
- 如果你的网站对原文件没有改动，加了新的文件，那覆盖也没有任何问题。
- 如果你的网站对原文件有改动，并且明确知道哪些是新增的，可以先复制出来，覆盖后再粘贴回去，也是可以的。但不建议新功能直接修改原文件，最好新增文件。
- 如果你的网站对原文件有改动，并且不好分离变动内容，如能接受改动全部丢失，也可以升级。
- 如果你的网站对原文件有改动，并且不好分离变动内容，不能接受改动丢失，有专业人士帮助的情况下，资讯专业人士看能否升级。
- 如果你的网站对原文件有改动，并且不好分离变动内容，不能接受改动丢失，也无专业人士帮助，不要升级！

:::

### 增加 .env 配置文件

v1.5 版本中全部的配置都在文件 `config/allconfig.php` 中，部署还得改源代码，这是不好的。  

v1.6 把数据库配置这类非常敏感关乎站点能否正常运行的配置放到配置文件中，其他站点设定统一入库。主要是为了方便数据共享，另外也避免了因权限不足导致在网页上修改保存失败的问题。

具体做法：复制根目录下的 `.env.example` 命名为 `.env`，将里边的选项正确填写即可。

```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=nexusphp

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DATABASE=0
```
### users 表添加  page 字段
在【次要设定】中，保护用户位置若打开，会记录在 users 表的 page 字段。在 functions.php menu() 方法中：
```php
if ($CURUSER){
  if ($where_tweak == 'yes')
    $USERUPDATESET[] = "page = ".sqlesc($selected);
}
```
但目前的建表语句中不包含 page 字段，因此需要补充之。

在当前的建表语句中，时间相关默认值都给了 `0000-00-00 00:00:00`，在 Mysql 5.7 及以上默认的 sql_mode 中认为是非法的。统一改为标准的 `default null` 或当前时间。

:::tip
若你的 Mysql 版本为 5.7 或之上，先关闭 `NO_ZERO_DATE`：
:::
```
SET sql_mode=(SELECT REPLACE(@@sql_mode,"NO_ZERO_DATE", ""));
```

执行以下语句添加 page 字段：
```
alter table users
modify column added datetime default current_timestamp,
modify column last_login datetime default null,
modify column last_access datetime default null,
modify column last_home datetime default null,
modify column last_offer datetime default null,
modify column forum_access datetime default null,
modify column last_pm datetime default null,
modify column last_comment datetime default null,
modify column last_post datetime default null,
modify column donoruntil datetime default null,
modify column warneduntil datetime default null,
modify column noaduntil datetime default null,
modify column vip_until datetime default null,
modify column leechwarnuntil datetime default null,
modify column lastwarned datetime default null,
add column page varchar(255) default '';
```

【可选】其他表的时间字段建议也修改为标准格式。
```
alter table attachments modify added datetime default current_timestamp;
alter table bans modify added datetime default current_timestamp;
alter table bitbucket modify added datetime default current_timestamp;
alter table cheaters modify added datetime default current_timestamp;
alter table chronicle modify added datetime default current_timestamp;
alter table comments modify added datetime default current_timestamp, modify editdate datetime default null;
alter table fun modify added datetime default current_timestamp;
alter table funds modify added datetime default current_timestamp;
alter table funvotes modify added datetime default current_timestamp;
alter table invites modify time_invited datetime default null;
alter table iplog modify access datetime default null;
alter table loginattempts modify added datetime default current_timestamp;
alter table messages modify added datetime default current_timestamp;
alter table news modify added datetime default current_timestamp;
alter table offers modify added datetime default current_timestamp, modify allowedtime datetime default null;
alter table peers modify started datetime default null, modify last_action datetime default null, modify prev_action datetime default null;
alter table polls modify added datetime default current_timestamp;
alter table posts modify added datetime default current_timestamp, modify editdate datetime default null;
alter table prolinkclicks modify added datetime default current_timestamp;
alter table reports modify added datetime default current_timestamp;
alter table sitelog modify added datetime default current_timestamp;
alter table snatched modify last_action datetime default null, modify startdat datetime default null, modify completedat datetime default null;
alter table staffmessages modify added datetime default current_timestamp;
alter table subs modify added datetime default current_timestamp;
alter table suggest modify adddate datetime default null;
alter table torrents modify added datetime default current_timestamp, modify last_action datetime default null, modify promotion_until datetime default null, modify picktime datetime default null, modify last_reseed datetime default null;
```

### 导入【站点设定】初始数据



