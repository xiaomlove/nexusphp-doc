<ArticleTopAd></ArticleTopAd>

## Description   
This document guides you to upgrade from 1.8 to 1.9. For the original 1.5 version, it is recommended to upgrade to 1.6 first, and then upgrade sequentially.

## Environment Requirements
- Minimum PHP version is 8.2.
- PHP extensions required add `zip, intl, pdo_sqlite, sqlite3`

## Perform the upgrade

:::warning 
It is recommended to stop (e.g. stop Nginx) the update due to changes in data tables with large amounts of data!
:::

First download the update command executable `app/Console/Commands/NexusUpdate.php` and overwrite it. You can download and copy the file directly to the appropriate directory with the wget command: 
``` 
wget https://raw.githubusercontent.com/xiaomlove/nexusphp/php8/app/Console/Commands/NexusUpdate.php 
```

Delete the following files.
- config/octane.php

:::warning 
Due to the large dependency changes, we will use the `--include_composer` option to override the composer.json file, if you have added it yourself, you can back it up and add it back manually.
:::

Then delete `composer.lock` and finally execute the command:

```
# Download the latest code 
php artisan nexus:update --tag=1.9.0 --include_composer

# #Install dependencies 
composer install

# Perform the upgrade 
php artisan nexus:update 
php artisan filament:upgrade

``` 
::: warning 
After upgrading, please install the latest version of the plugin if you have one to ensure it works correctly 
:::

## Change queue executor

As of 1.9, horizon is used instead of queue:work. Please refer to the corresponding documentation according to your installation method.

## Upgrading between versions 1.9

The following is for users who have not changed their code:

```
# Download the code (--tag=dev if you want the latest development code) 
php artisan nexus:update --tag=1.9.x

# Execute the update 
php artisan nexus:update

# Reboot supervisor (AA Panel users can just do it from the interface, Docker users restart queue service) 
supervisorctl reload 
```