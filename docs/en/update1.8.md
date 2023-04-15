<ArticleTopAd></ArticleTopAd>

## Instructions
This document guides you through the upgrade from 1.7 to 1.8. The original 1.5 version is recommended to be upgraded to 1.6 first and then in order.

## Environment requirements

- PHP extensions require the addition of `zend-opcache`

## Performing the upgrade

First download the update command executable `app/Console/Commands/NexusUpdate.php` and overwrite it. This can be downloaded directly via the wget command and copied to the appropriate directory:
```
wget https://raw.githubusercontent.com/xiaomlove/nexusphp/php8/app/Console/Commands/NexusUpdate.php
```

**No plug-in users**, just use the command line to upgrade:
```
# Download the latest code, note to --include_composer
php artisan nexus:update --tag=1.8.0 --include_composer

# Install the dependencies
composer install

# Perform the upgrade
php artisan nexus:update
php artisan filament:upgrade
```

**with plugin user**, change the dependencies manually. As shown below, add `zend-opcache` to the extension, change filament to `2.17.14`, add `"meilisearch/meilisearch-php":"^1.1",`

<img :src="$withBase('/images/composer.json_1.8.png')">

Then delete `composer.lock` and finally execute the command:
```
# Download the latest code
php artisan nexus:update --tag=1.8.0

# Install the dependencies
composer install

# Execute the update
php artisan nexus:update
php artisan filament:upgrade

# After upgrading, the plugin needs to be updated to the latest version, otherwise the admin backend will be 404 and the plugin may not work properly
composer require xiaomlove/nexusphp-xxx:dev-master
```

**For users who merge their own code**, the same steps as for users with the plugin, just without the step of downloading the latest code.

## Create the queue daemon
See [installation](./installation.md#create-queue-daemon-1-8-required)

## Upgrade between versions 1.8

The following is for users who have not modified the code:

```
## Download the code
php artisan nexus:update --tag=1.8.x

# Execute the update
php artisan nexus:update
```