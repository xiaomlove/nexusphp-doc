## Mail delivery

### Set sender

[Main Settings] -> [website email address], fill in your sender. It must be the same as the following SMTP username!

### SMTP settings

[SMTP Setting]-> [mail function type], choose external. The following is QQ mailbox as an example, please refer to your mail service provider's document.
- SMTP address：smtp.qq.com.
- SMTP port：465.
- User name: Full address of QQ mailbox, including @qq.com suffix.
- User Password: Authorization code, not mailbox password. Get it by referring to [here](https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=1001256).

Finish these two steps, there is a test address under [SMTP Settings], click over to open the mail test page, fill in an incoming mailbox address and click send. If there is no abnormality, the incoming email will receive the following email.

<img :src="$withBase('/images/nexus_email_test.png')">

## PT-Gen

NP comes with IMDB information by default, but for Chinese players may be more used to Douban. Relying on [Rhilip/pt-gen-cfworker](https://github.com/Rhilip/pt-gen-cfworker) to provide the interface, it is integrated into the NP.

[Main Settings]->[Enable PT-Gen system], enabled by default. After it is enabled, you can fill in the link address of douban, imdb, bangumi supported by PT-gen on the seed page, and show it on the seed detail page.

By default, the original author demo interface is used, if there is any problem, please refer to its documentation to build your own interface, fill in the [Main Settings] -> [PT-Gen api point].

## Set hot, recommended, etc.

In the edit page, you must be a Picker to see this option, and the system administrator is not allowed. Therefore, to set popular, recommended, etc., edit another user, set `rank` to at least: `[Site Settings]->Permissions Settings->Manage Torrents` in the rank, and set `Picker` to: `Yes`.

## New exam

When creating a new one, it is recommended to first **not check Discovered, i.e. set it not to be automatically discovered by the system, so that it will not automatically assign the appraisal task to someone who meets the requirements**.  

First, manually assign to an account for testing: in User list -> detail -> Other -> Assign exam, here select the new exam just created. The time range can be left unfilled, so that the time set in the exam itself prevails, if filled, the time range of the exam will prevail (the system automatically assigns the task based on the time range of the task itself). After the assignment, you can see the assessment in progress and its specific progress on the user details page. You can also remove the exam task (the progress corresponding to the removal is also deleted), or assign it again.  

When the test is OK, check Discovered so that the system will automatically assign it to the person who meets the criteria.