<ArticleTopAd></ArticleTopAd>

## Description

This document will guide you to upgrade your NP from the original nexusphp.v1.5.beta5.20120707 version to v1.6.

## Note
::: warning
Please be aware that only the site resource data and database data will be preserved during the upgrade.  

Please make a full backup of the original code directory and Mysql database before upgrading!  
Please make a full backup of the original code directory and Mysql database before upgrading!  
Please make a full backup of the original code directory and Mysql database before upgrading!  
:::

## Pre-test

### Prepare the environment
Prepare the environment as required, it can be on the same machine as the original site or not. No more details.
::: tip
If it is a BT panel, make sure the following functions are not disabled: `symlink, putenv, proc_open, exec`.
:::

### Configure the new website
Don't affect the online site, configure a new second-level domain or a new domain pointing to a new web directory, refer to the [installation documentation](./installation.md#configure-the-web-server).
::: tip
Do not check the box for BT panel: Anti-cross-site attack (open_basedir).
:::

### Create a new database
Export the original site database and import it into a new one.  
The `peers` table uses the `memory` engine, so if you have a large amount of data, add the following values to the `[mysqld]` section of `my.cnf` (usually /etc/my.cnf) to ensure that the table can hold all the data, and remember to restart after adding.
```
tmp_table_size = 10G
max_heap_table_size = 10G
```
To speed up the import, log into a terminal and execute the following statement before using the `source` command to import.
```
set sql_mode = '';
set foreign_key_checks = 0;
set unique_checks = 0;
set sql_log_bin = 0;
```

### Get new code
Clone or download the new code to the newly configured site root {ROOT_PATH}.

### Keep the original resource data
Copy the following folders from the old site to the corresponding folders on the new site for overwriting.
|original folder|new folder|
|--|--|
|attachments|attachments|
|bitbucket|bitbucket|
|config|config|
|imdb|imdb|
|subs|subs|
|torrents|torrents|
|styles|public/styles|
|pic|public/pic|

After overwriting the above folders, open `config/allconfig.php` and change `BASEURL` and `announce_url` to the new.
```
$BASIC=array(
	'SITENAME' => 'NexusPHP',
	'BASEURL' => 'localhost',
	'announce_url' => 'localhost/announce.php',
	'mysql_host' => 'localhost',
	'mysql_user' => 'root',
	'mysql_pass' => 'nexusphprocks',
	'mysql_db' => 'nexusphp',
);
```

### Install composer
Go to [official site](https://getcomposer.org/) and install it according to its documentation. After the installation is complete, execute `composer install` in the root directory of the new site.


### Execute the upgrade procedure
Copy `nexus/Install/update/update.php` to `public/update/update.php` in the new website.

Open `<new website domain>/update/update.php` and you will be taken to the update screen. Fill in the steps, **note that the database should use the newly created one during the process!** , next until it is done.

Finally, log in to the database, select the newly created one and execute the following statement to change the items related to the old domain to the new one.
```
update `settings` set `value` = replace(`value`, 'old domain', 'new domain') where `value` like '%old domain%';
```

### Verify
Open the home page of the new site, log in, and check if the data is complete and the basic functions are working.  
Download a seed, or make a secondary seed (note that the tracker address should be the address of the new site), and see if it works.  

After there is no problem, it proves that the test is passed and the old website can be upgraded. Otherwise, please consider again after solving the problem.

If the test passed, and the above test did not take too much time, the old site did not generate much data in the middle, you can directly switch to use (how to switch refer to the following). If it took a lot of time to generate a lot of new data, you need to shut down the old site and repeat the above steps. It's a personal choice here.

## Follow up

### Switching
Restore the site domain in the database to the old one, you can execute the above mentioned statements (note that the old and new are reversed). Next, change the server_name in the configuration of the new site to the original domain name, and the configuration file of the old site can be transferred or changed to its server_name, restart the web server that the switch is complete. At this point, the new website directory and database are used online, and the old one can be kept.

:::tip
To restore the old version, just transfer the new web configuration file and restore the old one.
:::

### Create background tasks
See [installation](./installation.md#create-background-task).

### Clean up check-in data
If your site already had a check-in function, which recorded one piece of data per check-in, the new version changes to one piece of data per user, execute the following command in the root directory to clean up the excess data.
```
php artisan attendance:cleanup
```

::: danger
Remember to delete the ``public/update`` directory after the upgrade is complete, as the upgrade log contains sensitive data that should not be leaked.
:::

## Video tutorial
If you don't understand the above, you can refer to the video tutorial at  
[[B Site] NexusPHP 1.5 Upgrade 1.6 Basic Process](https://www.bilibili.com/video/BV1XS4y137S3/)

## Upgrade between 1.6

If you upgrade from `1.6.0-beta1` to `1.6.0-beta2`, you can overwrite the whole directory with the new code (it will not delete the existing resources, such as seeds, attachments, etc.), then modify the relevant directory permissions, execute `composer install`, and finally run the upgrade program once, and check the first `manual` in the upgrade process to get the files.
