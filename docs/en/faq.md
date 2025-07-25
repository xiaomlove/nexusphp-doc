<ArticleTopAd></ArticleTopAd>

## How to see the logs

If you have a problem with the first time to check the log, a program if you run the error does not write the log, then the program is failing!  
It is best to ask questions with error logs, otherwise the gods can not help you. There are mainly the following logs to check.  
- NexusPHP's own logs, located by default in the /tmp/ directory and generated by date, such as nexus-2022-03-24.log
- PHP-FPM error log
- Nginx error log

**No error logs, all bets are off!**
<img :src="$withBase('/images/show-the-error-log.jpg')">

**If you really can't find the relevant log, you can display the error on the page and turn off the error display after you solve the problem.**
### Normal page
```php
//include/core.php line 3, display_errors value changed from 0 to 1
ini_set('display_errors', 1);
```

### Install/upgrade
``` php
//nexus/Install/install_update_start.php line 3, value of display_errors changed from 0 to 1
ini_set('display_errors', 1);
```

## Too many logs to fill up the hard drive
The default log level of NexusPHP is `info`, which means that all general logs are recorded, if there are too many, you can change it to `error` to log only errors, change `LOG_LEVEL` to `error` in the .env file.
```
LOG_LEVEL=error
```
Also the error logging level of PHP-FPM can be changed to `error` to reduce its log output.

::: danger
Logging helps to restore the scene and is crucial for troubleshooting problems. It is not recommended to modify it.  
You can choose to keep the logs from the last few days and delete the old logs regularly.  
Here's an example: delete logs 7 days old at 03:00 am every day (note the replacement of your own filter keywords)

```
0 3 * * * * find /tmp/ -mtime +7 |grep -E 'nexus' |xargs rm -rf
```
:::

## Mail cannot be sent

Please refer to [configuration](./configuration.md#smtp-settings) section for correct settings, ensuring that.

- [Site Settings]->[Main Settings]->[Site Email Address] is the same as the username in SMTP
- SMTP address should not have a protocol like `ssl://` at the beginning, only the host address.
- Choose the right encryption method, if you don't choose `none`, refer to your mail service provider


## can not make symbolic link

Cannot create soft links. This is usually due to insufficient PHP permissions, so make sure you set the ROOT_PATH owner to PHP_USER, or just set the 777 permissions. If this does not work, you can create it manually by
```
ln -s /your ROOT_PATH path/bitbucket /your ROOT_PATH path/public
ln -s /your ROOT_PATH path/attachments /your ROOT_PATH path/public
```

If they already exist, try to delete both directories and the program will automatically recreate them.

## Popular seeds are not shown in popular modules

Popular modules need to show the cover, please make sure the imdb link is filled in, or the description contains the poster image.

## Forgot administrator password

You can execute the command to reset it. The parameters are: {UID} {New password} {Confirm the new password}.  
In the site root directory: 
```
php artisan user:reset_password {uid} {password} {password_confirmation}
```

## What are seeding points?

Seeding points are the raw un-added seeding bonus. Users can find seeding points in the [base bonus] row of the [base bonus] field in the [bonus use] page, in the [bonus gained per hour total] section.

<img :src="$withBase('/images/seed_points.png')">

## How to get seeding points quickly

The speed of seeding points acquisition is set by the administrator, generally the fewer the number of torrents, the longer the release time and the larger the torrents, the easier it is to get high points. There is no other way to get points except for seed saving.

## Admin backend 500 error
Most likely the log file `/tmp/nexus-202x-xx-xx.log` could not be written, you can try to execute 
```
chmod 777 /tmp/nexus-202x-xx-xx.log
```
or just delete it. If you still can't solve it, please refer to the beginning of this page to check the related logs.

## Admin backend 404
Make sure that the site's Nginx configuration file already has the following content:
```
location / {
    index index.html index.php.
    try_files $uri $uri/ /nexus.php$is_args$args.
}

# Filament
location ^~ /filament {
    try_files $uri $uri/ /nexus.php$is_args$args.
}
```
**And have restarted Nginx.**

## 1.9 Search function in admin backend not working

Reference: issue [#326](https://github.com/xiaomlove/nexusphp/issues/326)