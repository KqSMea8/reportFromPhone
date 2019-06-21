/*行为列表*/
var _EmulActionDic =[
    {"id":"10030","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10040","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10050","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10070","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"1"},
    {"id":"10370","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10380","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10390","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"2"},
    {"id":"10400","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"0"},
    {"id":"10420","threshold_value":"0","action_type":"录音","action_group":" ","safe_level":"2"},
    {"id":"10430","threshold_value":"0","action_type":"录音","action_group":" ","safe_level":"2"},
    {"id":"10450","threshold_value":"0","action_type":"录音","action_group":" ","safe_level":"2"},
    {"id":"10480","threshold_value":"0","action_type":"拍照和录像","action_group":" ","safe_level":"0"},
    {"id":"10510","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"2"},
    {"id":"10550","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10580","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"2"},
    {"id":"10600","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10630","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"2"},
    {"id":"10780","threshold_value":"0","action_type":"窗口","action_group":" ","safe_level":"0"},
    {"id":"10790","threshold_value":"0","action_type":"服务","action_group":" ","safe_level":"0"},
    {"id":"10800","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"0"},
    {"id":"10820","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10830","threshold_value":"0","action_type":"其他","action_group":" ","safe_level":"0"},
    {"id":"10840","threshold_value":"0","action_type":"权限","action_group":" ","safe_level":"0"},
    {"id":"10850","threshold_value":"0","action_type":"其他","action_group":" ","safe_level":"0"},
    {"id":"10870","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"0"},
    {"id":"10880","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"0"},
    {"id":"10890","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"2"},
    {"id":"10970","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10980","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10490","threshold_value":"0","action_type":"拍照和录像","action_group":" ","safe_level":"2"},
    {"id":"10500","threshold_value":"0","action_type":"拍照和录像","action_group":" ","safe_level":"1"},
    {"id":"10520","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10530","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"1"},
    {"id":"10540","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"2"},
    {"id":"10560","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"0"},
    {"id":"10570","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"2"},
    {"id":"10590","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10610","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10620","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"1"},
    {"id":"10640","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10650","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10660","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"1"},
    {"id":"10670","threshold_value":"0","action_type":"网络","action_group":" ","safe_level":"0"},
    {"id":"10710","threshold_value":"0","action_type":"广播","action_group":" ","safe_level":"0"},
    {"id":"10730","threshold_value":"0","action_type":"广播","action_group":" ","safe_level":"0"},
    {"id":"10810","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"0"},
    {"id":"10990","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10080","threshold_value":"0","action_type":"短信","action_group":" ","safe_level":"0"},
    {"id":"10090","threshold_value":"0","action_type":"短信","action_group":" ","safe_level":"1"},
    {"id":"10100","threshold_value":"0","action_type":"短信","action_group":" ","safe_level":"1"},
    {"id":"10120","threshold_value":"0","action_type":"通话记录","action_group":" ","safe_level":"0"},
    {"id":"10130","threshold_value":"0","action_type":"通话记录","action_group":" ","safe_level":"1"},
    {"id":"10140","threshold_value":"0","action_type":"通话记录","action_group":" ","safe_level":"1"},
    {"id":"10160","threshold_value":"0","action_type":"其它","action_group":" ","safe_level":"0"},
    {"id":"10170","threshold_value":"0","action_type":"其它","action_group":" ","safe_level":"0"},
    {"id":"10180","threshold_value":"0","action_type":"其它","action_group":" ","safe_level":"0"},
    {"id":"10190","threshold_value":"0","action_type":"其它","action_group":" ","safe_level":"0"},
    {"id":"10200","threshold_value":"0","action_type":"其它","action_group":" ","safe_level":"0"},
    {"id":"10210","threshold_value":"0","action_type":"其它","action_group":" ","safe_level":"1"},
    {"id":"10230","threshold_value":"0","action_type":"其它","action_group":" ","safe_level":"0"},
    {"id":"10240","threshold_value":"0","action_type":"通讯录","action_group":" ","safe_level":"0"},
    {"id":"10250","threshold_value":"0","action_type":"通讯录","action_group":" ","safe_level":"0"},
    {"id":"10260","threshold_value":"0","action_type":"通讯录","action_group":" ","safe_level":"0"},
    {"id":"10280","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"0"},
    {"id":"10290","threshold_value":"0","action_type":"系统","action_group":" ","safe_level":"1"},
    {"id":"10691","threshold_value":"0","action_type":"广播","action_group":" ","safe_level":"1"},
    {"id":"10692","threshold_value":"0","action_type":"广播","action_group":" ","safe_level":"1"},
    {"id":"10693","threshold_value":"0","action_type":"广播","action_group":" ","safe_level":"1"},
    {"id":"10910","threshold_value":"5","action_type":"系统","action_group":"插件相关","safe_level":"2"},
    {"id":"10920","threshold_value":"5","action_type":"系统","action_group":"插件相关","safe_level":"2"},
    {"id":"10930","threshold_value":"5","action_type":"系统","action_group":"插件相关","safe_level":"2"},
    {"id":"10940","threshold_value":"5","action_type":"系统","action_group":"插件相关","safe_level":"2"},
    {"id":"10680","threshold_value":"5","action_type":"广播","action_group":"电话相关","safe_level":"2"},
    {"id":"10760","threshold_value":"9","action_type":"电话","action_group":"电话相关","safe_level":"2"},
    {"id":"10770","threshold_value":"1","action_type":"电话","action_group":"电话相关","safe_level":"2"},
    {"id":"10690","threshold_value":"5","action_type":"广播","action_group":"电话相关","safe_level":"2"},
    {"id":"10831","threshold_value":"9","action_type":"网络","action_group":"电子邮件","safe_level":"2"},
    {"id":"10740","threshold_value":"9","action_type":"短信","action_group":"短信相关","safe_level":"2"},
    {"id":"10750","threshold_value":"9","action_type":"短信","action_group":"短信相关","safe_level":"2"},
    {"id":"10720","threshold_value":"9","action_type":"广播","action_group":"短信相关","safe_level":"2"},
    {"id":"10110","threshold_value":"9","action_type":"短信","action_group":"短信相关","safe_level":"1"},
    {"id":"10741","threshold_value":"5","action_type":"短信","action_group":"短信相关","safe_level":"2"},
    {"id":"10471","threshold_value":"5","action_type":"拍照和录像","action_group":"录像相关","safe_level":"1"},
    {"id":"10440","threshold_value":"9","action_type":"录音","action_group":"录音相关","safe_level":"2"},
    {"id":"10340","threshold_value":"5","action_type":"手机识别码","action_group":"敏感动作","safe_level":"2"},
    {"id":"10410","threshold_value":"9","action_type":"电话","action_group":"敏感动作","safe_level":"2"},
    {"id":"10460","threshold_value":"1","action_type":"拍照和录像","action_group":"敏感动作","safe_level":"1"},
    {"id":"10860","threshold_value":"9","action_type":"定位","action_group":"敏感动作","safe_level":"2"},
    {"id":"10350","threshold_value":"5","action_type":"手机识别码","action_group":"敏感动作","safe_level":"2"},
    {"id":"10360","threshold_value":"9","action_type":"手机识别码","action_group":"敏感动作","safe_level":"2"},
    {"id":"10700","threshold_value":"9","action_type":"广播","action_group":"敏感动作","safe_level":"2"},
    {"id":"10220","threshold_value":"1","action_type":"其它","action_group":"敏感动作","safe_level":"2"},
    {"id":"10470","threshold_value":"5","action_type":"拍照和录像","action_group":"拍照相关","safe_level":"2"},
    {"id":"10150","threshold_value":"5","action_type":"通话记录","action_group":"通讯录相关","safe_level":"1"},
    {"id":"10270","threshold_value":"9","action_type":"通讯录","action_group":"通讯录相关","safe_level":"1"},
    {"id":"10010","threshold_value":"1","action_type":"网络","action_group":"网络相关","safe_level":"1"},
    {"id":"10020","threshold_value":"1","action_type":"网络","action_group":"网络相关","safe_level":"1"},
    {"id":"10060","threshold_value":"5","action_type":"网络","action_group":"网络相关","safe_level":"1"},
    {"id":"10300","threshold_value":"0","action_type":"文件相关","action_group":"文件相关","safe_level":"0"},
    {"id":"10310","threshold_value":"0","action_type":"文件相关","action_group":"文件相关","safe_level":"1"},
    {"id":"10320","threshold_value":"0","action_type":"文件相关","action_group":"文件相关","safe_level":"2"},
    {"id":"10330","threshold_value":"0","action_type":"文件相关","action_group":"文件相关","safe_level":"2"},
    {"id":"10900","threshold_value":"9","action_type":"系统","action_group":"系统相关","safe_level":"2"},
    {"id":"10950","threshold_value":"1","action_type":"系统","action_group":"系统相关","safe_level":"2"},
    {"id":"10960","threshold_value":"9","action_type":"系统","action_group":"系统相关","safe_level":"2"}
];
/*危险行为*/
var _EmulDangerAct  =[
    {"id":"10110","title":"获取手机短信内容","desc":"应用程序在运行过程读取了手机短信收件箱，掌握你短信收件箱所有内容。如果应用属于手机短信相关类型，获取短信收件箱是为了用户方便使用业务功能；然而，短信收件箱包含了很多个人金融、资产、注册等敏感信息内容，建议用户尽量采用手机自带的短信应用程序。某些不属于短息相关的应用程序和恶意代码应用会在用户不知情或未授权情况下，隐蔽窃取手机短信收件箱并外传，给用户造成严重的损失和危害。[建议您禁止这个应用访问手机短信收件箱权限。]","action":"0","order":"2","threshold":"9"},
    {"id":"10150","title":"获取最近通话记录","desc":"应用程序在运行过程获取手机通话记录，如果应用是属于拨打电话、发送短信类型的应用，则获取短信是为了方便用户快捷使用业务功能；然而，有很多应用在用户不知情或未授权的情况下，隐蔽获取手机最近通话记录内容并外传，是属于窃取用户隐私数据行为。[建议您禁止这个应用访问手机通话记录权限。]","action":"0","order":"2","threshold":"5"},
    {"id":"10220","title":"修改浏览器书签","desc":"应用程序在运行时，修改了本地浏览器收藏夹书签，需警惕是否执行网站钓鱼，达到不正当目的。","action":"1","order":"2","threshold":"1"},
    {"id":"10270","title":"获取通讯录信息","desc":"应用程序在运行时，读取手机通讯录联系人信息，如果应用是拨打电话相关功能，或功功能属于IM类的消息通讯类型，则读取手机通讯录是为了主动寻找更多联系人信息；然而，有一些应用不属于以上说明的功能范围，在用户不知情或未授权的情况下，获取手机通讯录联系人信息并外传，是属于窃取用户隐私数据行为。[建议您禁止这个应用访问手机联系人信息权限。]","action":"0","order":"2","threshold":"9"},
    {"id":"10340","title":"获取 IMSI","desc":"应用程序在运行时读取了手机的国际移动设备身份码 IMSI 值，一些应用程序由于某种目的，会读取手机上的 IMSI 值，如标识用户电话号码或其它原因。本行为是在用户不知情或未授权情况下，将属于窃取隐私行为。","action":"0","order":"2","threshold":"5"},
    {"id":"10350","title":"获取 IMEI","desc":"应用程序在运行时读取了手机的国际移动设备身份码 IMEI 值，很多应用程序均会读取手机 IMEI 作为应用产品的客户端安装用户量统计；手机 IMEI 被非法获取后存在的被远程监控手机风险（特殊手段实现），如禁止打电话、定位、锁住手机等。","action":"0","order":"2","threshold":"5"},
    {"id":"10360","title":"获取手机号码","desc":"应用程序在运行时，尝试获取手机本地号码行为，在当前大部分手机系统版本 6.0 及以上，应用程序基本无法获取具体的电话号码内容。","action":"0","order":"2","threshold":"9"},
    {"id":"10410","title":"监听通话状态","desc":"应用程序在运行过程中，监听到手机通话状态，则会暂停和保留静止状态，对于特殊恶意代码应用，则可能会执行后台录音。这种应用行为，代表应用程序能够知道你当前处于通话电话状态。","action":"0","order":"2","threshold":"9"},
    {"id":"10440","title":"启动录音","desc":"应用程序在运行时后台启动录音程序，对于某些具备语音功能的应用，如唱歌、VOIP、语音聊天或留言等功能类型应用，必须获取录音接口功能；然而，不论应用程序是否合规，获取录音权限功能的应用程序，均具备隐蔽背景录音的能力，均属于高度威胁的应用类型；特别是恶意代码应用，在用户不知情情况下，能够在手机关闭屏幕情况下，执行背景录音，给用户造成严重的后果和恶劣的影响。如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"1","order":"1","threshold":"9"},
    {"id":"10460","title":"启动摄像头","desc":"应用程序启动手机拍照模式；正常的应用程序激活摄像头取决于业务需要扫描二维码或标准拍照需求；具有激活手机摄像头的权限行为的应用，则具备随时拍照的功能，如果开发者嵌入恶意代码，则可以实现后台隐蔽式拍照功能（用户无法觉察），具备潜在威胁的风险。[如果这个应用功能不涉及相册和拍照功能，建议您禁止这个应用访问相册或摄像头权限。]","action":"1","order":"2","threshold":"1"},
    {"id":"10470","title":"执行拍照","desc":"应用程序执行了拍照行为，具备图库、美颜、头像需求的应用程序，均要求获取拍照权限行为；然而，拥有执行拍照权限行为的应用程序，均具备读取手机相片库权限，具有这种权限行为的应用属于潜在风险类型；非相片、拍照功能相关的恶意代码应用，会在用户不知情或未授权的情况下，自动执行（隐蔽）拍照，以达到不正当目的。[如果这个应用功能不涉及相册和拍照功能，建议您禁止这个应用访问相册或摄像头权限。]如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"0","order":"2","threshold":"5"},
    {"id":"10471","title":"启动录像","desc":"应用程序执行了录像行为，具备图库、直播、摄影需求的应用程序，均要求获取视频录制权限行为；然而，拥有执行视频录制权限行为的应用程序，均具备读取手机相片库（包含视频内容）权限，具有这种权限行为的应用属于潜在风险类型；非相片、视频录制功能相关的恶意代码应用，会在用户不知情或未授权的情况下，自动执行（隐蔽）录像，以达到不正当目的。如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"0","order":"2","threshold":"5"},
    {"id":"10680","title":"监听来电状态","desc":"应用程序在运行过程中，监听到手机来电状态，则会暂停和冻结静止状态（电话通话状态结束，则还原应用程序之前状态），并显示手机待接听状态界面；对于某些具备骚扰电话拦截或电话号码归属地的功能类型应用程序，则会需要这个行为权限，便于随时拦截黑名单电话号码；更多的应用是实现记录用户电话行为信息；对于特殊恶意代码应用，则会获取来电电话号码。注意，在5.1系统版本上，必须用户授权，应用程序才能监听来电的电话号码。","action":"0","order":"2","threshold":"5"},
    {"id":"10690","title":"监听去电状态","desc":"应用程序在运行过程中，监听手机拨打状态，对于某些具备显示电话号码归属地的功能类型应用程序，则会需要这个行为权限，便于随时显示拨打电话号码相关信息；更多的应用是实现记录用户电话行为信息；对于特殊恶意代码应用，则会获取拨打电话号码。注意，在5.1系统版本上，必须用户授权，应用程序才能监听来电的电话号码。","action":"0","order":"2","threshold":"5"},
    {"id":"10700","title":"监控接收短信","desc":"应用程序在运行过程中，手机收到外部短信息，应用程序后台进程能监听并读取该条短信内容；对于不具备必须获取短信内容业务功能的应用来说，本行为且是在用户不知情或未授权情况下执行，应用程序能够知道您所有的接收短信的内容，如银行验证码等，这种行为是属于危险性质。[如果这个应用功能不涉及短信内容，建议您禁止这个应用访问短信权限。]","action":"0","order":"2","threshold":"9"},
    {"id":"10720","title":"拦截接收短信","desc":"应用程序的后台拦截了手机接收的短信；凡是应用程序具有这种拦截短信行为，且都是用户不知情或未授权，均是为了达到某种特殊目的；属于高威胁类型或恶意代码应用，正常和规范的应用程序均不会执行这种行为。[建议您禁止这个应用访问手机短信收件箱权限。]","action":"1","order":"2","threshold":"9"},
    {"id":"10740","title":"隐蔽发送短信","desc":"应用程序在后台隐蔽发送了短信，安全合规的应用程序均不会后台隐蔽发送短信；不合规或恶意代码性质的应用程序才会执行隐蔽发送短信，以达到不正当目的，并后台截获或接收控制者发送的短信指令，用户无法觉察。如果在用户不知情或未授权的情况下，应用程序后台发送短信目的为了获取手机和手机号码有效标识，便于控制者后续执行远程控制指令布控。[建议您禁止这个应用访问手机短信权限。]","action":"1","order":"1","threshold":"9"},
    {"id":"10741","title":"发送短信","desc":"应用程序在运行过程执行发送了短信，某些和短信相关的应用程序会在业务功能上支持收发短信，这些应用均能获取到手机的短信收件箱内容，务必注意！特别的，一些不相关的应用可能在用户不知情或未授权的情况下，执行发送短信，可能会造成用户隐私信息泄漏，这种行为属于属于不合规范标准。[建议您禁止这个应用访问手机短信收件箱权限。]","action":"1","order":"1","threshold":"5"},
    {"id":"10750","title":"截获接收短信","desc":"应用程序的后台进程截获了手机接收的短信内容；应用程序在系统注册了接收短信的监听服务，手机接收所有外部短息消息时，应用程序均会尝试截获（复制）这条短信内容，以达成某种目的；这种行为均是在用户不知情或未授权的情况下执行，从而造成用户隐私信息泄漏，进一步可能造成用户严重的损失和危害。[建议您禁止这个应用访问手机短信收件箱权限。]","action":"1","order":"1","threshold":"9"},
    {"id":"10760","title":"隐蔽拨打电话","desc":"应用程序运行过程后台进程隐蔽拨打电话；不合规或恶意代码应用会在用户不知情或未授权情况下，后台隐蔽拨打远程电话号码，达成背景窃听用户环境声音信息。如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"1","order":"2","threshold":"9"},
    {"id":"10770","title":"自动挂断电话","desc":"应用程序运行过程后台进程自动挂断电话；某些具备骚扰电话、诈骗电话拦截保护功能的应用程序，则会需要这个权限行为，应用会在用户手机来电状态下，获取当前来电电话号码，判断是号码黑名单并自动挂断。注意，在5.1系统版本上，必须用户授权后，应用程序才能监听来电的电话号码。","action":"1","order":"2","threshold":"1"},
    {"id":"10831","title":"隐蔽发送电子邮件","desc":"应用程序在运行过程后台向外部隐蔽发送了电子邮件，以达到不正当目的，恶意代码应用经常在用户不知情或未授权的情况下，将窃取的数据（加密）存储并通过后台发送电子邮件方式进行外传窃取，达成隐蔽窃取用户隐私数据。如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"1","order":"1","threshold":"9"},
    {"id":"10860","title":"获取手机地址位置","desc":"应用程序在运行时通过网络或GPS全球定位模块，获取当前手机地理位置信息。如果应用非自身业务需要，如应用是地图、外卖、天气等必要性的功能业务之外，均没必要获取手机地理位置信息；非法获取地理位置信息能够取得你当前的地理坐标位置。[建议您禁止这个应用访问手机地址位置信息权限。]","action":"0","order":"2","threshold":"9"},
    {"id":"10900","title":"获取系统ROOT权限","desc":"当前应用程序在用户不知情或未授权的情况下，隐蔽尝试获取系统ROOT权限，以达到不正当目的；合规应用程序均不会执行获取系统ROOT权限行为，任何应用程序获取设备ROOT权限后，将会破坏手机系统稳定性，且具备手机设备最高权限，可以在手机上执行任何操作行为，极度危险！如果您无法判断应用程序的合规性，建议卸载这个应用程序。]","action":"0","order":"1","threshold":"9"},
    {"id":"10910","title":"安装插件","desc":"应用程序在运行过程中，在用户不知情或未授权的情况下，自动安装多个插件包，并执行新插件包功能。某些恶意代码应用会将恶意代码功能通过插件包来实现，以执行更多用户未知的行为事件；如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"1","order":"3","threshold":"5"},
    {"id":"10920","title":"安装插件","desc":"应用程序在运行过程中，在用户不知情或未授权的情况下，自动安装多个插件包，并执行新插件包功能。某些恶意代码应用会将恶意代码功能通过插件包来实现，以执行更多用户未知的行为事件；如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"1","order":"3","threshold":"5"},
    {"id":"10930","title":"安装插件","desc":"应用程序在运行过程中，在用户不知情或未授权的情况下，自动安装多个插件包，并执行新插件包功能。某些恶意代码应用会将恶意代码功能通过插件包来实现，以执行更多用户未知的行为事件；如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"1","order":"3","threshold":"5"},
    {"id":"10940","title":"安装插件","desc":"应用程序在运行过程中，在用户不知情或未授权的情况下，自动安装多个插件包，并执行新插件包功能。某些恶意代码应用会将恶意代码功能通过插件包来实现，以执行更多用户未知的行为事件；如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"1","order":"3","threshold":"5"},
    {"id":"10950","title":"查询手机模拟器状态","desc":"应用程序在运行过程后检测手机设备是否模拟器，某些应用消费或金融支付类应用，为防止被恶意用户用模拟器非法获取利益收入，均会加入判断应用程序所运行的用户手机设备是否模拟器。然而，专业的恶意代码应用，为了实现防止被诱导或检测蜜罐环境，均会采用多种检测运行设备环境是否模拟器。如果您无法判断应用程序的合规性，建议卸载这个应用程序。","action":"0","order":"1","threshold":"1"},
    {"id":"10960","title":"隐藏应用图标","desc":"应用程序在启动时执行隐藏自身应用程序桌面图标，用户无法在手机应用列表界面发现这个应用程序，从而无法正常卸载。合规的应用程序均不会执行隐藏自身应用程序图标行为，恶意代码应用为达到不正当目的，防止用户发现和卸载，会执行隐藏自身图标行为动作；凡是出现这种恶意动作行为的情况，建议您卸载这个应用程序。","action":"0","order":"1","threshold":"9"}
];
/*系统文件*/
var _EmulSysFileDic = [
    {"stype":"1","source_dir":"/system/build.prop","is_active":"1","desc":"属性文件,在Android系统中.prop文件很重要，记录了系统的设置和改变"},
    {"stype":"1","source_dir":"/data/misc/wifi/wpa_supplicant.conf","is_active":"1","desc":"记录了本机wifi信息，含明文密码"},
    {"stype":"1","source_dir":"/data/data/com.android.browser/webviewCookiesChromium.db","is_active":"1","desc":"记录Cookies信息"},
    {"stype":"1","source_dir":"/data/data/com.android.browser/browser2.db","is_active":"1","desc":"记录了浏览器的所有信息，包括书签、历史等"},
    {"stype":"1","source_dir":"/data/data/com.android.browser/webview.db","is_active":"1","desc":"记录了【登录】表单，含密码"},
    {"stype":"1","source_dir":"/data/data/com.android.providers.contacts/databases/contacts2.db","is_active":"1","desc":"通讯录、通话记录库"},
    {"stype":"1","source_dir":"/data/data/com.android.providers.telephony/databases/mmssms.db","is_active":"1","desc":"短信库"},
    {"stype":"1","source_dir":"/proc/cpuinfo","is_active":"1","desc":"记录CPU信息"},
    {"stype":"1","source_dir":"/proc/meminfo","is_active":"1","desc":"记录内存、交换空间信息"},
    {"stype":"1","source_dir":"/proc/mounts","is_active":"1","desc":"记录已加载的文件系统列表"},
    {"stype":"1","source_dir":"/proc/devices","is_active":"1","desc":"记录可用设备的列表"},
    {"stype":"1","source_dir":"/proc/filesystem","is_active":"1","desc":"记录支持的文件系统"},
    {"stype":"1","source_dir":"/proc/modules","is_active":"1","desc":"记录已加载的模块"},
    {"stype":"1","source_dir":"/proc/version","is_active":"1","desc":"记录内核版本"},
    {"stype":"1","source_dir":"/var/log/boot.log","is_active":"1","desc":"记录系统在引导过程中发生的事件，及Linux系开机自检过程显示的信息"},
    {"stype":"1","source_dir":"/var/log/cron","is_active":"1","desc":"记录crontab守护进程crond所派生的子进程的动作"},
    {"stype":"1","source_dir":"/var/log/maillog","is_active":"1","desc":"记录了每一个发送到系统或从系统发出的电子邮件的活动"},
    {"stype":"1","source_dir":"/var/log/syslog","is_active":"1","desc":"记录警告信息，常常是系统出问题的信息"},
    {"stype":"1","source_dir":"/var/log/wtemp","is_active":"1","desc":"永久记录每个用户登陆、注销及系统的启动、停机的事件"},
    {"stype":"1","source_dir":"/var/log/utmp","is_active":"1","desc":"记录有关当前登陆的每个用户的信息"},
    {"stype":"1","source_dir":"/var/log/xferlog","is_active":"1","desc":"记录FTP会话，可以显示出用户向FTP服务器或从服务器复制了的文件"},
    {"stype":"1","source_dir":"/var/log/lastlog","is_active":"1","desc":"记录最近成功登陆的事件和最后一次不成功的登陆事件"},
    {"stype":"1","source_dir":"/var/log/messages","is_active":"1","desc":"记录Linux内核消息及各种应用程序的公共日志的信息"},
    {"stype":"1","source_dir":"/var/log/dmesg","is_active":"1","desc":"记录Linux系统内核操作信息"},
    {"stype":"1","source_dir":"/var/log/rpmpks","is_active":"1","desc":"记录系统中安装的各种rpm包列表信息"},
    {"stype":"1","source_dir":"/var/log/secure","is_active":"1","desc":"记录用户认证过程中的事件信息"},
    {"stype":"1","source_dir":"/data/data/com.android.EmailProvider.db","is_active":"1","desc":"记录了本机所有收发电子邮件信息内容，并明文记录在本机上登录的邮箱用户和密码"},
    {"stype":"1","source_dir":"/data/data/com.android.EmailProviderBuckup.db","is_active":"1","desc":"“EmailProvider.db”的备份，记录了本机所有收发电子邮件信息内容，并明文记录在本机上登录的邮箱用户和密码"},
    {"stype":"1","source_dir":"/etc/apns-conf.xml","is_active":"1","desc":"APN接入点配置文件"},
    {"stype":"1","source_dir":"/etc/AudioFilter.csv","is_active":"1","desc":"音频过滤器配置文件"},
    {"stype":"1","source_dir":"/etc/bookmarks.xml","is_active":"1","desc":"书签数据库"},
    {"stype":"1","source_dir":"/etc/dbus.conf","is_active":"1","desc":"总线监视配置文件"},
    {"stype":"1","source_dir":"/etc/favorites.xml","is_active":"1","desc":"浏览器的收藏夹"},
    {"stype":"1","source_dir":"/etc/firmware/","is_active":"1","desc":"记录手机固件信息"},
    {"stype":"1","source_dir":"/etc/gps.conf ","is_active":"1","desc":"GPS设置文件"},
    {"stype":"1","source_dir":"/etc/hcid.conf","is_active":"1","desc":"内核HCID配置文件"},
    {"stype":"1","source_dir":"/etc/hosts","is_active":"1","desc":"网络DNS缓存"},
    {"stype":"1","source_dir":"/etc/location","is_active":"1","desc":"手机定位相关文件"},
    {"stype":"1","source_dir":"/etc/mountd.conf","is_active":"1","desc":"存储挂载配置文件"},
    {"stype":"1","source_dir":"/etc/permissions.xml","is_active":"1","desc":"权限许可文件"},
    {"stype":"1","source_dir":"/etc/wifi","is_active":"1","desc":"WLAN相关组件"},
    {"stype":"1","source_dir":"/etc/location/gps/location","is_active":"1","desc":"定位相关文件"},
    {"stype":"1","source_dir":"/etc/location/gps/nmea","is_active":"1","desc":"GPS数据解析文件"},
    {"stype":"1","source_dir":"/etc/security/otacerts.zip","is_active":"1","desc":"OTA下载验证"},
    {"stype":"1","source_dir":"/etc/wifi/wpa_supplicant.conf","is_active":"1","desc":"WPA验证组件"},
    {"stype":"1","source_dir":"/system/etc/apns-conf.xml","is_active":"1","desc":"APN接入点配置文件"},
    {"stype":"1","source_dir":"/system/etc/AudioFilter.csv","is_active":"1","desc":"音频过滤器配置文件"},
    {"stype":"1","source_dir":"/system/etc/bookmarks.xml","is_active":"1","desc":"书签数据库"},
    {"stype":"1","source_dir":"/system/etc/dbus.conf","is_active":"1","desc":"总线监视配置文件"},
    {"stype":"1","source_dir":"/system/etc/favorites.xml","is_active":"1","desc":"浏览器的收藏夹"},
    {"stype":"1","source_dir":"/system/etc/firmware/","is_active":"1","desc":"记录手机固件信息"},
    {"stype":"1","source_dir":"/system/etc/gps.conf ","is_active":"1","desc":"GPS设置文件"},
    {"stype":"1","source_dir":"/system/etc/hcid.conf","is_active":"1","desc":"内核HCID配置文件"},
    {"stype":"1","source_dir":"/system/etc/hosts","is_active":"1","desc":"网络DNS缓存"},
    {"stype":"1","source_dir":"/system/etc/location","is_active":"1","desc":"手机定位相关文件"},
    {"stype":"1","source_dir":"/system/etc/mountd.conf","is_active":"1","desc":"存储挂载配置文件"},
    {"stype":"1","source_dir":"/system/etc/permissions.xml","is_active":"1","desc":"权限许可文件"},
    {"stype":"1","source_dir":"/system/etc/wifi","is_active":"1","desc":"WLAN相关组件"},
    {"stype":"1","source_dir":"/system/etc/location/gps/location","is_active":"1","desc":"定位相关文件"},
    {"stype":"1","source_dir":"/system/etc/location/gps/nmea","is_active":"1","desc":"GPS数据解析文件"},
    {"stype":"1","source_dir":"/system/etc/security/otacerts.zip","is_active":"1","desc":"OTA下载验证"},
    {"stype":"1","source_dir":"/system/etc/wifi/wpa_supplicant.conf","is_active":"1","desc":"WPA验证组件"},
    {"stype":"0","source_dir":"/system/fonts/","is_active":"1","desc":"手机字体文件"},
    {"stype":"0","source_dir":"/system/framework/","is_active":"1","desc":"JAVA平台的一些核心文件，属于JAVA平台系统框架文件"},
    {"stype":"0","source_dir":"/system/lib/","is_active":"1","desc":"系统底层库"},
    {"stype":"0","source_dir":"/system/lost+found/","is_active":"1","desc":"yaffs文件系统固有的，类似回收站的文件夹，只有是yaffs文件系统都会有"},
    {"stype":"0","source_dir":"/system/media/","is_active":"1","desc":"系统媒体文件"},
    {"stype":"0","source_dir":"/system/priv-app/","is_active":"1","desc":"系统的核心应用，能使用系统级的权限"},
    {"stype":"0","source_dir":"/system/tts/","is_active":"1","desc":"该文件所在文件夹内存放的是语音拨号相关内容"},
    {"stype":"0","source_dir":"/system/usr/","is_active":"1","desc":"该文件所在文件夹内存放的是用户文件"},
    {"stype":"0","source_dir":"/system/vendor/","is_active":"1","desc":"该文件所在文件夹内存放的是厂家定制的内容"},
    {"stype":"0","source_dir":"/system/xbin/","is_active":"1","desc":"该文件所在文件夹内存放的是系统管理工具"},
    {"stype":"0","source_dir":"/proc/interrupts","is_active":"1","desc":"记录了被占用的中断信息和占用者的信息"},
    {"stype":"0","source_dir":"/proc/ioports","is_active":"1","desc":"记录了当前使用的I/O端口"},
    {"stype":"0","source_dir":"/proc/kmsg","is_active":"1","desc":"记录了核心输出的消息"},
    {"stype":"0","source_dir":"/proc/kallsyms","is_active":"1","desc":"记录了核心符号表"},
    {"stype":"0","source_dir":"/proc/loadavg","is_active":"1","desc":"记录了系统“平均负载”情况"},
    {"stype":"0","source_dir":"/proc/net/","is_active":"1","desc":"该文件所在文件夹下存放的是网络协议状态信息"},
    {"stype":"0","source_dir":"/proc/stat","is_active":"1","desc":"记录了手机系统状态"},
    {"stype":"0","source_dir":"/proc/uptim","is_active":"1","desc":"记录了系统启动的时间长度"},
    {"stype":"0","source_dir":"/sys/devices/","is_active":"1","desc":"该文件所在文件夹内的文件记录了所有被发现的注册在各种总线上的各种物理设备的记录文件"},
    {"stype":"0","source_dir":"/sys/dev/","is_active":"1","desc":"该文件所在文件夹内的文件记录了字符设备和块设备的主次号码（major：minor）"},
    {"stype":"0","source_dir":"/sys/class/","is_active":"1","desc":"该文件所在文件夹内的文件记录了注册在kernel里面的设备类型，并指向/sys/devices/name下的具体设备"},
    {"stype":"0","source_dir":"/sys/block/","is_active":"1","desc":"该文件所在文件夹内的文件记录了系统块设备"},
    {"stype":"0","source_dir":"/sys/bus/","is_active":"1","desc":"该文件所在文件夹内的文件记录了kernel支持并且已经注册了的总线类型"},
    {"stype":"0","source_dir":"/sys/fs/","is_active":"1","desc":"该文件所在文件夹内的文件记录了描述系统中所有的文件系统，包括文件系统本身和按照文件系统分类存放的已挂载点"},
    {"stype":"0","source_dir":"/sys/kernel/","is_active":"1","desc":"该文件所在文件夹内的文件记录了内核中所有可调整的参数"},
    {"stype":"0","source_dir":"/sys/firmware/","is_active":"1","desc":"该文件所在文件夹内的文件记录了系统加载固件的用户空间接口"},
    {"stype":"0","source_dir":"/sys/hypervisor/","is_active":"1","desc":"该文件所在文件夹内的文件记录了虚拟化Xen相关的装置信息"},
    {"stype":"0","source_dir":"/sys/module/","is_active":"1","desc":"该文件所在文件夹内的文件记录了被载入kernel的模块信息"},
    {"stype":"0","source_dir":"/sys/power/","is_active":"1","desc":"该文件所在文件夹内存放的是电源选项属性文件，这些文件可以控制机器的电源状态"},
    {"stype":"0","source_dir":"/system/etc/","is_active":"1","desc":"该文件所在文件夹内存放的是系统配置文件"},
    {"stype":"0","source_dir":"/system/bin/","is_active":"1","desc":"该文件所在文件夹内存放的是系统的本地程序，用户常用的工具程序"},
    {"stype":"0","source_dir":"/system/app/","is_active":"1","desc":"该文件所在文件夹内存放的是系统自带的应用程序"},
    {"stype":"0","source_dir":"/sys/","is_active":"1","desc":"该文件所在文件夹内的文件表示设备的结构.将设备的层次结构形象的反应到用户空间中"},
    {"stype":"0","source_dir":"/proc/","is_active":"1","desc":"该文件所在文件夹内的文件主要记录系统状态信息"},
    {"stype":"0","source_dir":"/etc/","is_active":"1","desc":"该文件所在文件夹内存放的是几乎所有的系统配置文件"}
];


    (function ($) {
    $.emul = {
        action: {
            id_indexs: null,
            behaviors: null,
            sysFiles:null,
            dangerAct:null,
            data: function () {
                return _EmulActionDic;
            }(),
            idData: function () {
                if (this.id_indexs == null) {
                    this.id_indexs = {};
                    var datas = _EmulActionDic;
                    var len = datas.length;
                    for (var i = 0; i < len; i++) {
                        this.id_indexs[datas[i].id] = i;
                    }
                }
                return this.id_indexs;
            }(),
            behaviorDic: function () {
                if (this.behaviors == null) {
                    this.behaviors = {};
                    // var reg = new RegExp('\\[(.+?)\\]',"gi");
                    var len = _EmulActionDic.length;
                    for (var j = 0; j < len; j++) {
                        // _EmulActionDic[j].format_std =  _EmulActionDic[j].format_std .replace(reg,"\\[(.+?)\\]");
                        // _EmulActionDic[j].format_trojan =  _EmulActionDic[j].format_trojan .replace(reg,"\\[(.+?)\\]");
                        this.behaviors[_EmulActionDic[j].id] = _EmulActionDic[j];
                    }
                }
                return this.behaviors;
            }(),
            sysFileDic: function () {
                if (this.sysFiles == null) {
                    this.sysFiles = {};
                    var len = _EmulSysFileDic.length;
                    for (var j = 0; j < len; j++) {
                        this.sysFiles[_EmulSysFileDic[j].source_dir] = _EmulSysFileDic[j];
                    }
                }
                return this.sysFiles;
            }(),
            dangerActDic:function () {
                if(this.dangerAct == null)
                {
                    this.dangerAct = {};
                    var len = _EmulDangerAct.length;
                    for (var j = 0; j < len; j++) {
                        this.dangerAct[_EmulDangerAct[j].id] = _EmulDangerAct[j];
                    }
                }
                return this.dangerAct;
            }()
        }
    }
})(jQuery);
