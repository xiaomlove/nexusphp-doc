<ArticleTopAd></ArticleTopAd>
## 注意
:::warning
此部分仅适用于 1.9 或以上版本！
:::

## 安装 Docker

访问 [Docker 官网](https://docs.docker.com/engine/install/)，按照官方文档安装 Docker + Docker compose。

## 构建镜像

到 Github 下载程序最新版 [release](https://github.com/xiaomlove/nexusphp/releases/latest)。解压后进入根目录，直接执行：
```
docker compose build
```

## 启动容器
支持以下环境变量：
- NP_DOMAIN, 域名，必须
- NP_PORT, Web 服务使用的端口，如果启用 https, 为 443，否则是 80. 默认 80
- NP_MYSQL_ROOT_PWD，MySQL root 账号密码，默认为 root
- NP_MYSQL_DB，安装要使用的数据库名，默认为 nexusphp
- NP_MYSQL_USER, MySQL 用户名，默认为 nexusphp
- NP_MYSQL_PWD，NP_MYSQL_USER 用户的登录密码, 默认为 nexusphp

如果要启用 https, 准备好证书，放到 `.docker/openresty/certs` 目录下，将证书文件命名为 `fullchain.pem`，将私钥文件命名为 `private.key`。  
执行以下命令启动（其他参数若要修改，自行补充）：

```
NP_DOMAIN=Your_Domain NP_PORT=443 docker compose up
```

如果不启用 https，NP_PORT 也不用传递，只需要指定 NP_DOMAIN。容器全部正常启动完成后，打开域名，将自动进入安装界面。其中 DB_HOST 填写 `mysql`, REDIS_HOST 填写 `redis`。

全部启动完成后，可退出再添加 -d 后台启动。
```
NP_DOMAIN=Your_Domain NP_PORT=443 docker compose up -d
```
:::warning
切记：NP_DOMAIN + NP_PORT 这 2 个环境变量是每次启动都要添加的，否则会取默认值。MySQL 初始化时会将当时的环境变量持久化，后续环境变量虽然变了，但实际的值不再变化。
:::
至此，全部工作已经完成。其他如定时任务配置与队列执行器进程守护均已自动完成。同时也配置了 phpmyadmin,  通过二级域名 `phpmyadmin.NP_DOMAIN` 访问。

## 关于日志

全部日志已被 docker logs 收集，不会打到容器内部。