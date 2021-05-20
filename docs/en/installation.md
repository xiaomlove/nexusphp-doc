## Get the program

Clone [xiaomlove/nexusphp](https://github.com/xiaomlove/nexusphp) and switch to the latest release tag before installing it, or just download the latest [release](https://github.com/xiaomlove/nexusphp/releases).
:::warning
Be sure to switch to a release tag for installation when cloning. Do not use the latest development code!
:::

## Create a database

First login to Mysql, create a new database, and choose `utf8 + utf8_general_ci` or `utf8mb4 + utf8mb4_general_ci` for the charset and collate. The latter supports storing emoji expressions, the former does not.
```
mysql> create database `nexusphp` default charset=utf8mb4 collate utf8mb4_general_ci;
Query OK, 1 row affected (0.06 sec)
```

::: tip
`utf8mb4` requires Mysql 5.5.3 or above to be supported.
:::


## Configure the web server

### Do not enable https configuration
In the case of nginx, only the most basic configuration is required. Add a new nexusphp.conf to the nginx configuration directory (usually /etc/nginx/conf.d/)

```
server {

    # Please be practical
    root /<WEB_ROOT>; 

    server_name <DOMAIN>;

    location / {
        index index.html index.php;
        try_files $uri $uri/ /index.php$is_args$args;
    }

    # Admin backend
    location ~* /admin(.*) {
        root <ROOT_PATH>/admin/dist;
        try_files $uri $uri/ $1 /index.html =404;
    }

    # api interface
    location ^~ /api {
        try_files $uri $uri/ /nexus.php$is_args$args;
    }

    location ~ \.php {
        # Please be practical
        fastcgi_pass 127.0.0.1:9000; 
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    access_log /var/log/nginx/<DOMAIN>.access.log;
    error_log /var/log/nginx/<DOMAIN>.error.log;
}
```

### Enable https configuration
To enable https, you first have to prepare the certificate.
```
server {
    listen 443 ssl;
    ssl_certificate /SOME/PATH/<DOMAIN>.pem;
    ssl_certificate_key /SOME/PATH/<DOMAIN>.key;

    # Please be practical
    root /<WEB_ROOT>; 

    server_name <DOMAIN>;

    location / {
        index index.html index.php;
        try_files $uri $uri/ /index.php$is_args$args;
    }

    # Admin backend
    location ~* /admin(.*) {
        root <ROOT_PATH>/admin/dist;
        try_files $uri $uri/ $1 /index.html =404;
    }

    # api interface
    location ^~ /api {
        try_files $uri $uri/ /nexus.php$is_args$args;
    }

    location ~ \.php {
        # Please be practical
        fastcgi_pass 127.0.0.1:9000; 
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    access_log /var/log/nginx/<DOMAIN>.access.log;
    error_log /var/log/nginx/<DOMAIN>.error.log;
}
# http redirect to https
server {
    if ($host = <DOMAIN>) {
        return 301 https://$host$request_uri;
    }
    server_name <DOMAIN>;
    listen 80;
    return 404;
}
```

After adding, `nginx -t` test for errors, if no errors then run `nginx -s reload` restart to take effect.

::: tip
If use 宝塔面板(BT.cn), `putenv, proc_open` functions are disabled by default, you need to remove them, otherwise you can't run `composer` normally. The `exec` function is needed for task cleanup, etc., and needs to be removed from the disabled functions as well.
Also, the root of the site it creates contains the `.user.ini` file, which restricts the directories that PHP can open when introducing files; edit it to move the first value of `open_basedir` up one level (i.e. remove the `public/` at the end).

:::

## Procedure

### Installation preparation

The following is executed under <ROOT_PATH>.
- `composer install`, to install the dependencies 
- `cp -R nexus/Install/install public/`, copy `nexus/Install/install` to `public/`, make sure `public/install/install.php` is there at the end
- `chown -R <PHP_USER>:<PHP_USER> <ROOT_PATH>`, set the root directory owner to the user running PHP
- In the above step, if you don't know who <PHP_USER> is, you can also give the entire directory 0777 permissions: `chmod -R 0777 <ROOT_PATH>`

After the above preparations are done, open the website domain and it will redirect to the installation screen normally.

### Step 1: Environment check
Check if the PHP version and related extensions meet the requirements.

### Step 2: Add .env file
Check if the `.env.example` that comes with the program exists. If it exists, read it and submit it as it is and the `.env` file will be created.

### Step 3: Create a data table
Create the new data table you need.

### Step 4: Import data
Import the default data and link the relevant storage directory to the public directory according to the settings.

### Step 5: Create system administrator
Fill in the username, email and password to create a system administrator with the highest privileges.

### Step 6: Create background tasks
To create a timed task for user <PHP_USER>, execute: crontab -u <PHP_USER> -e and enter the following in the screen that opens.
```
* * * * * cd <ROOT_PATH> && php artisan schedule:run >> /tmp/schedule.log
```
:::danger
When finished, delete the `public/install` directory. The installation log contains sensitive data, do not disclose it.
:::

## Troubleshooting

If you can't redirect to the installation screen properly, check the nginx error log.  

If you do not see errors, it is possible that php-fpm errors are not output to the nginx error log. Open www.conf (if you don't know where it is, try `whereis php-fpm`, then you can see the basic directory) and find `catch_workers_out` and `php_admin_ flag[log_errors]. flag[log_errors]`, make sure they are on.  

Restart php-fpm to take effect.
```
catch_workers_out = yes
php_admin_flag[log_errors] = on
```

If you still can't see the errors, change ``include/core.php`` to show the errors on the page by changing 0 to 1 at about line 18.
``` php
ini_set('display_errors', 1);
```

::: danger
After fixing the error, remember to turn off the error display!
:::

## Other

### Https or not

It is recommended to enable it. One is for security, and the other is to remove the browser's obtrusive "not secure" wording. Free certificates are available from [Let's Encrypt](https://letsencrypt.org/), and some other cloud server vendors offer them.

### Cloudflare or not

Not necessary. Many PT websites like on, but if you don't pay for it, no locale nodes provide, a lot slower (anti-attack when not said ...)
