## Warning
:::warning
This section only applies to version 1.9 or above!
:::
## Install Docker

Visit [Docker official website](https://docs.docker.com/engine/install/) and follow the official documentation to install Docker + Docker compose.

## Build the image

Go to Github and download the latest version of the program [release](https://github.com/xiaomlove/nexusphp/releases/latest). Unzip it, go to the directory, and run: 
``` 
docker compose build 
```

## Start the container 
supports the following environment variables:
- NP_DOMAIN, domain name, required.
- NP_PORT, the port used by the web service, 443 if https is enabled, otherwise 80. 80 is the default.
- NP_MYSQL_ROOT_PWD, MySQL root account password, default is root.
- NP_MYSQL_DB, the name of the database to be used for the installation, default is nexusphp.
- NP_MYSQL_USER, MySQL user name, defaults to nexusphp.
- NP_MYSQL_PWD, the login password for NP_MYSQL_USER, defaults to nexusphp.

If you want to enable https, prepare the certificate and put it in the `.docker/openresty/certs` directory, name the certificate file as `fullchain.pem` and the private key file as `private.key`.  
Execute the following command to start (add other parameters if you want to change them):

``` 
NP_DOMAIN=Your_Domain NP_PORT=443 docker compose up 
```

If you don't enable https, you don't need to pass NP_PORT, you just need to specify NP_DOMAIN. after the containers start up normally, you can open the domain name, and it will open the installation page. The DB_HOST should be `mysql` and REDIS_HOST should be `redis`.

After all startups are complete, you can exit and add -d to startup again.
``` 
NP_DOMAIN=Your_Domain NP_PORT=443 docker compose up -d
```
:::warning
Remember: NP_DOMAIN + NP_PORT are environment variables that must be added every time, otherwise they will take the default values. MySQL will persist the environment variables at that time when it is initialized, and the actual values will not be changed even though the environment variables have been changed subsequently.
:::

At this point, all the work is done. Other things such as schedule configuration and queue executor process daemon have been automated.

## phpmyadmin
To make it easier to modify the database, phpmyadmin is also configured.
- When NP_DOMAIN is a top-level domain (e.g. aa.com), it is accessed through the second-level domain `phpmyadmin.NP_DOMAIN (e.g. phpmyadmin.aa.com)`.
- When the NP_DOMAIN is a non-TLD (e.g. nexusphp.aa.com), access is via the second-level domain name `phpmyadmin-NP_DOMAIN (e.g. phpmyadmin-nexusphp.aa.com)`.

## About logs

All logs are collected by docker logs and do not write to the container.


## About Backup

The following is for using the backup function that comes with it.

Management->Settings->Backup->Export path, this setting determines where the backup data is stored. You can set the environment variable `NP_BACKUP_EXPORT_PATH` to the same value when creating the container if you want to see it on the host. The backup is a .tar.gz archive containing all the data in the root directory of the site (except the vendor directory) and the database data.

``` 
root@v2202505270792336883:/tmp/nexusphp_backup# tar -tzf html.20250517.190720.tar.gz 
html.web.20250517.190625.tar.gz 
html. database.20250517.190713.sql 
```

As for offsite saving, you can enable ftp/sftp in the backup settings so that the self backup feature will transfer the backup data to the remote server you configured.

Or if you have a more specialized solution, you can not enable ftp/sftp but use your own solution to transfer the exported files. If you don't even want to use built-in export function, just turn the backup feature off.

**It is highly recommended to make backups, at least once a day, and to move them to an offsite location!**
