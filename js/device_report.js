//头定义
var _ReportTitleDefined = "手机安全评估报告";

var _CheckResultDefined = [
    {
        ResultType: "安全",
        ResultDesc: "被检测的移动终端设备没有存在恶意代码类型的APP应用软件，可以放心使用！"
    },
    {
        ResultType: "风险",
        ResultDesc: "被检测的移动终端设备上没有存在带有恶意代码的APP应用软件，但是检测到某些APP应用软件具有可能的敏感行为，主要体现是看似实现一些正常应用业务功能，但与该软件应用性质无关，具有主动获取用户部分隐私数据的行为，称为敏感行为。由于当前移动APP应用软件缺乏安全规范要求，因此，用户在使用这些APP应用的同时会存在用户的某些隐私数据被窃取，用户需要对这些APP应用保持警惕，如果用户想进一步详细了解这些APP应用中敏感行为的具体操作及内容，请使用专业版设备的恶代行为分析功能进行检测！"
    },
    {
        ResultType: "危险",
        ResultDesc: "被检测的移动终端设备上发现存在恶意代码类型的APP应用软件，这些恶意代码具备高危行为特征，可根据某种目的实现发送短信吸费、远程控制、本地监控、劫持用户手机及窃取隐私数据上传等恶意行为；这些恶意行为操作大部分处于后台运行，用户无法觉察；建议用户不要使用或慎用这些应用！"
    }];

/**
 * 界面初始化
 */
$(function () {
    $('#back-to-top').fadeOut(100);
    var app = new DeviceReport(REPORT_APP_DATA);
    app.init();
    showContent();
    $("a#print").click(function () {
        window.print();
    });
    $("#allMalCodeList").click(function () {
        app.showMoreMalCodeList();
    });
    $("#allMalActList").click(function () {
        app.showMoreMalActList();
    });
    $("#allPreInstallList").click(function () {
        app.showMorePreInstallList();
    });
    $("#back-to-top").click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });
    $(window).scroll(function(){
        if ($(window).scrollTop()>300){
            $("#back-to-top").fadeIn(300);
        }
        else
        {
            $("#back-to-top").fadeOut(300);
        }
    });
    $("#linkCloseWin").click(function () {
        window.close();
    });
});

/**
 * 数据分析完成，显示结果
 */
function showContent() {
    $("#divWait").hide();
    $("#divWrapper").css("visibility", "visible");
}

function DeviceReport(cfg) {
    //客户单位
    this.client_unit = "";
    //客户代码
    this.client_code = "";
    //检测单位
    this.check_unit = "";
    //探头版本号
    this.detector_version_code = 0;
    //设备ROM空间（单位：GB）
    this.device_space = 0;
    //SD卡空间（单位：GB）
    this.sdcard_space = 0;
    //设备内存（单位：GB）
    this.device_memery = 0;
    //品牌
    this.brand = "";
    //被检设备型号
    this.model = "";
    //是否root
    this.is_root = 0;
    //电话号码
    this.tel_number = "";
    //手机IMEI
    this.imei = "";


    //公司名称
    this.corp_name = "";
    //版权
    this.copyright = "";
    //应用所属系统类型 -> 0：Android  1：Apple
    this.os_type = 0;
    //应用总数
    this.app_count = 0;
    //应用库版本号
    this.app_virus_ver = 0;
    //行为库版本
    this.action_version = 0;
    //病毒引擎版本号
    this.virus3_ver = 0;
    //软件版本号
    this.soft_ver = 0;

    //恶意行为应用总数
    this.malaction_count = 0;
    //已删除的恶意行为(not EM + Action)
    this.delete_malaction_count = 0;
    //恶意代码应用总数
    this.malcode_count = 0;
    //已删除的恶意木马(EM + not Sys)
    this.delete_malcode_count = 0;
    //出厂预置应用总数(EM + Sys)
    this.sys_malcode_count = 0;
    //系统预置数
    this.sys_count = 0;
    //SD卡数
    this.user_count = 0;
    //用户安装数
    this.sd_count = 0;
    //开始时间（检测时间） yyyy-MM-dd HH:mm:ss
    this.start_time = "";
    //结束时间 yyyy-MM-dd HH:mm:ss
    this.end_time = "";
    //检测结果(0:安全 1:警惕 2:危险)
    this.check_result = 0;
    //检测结果描述
    this.desc_result = "";
    //应用列表
    this.apps = [];
    //数据拷贝
    $.extend(this, cfg);


    this.report_time = this.start_time.substr(0,10);
    //检测耗时
    this.time_consuming = "";
    //SD卡=>安装包
    this.appLevel = ["用户安装","系统预置", "安装包"];
    //是否删除
    this.isDelete = ["未处理", "已清除"]
    this.trojanLevel = ["安全", "敏感", "木马"];
    //应用操作系统
    this.osType = ["Android", "IOS", "WP"];
    //应用扩展名
    this.apkExts = ["apk", "ipa", "apk"];
    //应用数据列表
    this.app_datas = [];
    //表格计数器
    this.paging_take_count = 0;
    //默认分页行数
    this.paging_count = 10;
    //分组索引
    this.paging_group_index = 0;
    //文件更多显示固定行数
    this.more_file_fixed = 10;
    //出厂预装
    this.preInstallNum = 0;
    //恶意代码
    this.malCodeNum = 0;
    //恶意行为数
    this.malActionNum = 0;
    //正常
    this.safeNum = 0;
    //检测设备
    this.check_model = this.model;
    //设备系统
    this.device_os = this.osType[this.os_type] + " " + this.os_version;
    this.malCodeArr = [];
    this.malActionArr = [];
    this.safeArr = [];
    this.preInstallArr=[];
}

DeviceReport.prototype = {
    /*初始化*/
    init: function () {
        this.createReportHeader();
        this.createReportHeaderDate();
        this.createReportCheckResult();
        this.createReportCheck();
        this.initAppGroupData();
        //this.createReportFooterDate();
    },
    /**
     * 报表头
     */
    createReportHeader: function () {
        document.title = this.model +"-手机检测报告";
        $("#trpReportHeader").text(_ReportTitleDefined);
    },
    /**
     * 生成报表日期，客户信息
     */
    createReportHeaderDate: function () {
        //日期
        var htmlObj = $("#divReportCreateDate");
        htmlObj.html(this.replaceMatch(htmlObj.html(), this));
        //客户信息
        var clientHtmlObj = $("#reportClient");
        clientHtmlObj.html(this.replaceMatch(clientHtmlObj.html(), this));
    },
    /**
     * 检测结果
     */
    createReportCheckResult: function () {
        var htmlObj = $("#trpCheckResult");
        var vHtml = htmlObj.html();
        var my = this;
        htmlObj.html(this.replaceMatch(vHtml, {
            os_type: my.os_type,
            check_result: my.check_result,
            check_result_type: _CheckResultDefined[my.check_result].ResultType,
            check_result_desc: my.desc_result.replace(/\\n/g,'<br>'),
            check_result_sugg: _CheckResultDefined[my.check_result].ResultDesc
        }));
    },

    /**
     *综合信息
     */
    createReportCheck: function () {
        var leftHtmlObj = $("#leftInfo");
        var vHtml = leftHtmlObj.html();
        this.model = this.model;
        this.os_type =  this.osType[this.os_type] + "设备";
        leftHtmlObj.html(this.replaceMatch(vHtml, this));

        var rightHtmlObj = $("#rightInfo");
        var rHtml = rightHtmlObj.html();
        this.virus3_ver = formatVersion(this.virus3_ver);
        this.action_ver = formatVersion(this.action_ver);
        this.app_virus_ver = formatVersion(this.app_virus_ver);
        this.soft_ver = formatVersion(this.soft_ver);
        this.time_consuming = getDateTimeSpan(this.start_time, this.end_time);
        rightHtmlObj.html(this.replaceMatch(rHtml, this));
    },
    /**
     *应用类型分析
     **/
    initAppGroupData: function () {
        var my = this;
        var len = this.apps.length;
        //未删除的恶意代码
        var untreatedMalCodeNum = 0;
        //未删除的威胁应用
        var untreatedMalActNum = 0;
        //未删除出厂预装应用
        var untreatePreInstallNum = 0;
        for (var i = 0; i < len; i++) {
            var item = this.apps[i];
            if (item.safe_level == AppTrojanType.Safe) {
                this.safeNum++;
                this.safeArr.push(item);
            }
            else if (item.safe_level == AppTrojanType.MalCode && item.source_level != 1)//：恶意代码
            {
                this.malCodeNum++;
                this.malCodeArr.push(item);
                if (item.is_delete == 0)
                    untreatedMalCodeNum++;
            }
            else if (item.safe_level == AppTrojanType.MalAction && item.source_level != 1) {
                this.malActionNum++;
                this.malActionArr.push(item);
                if (item.is_delete == 0)
                    untreatedMalActNum++;
            }
            else {
                this.preInstallNum++;
                this.preInstallArr.push(item);
                if (item.is_delete == 0)
                    untreatePreInstallNum++;
            }
        }
        //恶意行为应用
        if (this.malCodeNum > 0) {
            var tmp = [];
            if (this.malCodeNum > this.more_file_fixed) {
                for (var i = 0; i < this.more_file_fixed; i++) {
                    tmp.push(this.malCodeArr[i]);
                }
            }
            else {
                tmp = this.malCodeArr;
            }
            var malCodeListHtmlStr = this.getReportAppList(tmp, true,0);
            var malCodeHtmlObj = $("#malCodeTable");
            malCodeHtmlObj.append(malCodeListHtmlStr);
            this.getMalCodeChart(this.malCodeNum, untreatedMalCodeNum);
            if (this.malCodeNum > this.more_file_fixed) {
                $("#allMalCodeList").show();
            }
            else
            {
                $("#allMalCodeList").hide();
            }
        }
        else {
            $("#divMalCode").hide();
        }

        //威胁应用
        if (this.malActionNum > 0) {
            var tmp2 = [];
            if (this.malActionNum > this.more_file_fixed) {
                for (var j = 0; j < this.more_file_fixed; j++) {
                    tmp2.push(this.malActionArr[j]);
                }
            }
            else {
                tmp2 = this.malActionArr;
            }
            var malActionListHtmlStr = this.getReportAppList(tmp2, true,0);
            var malActHtmlObj = $("#malActionTable");
            malActHtmlObj.append(malActionListHtmlStr);
            this.getMalActChart(this.malActionNum, untreatedMalActNum);
            if (this.malActionNum > this.more_file_fixed) {
                $("#allMalActList").show();
            }
            else
            {
                $("#allMalActList").hide();
            }
        }
        else {
            $("#divMalAct").hide();
        }

        //出厂预装
        if (this.preInstallNum> 0) {
            var tmp3 = [];
            if (this.preInstallNum > this.more_file_fixed) {
                for (var j = 0; j < this.more_file_fixed; j++) {
                    tmp3.push(this.preInstallArr[j]);
                }
            }
            else {
                tmp3 = this.preInstallArr;
            }
            var preInstallListHtmlStr = this.getReportAppList(tmp3, true,0);
            var preInstallHtmlObj = $("#preInstallTable");
            preInstallHtmlObj.append(preInstallListHtmlStr);
            this.getPreInstallChart(this.preInstallNum, untreatePreInstallNum);
            if (this.preInstallNum > this.more_file_fixed) {
                $("#allPreInstallList").show();
            }
            else
            {
                $("#allPreInstallList").hide();
            }
        }
        else {
            $("#divPreInstall").hide();
        }
    },
    /**
     * 加载全部恶意代码应用
     */
    showMoreMalCodeList: function () {
        var tmp = [];
        for (var i = this.more_file_fixed; i < this.malCodeNum; i++) {
            tmp.push(this.malCodeArr[i]);
        }
        var malCodeListHtmlStr = this.getReportAppList(tmp, true,this.more_file_fixed);
        var malCodeHtmlObj = $("#malCodeTable");
        malCodeHtmlObj.append(malCodeListHtmlStr);
        $("#allMalCodeList").hide();
    },
    /**
     * 加载全部威胁应用
     */
    showMoreMalActList: function () {
        var tmp = [];
        for (var i = this.more_file_fixed; i < this.malActionNum; i++) {
            tmp.push(this.malActionArr[i]);
        }
        var malActionListHtmlStr = this.getReportAppList(tmp, true,this.more_file_fixed);
        var malActHtmlObj = $("#malActionTable");
        malActHtmlObj.append(malActionListHtmlStr);
        $("#allMalActList").hide();
    },
    showMorePreInstallList: function () {
        var tmp = [];
        for (var i = this.more_file_fixed; i < this.preInstallNum; i++) {
            tmp.push(this.preInstallArr[i]);
        }
        var listHtmlStr = this.getReportAppList(tmp, true,this.more_file_fixed);
        var htmlObj = $("#preInstallTable");
        htmlObj.append(listHtmlStr);
        $("#allPreInstallList").hide();
    },

    /**
     *
     * @param malwareNum 恶意应用总数
     * @param untreatedNum 未删除总数
     */
    getMalCodeChart: function (malwareNum, untreatedNum) {
        var mes = "";
        if (untreatedNum == 0) {
            mes = "共发现" + malwareNum + "款恶意代码应用，已经全部删除。";
        }
        else {
            mes = "共发现" + malwareNum + "款恶意代码应用，其中有" + untreatedNum + "款未做清除处理。";
        }
        var malCodeChartHtmlObj = $("#malCodeChart");
        var malCodeChartHtml = malCodeChartHtmlObj.html();
        malCodeChartHtmlObj.html(this.replaceMatch(malCodeChartHtml, {
            malCodeDetail: mes,
            malCodeDes: AppTrojanDes.MalCode
        }));
        var eyPie = echarts.init(document.getElementById('eypie'));
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: 0,
                formatter:function(value)
                {
                    if(value == "已清除")
                      return "{a|"+value +"\n"+(malwareNum - untreatedNum)+"}";
                    else
                        return "{a|"+value + "\n"+untreatedNum+"}";
                },
                textStyle:{
                    color:"auto",
                    rich:{
                        a:{
                            fontWeight:"bold",
                            lineHeight:18,
                            align:"center"
                        }
                    }
                },
                data: [{
                    name: "已清除",
                    icon: 'circle'
                }, {
                    name: "未处理",
                    icon: 'circle'
                }]
            },
            color: ["#5874c8", "#f44336"],

            series: [{
                name: '清除情况',
                type: 'pie',
                radius: '55%',
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }

                },
                center: ['50%', '50%'],
                data: [
                    {
                        value: malwareNum - untreatedNum,
                        name: '已清除'
                    },
                    {
                        value: untreatedNum,
                        name: '未处理'
                    }
                ]
            }]
        };
        eyPie.setOption(option);
    },
    /**
     *
     * @param malwareNum 威胁行为应用总数
     * @param untreatedNum 未删除总数
     */
    getMalActChart: function (malwareNum, untreatedNum) {
        var mes = "";
        if (untreatedNum == 0) {
            mes = "共发现" + malwareNum + "款具有威胁行为应用，已经全部删除。";
        }
        else {
            mes = "共发现" + malwareNum + "款具有威胁行为应用，其中有" + untreatedNum + "款未做清除处理。";
        }
        var malActChartHtmlObj = $("#malActChart");
        var malActChartHtml = malActChartHtmlObj.html();
        malActChartHtmlObj.html(this.replaceMatch(malActChartHtml, {
            malActDetail: mes,
            malActDes: AppTrojanDes.MalAction
        }));
        var wxpie = echarts.init(document.getElementById('wxpie'));
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: 0,
                formatter:function(value)
                {
                    if(value == "已清除")
                        return "{a|"+value +"\n"+(malwareNum - untreatedNum)+"}";
                    else
                        return "{a|"+value + "\n"+untreatedNum+"}";
                },
                textStyle:{
                    color:"auto",
                    rich:{
                        a:{
                            fontWeight:"bold",
                            lineHeight:18,
                            align:"center"
                        }
                    }
                },
                data: [{
                    name: "已清除",
                    icon: 'circle'
                }, {
                    name: "未处理",
                    icon: 'circle'
                }]
            },
            color: ["#5874c8", "#ff9800"],

            series: [{
                name: '清除情况',
                type: 'pie',
                radius: '55%',
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }

                },
                center: ['50%', '50%'],
                data: [
                    {
                        value: malwareNum - untreatedNum,
                        name: '已清除'
                    },
                    {
                        value: untreatedNum,
                        name: '未处理'
                    }
                ]
            }]
        };
        wxpie.setOption(option);
    },

    /**
     *
     */
    getPreInstallChart: function (malwareNum, untreatedNum) {
        var mes = "";
        if (untreatedNum == 0) {
            mes = "共发现" + malwareNum + "款具有威胁行为的系统预置应用，已经全部删除。";
        }
        else {
            mes = "共发现" + malwareNum + "款具有威胁行为的系统预置应用，其中有" + untreatedNum + "款未做清除处理。";
        }
        var chartHtmlObj = $("#preInstallChart");
        var chartHtml = chartHtmlObj.html();
        chartHtmlObj.html(this.replaceMatch(chartHtml, {
            malActDetail: mes,
            malActDes: AppTrojanDes.PreInstallAction
        }));
        var prepie = echarts.init(document.getElementById('prepie'));
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: 0,
                formatter:function(value)
                {
                    if(value == "已清除")
                        return "{a|"+value +"\n"+(malwareNum - untreatedNum)+"}";
                    else
                        return "{a|"+value + "\n"+untreatedNum+"}";
                },
                textStyle:{
                    color:"auto",
                    rich:{
                        a:{
                            fontWeight:"bold",
                            lineHeight:18,
                            align:"center"
                        }
                    }
                },
                data: [{
                    name: "已清除",
                    icon: 'circle'
                }, {
                    name: "未处理",
                    icon: 'circle'
                }]
            },
            color: ["#5874c8", "#ff9800"],

            series: [{
                name: '清除情况',
                type: 'pie',
                radius: '55%',
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }

                },
                center: ['50%', '50%'],
                data: [
                    {
                        value: malwareNum - untreatedNum,
                        name: '已清除'
                    },
                    {
                        value: untreatedNum,
                        name: '未处理'
                    }
                ]
            }]
        };
        prepie.setOption(option);
    },

    /**
     * 生成datatable
     */
    getReportAppList: function (datas, isLoadNullHeader,defaultIndex) {
        if (!isLoadNullHeader && (datas == null || datas.length == 0))
            return "";
        //表头
        var htmlArr = [];
        //内容
        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            htmlArr.push('<tr>');
            htmlArr.push('<td>' + (i + 1 + defaultIndex) + '</td>');
            htmlArr.push('<td >' + '<img style="width: 30px" src="apps/'+item.report_dir_name+'/res/ico.png"  onerror="this.src=\'img/default.png\'"/>' + '</td>');
            htmlArr.push('<td><a target="_blank" href="' + this.getAppActionReportFilePath(item.report_dir_name) + '" >' + item.app_name + '</a></td>');
            htmlArr.push('<td>' + item.app_ver_name + '</td>');
            htmlArr.push('<td>' + item.app_pkg_name + '</td>')
            htmlArr.push('<td>' + this.getAppFileSize(item.file_size) + '</td>');
            htmlArr.push('<td>' + this.appLevel[item.source_level] + '</td>');
            htmlArr.push('<td style="color:'+(item.is_delete==0?"#768ea8":"#008000")+'">' + this.isDelete[item.is_delete] + '</td>');
            htmlArr.push('</tr>');
        }
        return htmlArr.join('');
    },
    getAppActionReportFilePath: function (dirName) {
        return "apps/" + dirName + "/report.html";
    }
    ,
    getAppFileSize: function (appByts) {
        var mb = 1024 * 1024;
        if (appByts > mb) {
            var bb = appByts / (1024 * 1024);
            bb = bb.toFixed(2);
            return bb + "M";
        }
        var bk = appByts / 1024;
        bk = bk.toFixed(1);
        return bk + "K";
    }
    ,
    replaceMatch: function (text, obj) {
        return text.replace(/\[[@!]([^\]!@]+)\]/g,
            function (match, key) {
                if (obj[key] == 0) return obj[key];
                return obj[key] || "";
            });
    },
}
;


var AppTrojanType = {
    UnKnow: 0,
    Safe: 1,
    MalAction: 2,
    MalCode: 3
};
var AppTrojanDes = {
    MalCode: "具备多种恶意行为权限的应用可根据特定需求实现各种不可告人的事件，如窃取隐私内容，如短信内容、通讯录、" +
    "通话记录、录音、拍照、GPS位置等个人信息；更加严重的恶意行为能够拦截短信、隐蔽监听通话、隐蔽发送短信、扫描本地内存卡敏感文件等操作；" +
    "这些恶意行为的实现过程大部分基于后台运行，也不会在应用程序界面任何地方告知用户，绝大部分用户均无法觉察。强烈建议清除！",
    MalAction: "具备敏感行为的应用能够读取用户相关隐私信息，其具有多种威胁类型的的行为权限，能够实现各种" +
    "敏感行为，如读取手机号码、通讯录，拦截或监控短信、监控通话，甚至能够录音和拍照；部分主流" +
    "或热门移动应用为实现一些正常业务功能执行了以上各种高威胁的行为（不管是否显式告知用户）；" +
    "但是，这些威胁行为已经涉及到用户隐私数据，并且在后期可以根据特殊需求需要，非常容易实现将" +
    "这些隐私数据外传，这种应用属于潜在威胁类型应用，必须保持高度警惕。",
    PreInstallAction: "预置威胁行为的应用，是属于手机系统内置预安装的应用程序；这些应用具备高级别的系统权限，" +
    "能够读取用户手机相关隐私信息，如果预置应用具备恶意性质，则可以不需要通过用户授权，实现各种恶意行为，" +
    "如窃取手机号码、通讯录，拦截或监控短信、监控通话，甚至能够后台录音和拍照；并且，如果存在不可告人目的，" +
    "非常容易实现将这些隐私数据外传，请务必保持高度警惕，建议你禁用或卸载这个应用程序，或者升级官方ROM系统。"
};