## Instructions

This document will guide you in upgrading your NP from the original nexusphp.v1.5.beta5.20120707 version to v1.6.

## Caution
::: warning
For all .php suffix files of NP, a full overwrite with the new version is required!  
So if there are changes, they will be lost, please be aware.

Please make a full backup of the original code directory and Mysql database before upgrading!  
Please make a full backup of the original code directory and Mysql database before upgrading!  
Please make a full backup of the original code directory and Mysql database before upgrading!  

It is recommended to make a copy of the current website data and database to test the upgrade, and then enable it officially after there is no problem.
:::

## Preparation

### Keep the original resource data
Due to the large changes, after downloading the new version of the code, copy the following resources from the old project to the corresponding directory for overwriting.
- attachments
- bitbucket
- config/allconfig.php
- imdb
- subs
- torrents


### Install composer
Go to [official website](https://getcomposer.org/) and install it according to its documentation. After installation, execute `composer install` under <ROOT_PATH>.


### Copy the updater
Copy `nexus/Install/update/update.php` from the new version to `public/update/update.php`.

After the above steps are done, open `<DOMAIN>/update/update.php` and you will be taken to the upgrade screen.

## Upgrade process

### Step 1: Environment check
Check if the current environment meets the upgrade requirements.

### Step 2: Create .env file
Fill in the relevant fields according to the actual situation.

### Step 3: Add or modify the modified table (fields)
This step will change the default value `0000-00-00 00:00:00` to null for the time related fields in the old table.  
And set the default value for fields that are not null.

### Step 4: Import data
Merge the new data set by the site with the old data into the library.

### Step 5: Create backend tasks
Create a timed task for user <PHP_USER>, execute: crontab -u <PHP_USER> -e, and enter the following in the screen that opens.
```
* * * * * cd <ROOT_PATH> && php artisan schedule:run >> /tmp/schedule.log
```

## Conclusion

Remember to delete the `public/update` directory after the upgrade is complete, and the .php file in the <ROOT_PATH> directory is no longer used, so it is up to you to delete it.  
The upgrade log contains sensitive data, so don't leak it.

## Upgrading between 1.6.x

If you are upgrading from `1.6.0-beta1` to `1.6.0-beta2`, you can overwrite the entire directory with the new code (without deleting existing resources such as seeds, attachments, etc.), then modify the relevant directory permissions, execute `composer install`, and finally run the upgrade program again (which will add relevant configuration or data table fields).