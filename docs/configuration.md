## 邮件发送

### 设置发件人

【主要设定】-><网站邮箱地址>，填写你的发件人。可以跟下边 SMTP 用户名一样，也可以不一样。

### SMTP 设定

【SMTP 设定】-><邮件函数类型>，选择外部。下边以 QQ 邮箱为例，具体参考你的邮件服务提供商文档。
- SMTP 地址：smtp.qq.com
- SMTP 端口：25。记得开放服务器的该端口，否则无法发送！
- 用户名：QQ邮箱完整地址，包含 @qq.com 后缀。
- 用户密码：授权码，不是邮箱密码。获取方式参考[这里](https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=1001256)

完成这两步，在【SMTP 设定】下边有测试地址，点击过去打开邮件测试页面，填写一个收件邮箱地址，点击发送。如果无异常，收件邮箱会收到如下邮件。

<img :src="$withBase('/images/nexus_email_test.png')">

## PT-Gen

NP 默认带了 IMDB 信息，但对于国内玩家可能更习惯于豆瓣。依靠[Rhilip/pt-gen-cfworker](https://github.com/Rhilip/pt-gen-cfworker)提供接口，集成到了 NP 中。

【主要设定】-><开启 PT-Gen 系统>，默认开启。开启后在发种页面可填写 PT-gen 支持的 douban、imdb、bangumi 的链接地址，在种子详情页展示之。

默认使用原作者 demo 接口，如若出现问题，请参考其文档自行搭建接口，填写到 【主要设定】-> <PT-Gen 接口地址>



