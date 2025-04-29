
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
- NP_PORT, the port used by the web server, 443 if https is enabled, otherwise 80. 80 is the default.
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
docker compose up -d 
```

At this point, all the work is done. Other things such as schedule configuration and queue executor process daemon have been automated. We have also configured phpmyadmin, which is accessible via the second-level domain name `phpmyadmin.NP_DOMAIN`.

## About logs

All logs are collected by docker logs and do not write to the container.
