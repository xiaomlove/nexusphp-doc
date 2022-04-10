<ArticleTopAd></ArticleTopAd>

## Description
This document guides you to upgrade from 1.6 to 1.7. For the original 1.5 version, it is recommended to upgrade to 1.6 first and then follow this document.

## Environment requirements

- PHP extensions require the addition of pcntl, sockets, posix
- PHP functions `pcntl_signal, pcntl_async_signals, pcntl_alarm` cannot be disabled

## Upgrade dependencies
If you are running `composer install` manually, you can do it normally. If you are downloading dependencies manually, please download the dependencies for 1.7 from the download page.

## Perform upgrade
Similar to upgrade 1.6, get the latest code, overwrite it, copy `nexus/Install/update/update.php` to `public/update/update.php`, and run it. Check that all functions are working after completion.

## Configuring the announce URL

1.7 refactored the announce and scrape interfaces, the default announce URL is `api/announce` and the old `announce.php` is no longer maintained.  
[Site Settings]->[Basic Settings]->[Tracker Address] is changed to `DOMAIN/api/announce`.    
[Site Settings]->[Security Settings]->[HTTPS Tracker Address], change it too if it is filled in.  

## Configure Octane (recommended)
The optional driver is roadrunner or swoole.  
If you use roadrunner, you need to [download its binary](./downloads.md#roadrunner) under ROOT_PATH.  
If you are using swoole, you need to install the swoole PHP extension.  

### Installing supervisor

The following is an example of a manual installation on centos 7.9.

```
### Install
yum install supervisor 
 
# Start
supervisord -c /etc/supervisor/supervisord.conf
```

The configuration file is located at `/etc/supervisor/supervisord.conf`, open it and you will see that the last line will introduce the .ini file in the `/etc/supervisor/conf.d/` directory.  
In the conf.d directory, create a new `nexus-worker.ini` file with the following contents (**Note that you replace ROOT_PATH, PHP_USER**, where `--server=xxx` uses `swoole` or `roadrunner` as you choose).

```
[program:nexus-worker]
process_name=%(program_name)s_%(process_num)02d
command=php -d variables_order=EGPCS ROOT_PATH/artisan octane:start --server=xxx --host=0.0.0.0 --port=8000
autostart=true
autorestart=true
user=PHP_USER
redirect_stderr=true
stdout_logfile=/tmp/nexus-worker.log
```

Save it and start it by executing the following command.
```
# reread the configuration file
supervisorctl reread

# Update the process group
supervisorctl update

# Start
supervisorctl start all
```

The log file is located at `/tmp/nexus-worker.log`, check if it is OK.

***

If you are a BT panel user, you can install `Supervisor Manager` directly in the store, click Add daemon and fill in the following format (**Note to replace ROOT_PATH, PHP_USER**, where `--server=xxx` use `swoole` or `roadrunner` according to your choice).
```
Name: nexus-worker
Startup user: PHP_USER
Running directory: ROOT_PATH
Start command: php -d variables_order=EGPCS artisan octane:start --server=xxx --host=0.0.0.0 --port=8000
Number of processes: 1
```

### Configuring nginx forwarding

In the `/api` section of the nginx configuration, comment out try_files and add the following forwarding content.
```
location ^~ /api {

    # try_files $uri $uri/ /nexus.php$is_args$args;

    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header Scheme $scheme;
    proxy_set_header SERVER_PORT $server_port;
    proxy_set_header REMOTE_ADDR $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Platform $http_platform;
    proxy_set_header User-Agent $http_user_agent;
    proxy_set_header Request-Id $request_id;
    proxy_pass http://127.0.0.1:8000;
}
```

After restarting Nginx, log in to the administration backend and see if it is working properly. If so, you can further configure the old announce forwarding below.

### Old announce forwarding
For previously downloaded torrents, the old interface will still be requested.
If Octane acceleration is configured, you can add a configuration item that will relay the request to the new interface, otherwise it will still be processed with the old announce.
Add an entry to .env that says
```
TRACKER_API_LOCAL_HOST=http://127.0.0.1:8000
```

## Access to Elasticsearch (optional)

If the search function is putting a lot of pressure on Mysql, consider handing over the search function to Elasticsearch (hereafter referred to as ES).  
It is recommended to install ES on another machine with at least 8G of RAM, search for the installation tutorials online, and install ik Chinese splitter.  
After installation, add the following configuration to the .env file.

```
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_SCHEME=https
ELASTICSEARCH_USER=elastic
ELASTICSEARCH_PASS=******
ELASTICSEARCH_SSL_VERIFICATION=/tmp/http_ca.crt
ELASTICSEARCH_ENABLED=1
```

Now ES requires https connection, note that its certificate must be read by php with permission. The last item means whether it is enabled or not, set to 1 means enabled. If it is not enabled, leave it blank.  
You can set it to empty before importing the data. After filling in the other options, execute the following command under ROOT_PATH to test and import the data.

```
# Test that the configuration is intact, and if it is, it will return ES server information
php artisan es:info

# Create an index
php artisan es:create_index

# Import data
php artisan es:import
```

After the data is imported successfully, you can set `ELASTICSEARCH_ENABLED` to 1, then check the seed list, add/update/delete/favorite torrents to see if it works properly.  
If you find that it is not working properly, you can change it to empty and not use it.

## Upgrade between versions 1.7
Same as 1.6. If Octane acceleration is enabled, remember to restart it. Go to ROOT_PATH and execute (server fill in `swoole` or `roadrunner` as appropriate).
```
php artisan octane:reload --server=xxx
```