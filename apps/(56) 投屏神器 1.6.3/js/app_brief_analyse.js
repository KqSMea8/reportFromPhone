//头定义
var _ReportTitleDefined = "手机应用安全评估报告";

var _AnlyseResultDefined = [
    {
        ResultType: "安全应用",
        ResultDesc: "安全的应用大部分具备常规普通权限，一般均具备自身实现的功能业务权限，对于可能涉及到隐私方面权限，应用会在运行过程显式告知并询问用户；绝大部分应用均属于这种类型。"
    },
    {
        ResultType: "威胁行为应用",
        ResultDesc: "具备威胁行为的应用能够读取用户相关隐私信息，其具有多种威胁类型的的行为权限，能够实现各种敏感行为，如读取手机号码、通讯录，拦截或监控短信、监控通话，甚至能够录音和拍照；部分主流或热门移动应用为实现一些正常业务功能执行了以上各种高威胁的行为（不管是否显式告知用户）；但是，这些威胁行为已经涉及到用户隐私数据，并且在后期可以根据特殊需求需要，非常容易实现将这些隐私数据外传，这种应用属于潜在威胁类型应用，必须保持高度警惕。"
    },
    {
        ResultType: "恶意代码应用",
        ResultDesc: "具备多种恶意行为权限的应用可根据特定需求实现各种不可告人的事件，如窃取隐私内容，如短信内容、通讯录、通话记录、录音、拍照、GPS位置等个人信息；更加严重的恶意行为能够拦截短信、隐蔽监听通话、隐蔽发送短信、扫描本地内存卡敏感文件等操作；这些恶意行为的实现过程大部分基于后台运行，也不会在应用程序界面任何地方告知用户，绝大部分用户均无法觉察。强烈建议清除！"
    },
    {
        ResultType: "手机预置潜在风险应用",
        ResultDesc: "预置威胁行为的应用，是属于手机系统内置预安装的应用程序；这些应用具备高级别的系统权限，" +
        "能够读取用户手机相关隐私信息，如果预置应用具备恶意性质，则可以不需要通过用户授权，实现各种恶意行为，" +
        "如窃取手机号码、通讯录，拦截或监控短信、监控通话，甚至能够后台录音和拍照；并且，如果存在不可告人目的，" +
        "非常容易实现将这些隐私数据外传，请务必保持高度警惕，建议你禁用或卸载这个应用程序，或者升级官方ROM系统。"
    }
];
var _ReportPackageDescript = {
    "com.netease.news": "该应用属于特洛伊木马，极度危险！应用被嵌入恶意代码，实现隐蔽接收（隐蔽拦截）短信指令并执行现隐私信息窃取，窃取通讯录、通话记录、短信收件箱；根据指令执行隐蔽拍照和现场录音，并回传到远程服务器。用户安装这个应用后会导致自己和周围深层次隐私内容泄露！",
    "com.mj.icalendar": "该应用属于恶意吸费木马，应用内嵌恶意吸费代码，实现运行过程中隐蔽发送SP号码，导致恶意扣费。安装这个应用会导致大量消耗手机资费。",
    "com.example.xxshenqi": "该应用属于蠕虫类型病毒，应用通过伪装和欺骗方式实现传播；应用的恶意代码实现读取通讯录并群发短信，大量消耗用户资费；并窃取用户隐私信息回传远程服务器；该应用最危险的行为是将中毒手机转为“肉鸡”手机，隐蔽接管中毒手机短信交互，而用户仍然不知道；安装这个应用汇导致用户敏感隐私泄露和涉及风险欺骗。"
};
/**
 * 界面初始化
 */
$(function () {
    $('#back-to-top').fadeOut(100);
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $("#back-to-top").fadeIn(300);
        }
        else {
            $("#back-to-top").fadeOut(300);
        }
    });
    //初始化数据
    var app = new DeviceReport(REPORT_APP_DATA);
    app.init();
    //显示正文
    showContent();
    //打印
    $("a#print").click(function () {
        window.print();
    });
    //显示全部
    $("#allDomainCodeList").click(function () {
        app.showAllDomainList();
    });
    $("#allIpCodeList").click(function () {
        app.showAllIpList();
    });
    $("#allSysFileCodeList").click(function () {
        app.showAllSysFileList();
    });
    $("#allPermissionCodeList").click(function () {
        app.showAllPermissionList();
    });
    $("#linkCloseWin").click(function () {
        window.close();
    });
    //返回顶部
    $("#back-to-top").click(function () {
        $('body,html').animate({scrollTop: 0}, 1000);
        return false;
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
    //应用的MD5码
    this.app_md5 = "";
    //文件的MD5码
    this.file_md5 = "";
    //文件大小(字节)
    this.file_size = "";
    //应用名称
    this.app_name = "";
    //应用包名
    this.app_pkg_name = "";
    //应用版本名称
    this.app_ver_name = "";
    //应用版本编号
    this.app_ver_code = "";
    //应用签名
    this.app_sign = "";
    //应用所属系统类型 0：Android  1：Apple
    this.os_type = 0;
    //数据来源路径
    this.source_dir = "";
    //数据来源位置等级 -> 0：出厂预置  1：用户安装  2：安装文件
    this.source_level = 0;
    //安全等级 -> 1：安全  2：威胁行为 3：恶意代码
    this.safe_level = 1;

    //恶意代码时，EM的返回结果
    this.safe_level_result = "";
    //安全等级的专用描述
    this.safe_level_desc = "";

    //扩展信息列表
    this.exts = [];
    // 动态行为列表
    this.actions = [];
    //合并数据
    $.extend(this, cfg);

    //报表生成日期
    this.report_time = this.start_time.substr(0, 10);
    //权限列表
    this.permissions = [];
    //窗体列表
    this.activities = [];
    //服务列表
    this.services = [];
    //广播列表
    this.receivers = [];

    //危险行为
    this.action_dangers = [];
    //域名访问
    this.action_domains = [];
    //访问IP
    this.action_ips = [];
    //操作系统文件
    this.action_oper_sys_files = [];

    //应用顺序号
    this.app_index = 0;

    //SD卡=>安装包
    this.appLevel = ["系统预置", "用户安装", "安装包"];
    //敏感级别
    this.sensitiveLevel = ["普通", "敏感", "高危"];
    //应用操作系统
    this.osType = ["Android", "IOS", "WP"];
    //应用扩展名
    this.apkExts = ["apk", "ipa", "apk"];
    //特殊包(演示用)
    this.apkPackages = ["com.netease.news", "com.mj.icalendar", "com.example.xxshenqi"];
    //行为字典表
    this.behaviorDic = $.emul.action.behaviorDic;
    //系统文件类型
    this.sysFileTypeDic = $.emul.action.sysFileDic;
    //危险行为列表
    this.dangerActionDic = $.emul.action.dangerActDic;
    //应用大小(由字节转化为M)
    this.app_file_size = this.getAppFileSize(this.file_size);
    //默认图标
    this.app_default_icon = "onDefaultApkIcon(this)";
    //安全评估结果
    this.assess_result = _AnlyseResultDefined[this.safe_level - 1].ResultType;
    //应用分析简报
    this.app_brief_report = this.getAnlyseBriefReportHtml(this.is_emul);
    //应用分析详报
    this.app_detail_report = this.getAnlyseDetailReportHtml(this.is_emul);
    //应用操作系统
    this.app_os_type = this.osType[this.os_type];
    //文件标题
    this.app_file_size_title = this.getAppFileSizeTitle(this.file_size);

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
}

DeviceReport.prototype = {
    /*初始化*/
    init: function () {
        if (this.source_level == 1) {
            this.assess_result = _AnlyseResultDefined[3].ResultType;
        }
        else
            this.assess_result = _AnlyseResultDefined[this.safe_level - 1].ResultType;
        this.createReportHeader();
        this.createReportHeaderDate();
        this.initAppData();
        this.createReportCheckResult();
        this.createAppInfo();
        this.createDangerInfo();
        this.createDomainDataGrid();
        this.createIPDataGrid();
        this.createSysFileDataGrid();
        this.createPermissionDataGrid();
    },
    /**
     * 报表头
     */
    createReportHeader: function () {
        document.title = this.app_name + "-应用评估报告";
        $("#trpReportHeader").text(_ReportTitleDefined);
    },
    /**
     * 生成报表日期，客户信息
     */
    createReportHeaderDate: function () {
        //日期
        var htmlObj = $("#divReportCreateDate");
        htmlObj.html(this.replaceMatch(htmlObj.html(), this));
    },
    /*分析、重组数据*/
    initAppData: function () {
        //
        this.analysisExts();
        //
        this.analysisActions();
    }
    ,
    /**
     * 评估结果
     */
    createReportCheckResult: function () {
        var htmlObj = $("#divMalCode");
        var vHtml = htmlObj.html();
        var my = this;
        if (my.source_level == 1) {
            htmlObj.html(this.replaceMatch(vHtml, {
                safe_level: 4,
                assess_result: my.assess_result,
                app_name: my.app_name,
                check_result_sugg: _AnlyseResultDefined[3].ResultDesc
            }));
        }
        else {
            htmlObj.html(this.replaceMatch(vHtml, {
                safe_level: my.safe_level,
                assess_result: my.assess_result,
                app_name: my.app_name,
                check_result_sugg: _AnlyseResultDefined[my.safe_level - 1].ResultDesc
            }));
        }
        //图表
        var eyBar = echarts.init(document.getElementById('appInfoChart'));
        var option = {
            title: {
                left: 'center',
                text: '应用安全信息统计',

            },
            color: ['#3398DB'],
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '13%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['危险行为', '访问域名', '访问IP', '关键文件', '权限行为'],
                    axisLabel: {
                        internal: 0,
                        rotate: 50
                    },
                }
            ],
            yAxis: [
                {
                    name: '数量',
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    barWidth: '50%',
                    data: [this.action_dangers.length, this.action_domains.length, this.action_ips.length, this.action_oper_sys_files.length, this.permissions.length]
                },
                {
                    type: 'line',
                    smooth: 'true',
                    smoothMonotone: 'x',
                    alpha: '0.6',
                    sampling: 'average',
                    tooltip: {
                        show: false
                    },
                    lineStyle: {
                        normal: {
                            opacity: 0
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.2
                        }
                    },
                    data: [this.action_dangers.length, this.action_domains.length, this.action_ips.length, this.action_oper_sys_files.length, this.permissions.length]
                }

            ]
        };
        eyBar.setOption(option);
    },

    /**
     *样本信息
     */
    createAppInfo: function () {
        var infoHtmlObj = $("#appInfo");
        if (this.app_sign == "") {
            $("#app_sign").hide();
        }
        var vHtml = infoHtmlObj.html();
        this.os_type = this.osType[this.os_type] + "设备";
        infoHtmlObj.html(this.replaceMatch(vHtml, this));
    },
    /*危险行为*/
    createDangerInfo: function () {
        if (this.action_dangers.length == 0) {
            $("#divDangerPanel").hide();
        }
        else {
            var my = this;
            var htmlObj = $("#dangerActPanelHeader");
            var vHtml = htmlObj.html();
            var desc = "";
            if (this.safe_level == 2)//威胁行为
                desc = "高威胁";
            else if (this.safe_level == 3)//恶意代码
                desc = "恶意代码";
            htmlObj.html(this.replaceMatch(vHtml, {total: this.action_dangers.length, mes: desc}));
            var dangerHtmlArray = [];
            this.action_dangers.forEach(function (value) {
                var actionDesc = "";
                dangerHtmlArray.push('<div class="title_list_cell">');
                dangerHtmlArray.push('<h5 class="danger'+ value.threshold + '">' + value.title + '<img src="img/' + value.threshold + '.png" style="float: right;vertical-align: middle;margin-right: 21px;margin-top: 7px"></h5>');
                if (value.contents && value.contents.length > 0) {
                    dangerHtmlArray.push('<ul>');
                }
                for (i = 0; i < value.contents.length; i++)
                    dangerHtmlArray.push('<li>' + value.contents[i] + '</li>');
                if (value.contents && value.contents.length > 0) {
                    dangerHtmlArray.push('</ul>');
                }
                if (my.safe_level == 2)//威胁行为
                    actionDesc = value.desc.replace(/\[|\]/g, "");
                else
                    actionDesc = value.desc.replace(/\[.*\]/g, "");
                dangerHtmlArray.push('<p>' + actionDesc + '</p>');
                dangerHtmlArray.push('</div>');
            });
            var dangerHtmlStr = dangerHtmlArray.join('');
            $("#dangerListHtml").html(dangerHtmlStr);
        }
    }
    ,
    /*网络访问域名列表*/
    createDomainDataGrid: function () {
        this.getPanelHtml(this.action_domains, $("#domainTableHeader"), ["label", "ip", "addr"], $("#allDomainCodeList"), $("#domainDatagrid"), $("#divDomainPanel"), {
            total: this.action_domains.length
        });
    }
    ,
    /*网络访问IP列表*/
    createIPDataGrid: function () {
        this.getPanelHtml(this.action_ips, $("#ipTableHeader"), ["ip", "addr"], $("#allIpCodeList"), $("#ipDatagrid"), $("#divIPPanel"), {
            total: this.action_ips.length
        });
    }
    ,
    /*系统文件操作*/
    createSysFileDataGrid: function () {
        this.action_oper_sys_files.forEach(function (value) {
            var opers = value.oper;
            var opersCN = [];
            if (opers.indexOf(10300) > -1) opersCN.push("读取");
            if (opers.indexOf(10310) > -1) opersCN.push("写入");
            if (opers.indexOf(10320) > -1) opersCN.push("删除");
            value.operCN = opersCN.join("|");
        });
        this.getPanelHtml(this.action_oper_sys_files, $("#divSysTableHeader"), ["filePath", "operCN", "fileDesc"], $("#allSysFileCodeList"), $("#sysFileDatagrid"), $("#divSysFilePanel"), {
            total: this.action_oper_sys_files.length
        });
    }
    ,
    /*权限行为*/
    createPermissionDataGrid: function () {
        var warnNum = 0;
        var dangerNum = 0;
        this.permissions.forEach(function (value) {
            var safe_level = value.safe_level;
            if (safe_level == 0) value.safeName = "安全";
            else if (safe_level == 1) {
                value.safeName = "警惕";
                warnNum++;
            }
            else if (safe_level == 2) {
                value.safeName = "危险";
                dangerNum++;
            }
            //取消列表中的颜色标识
            value.safe_level = 0;
        });
        this.getPanelHtml(this.permissions, $("#divPermissionTableHeader"), ["ext_id", "ext_name", "safeName"], $("#allPermissionCodeList"), $("#permissionDatagrid"), $("#divPermissionPanel"), {
            total: this.permissions.length,
            warn: warnNum,
            danger: dangerNum
        });
    }
    ,
    /**
     * 加载全部域名访问地址
     */
    showAllDomainList: function () {
        this.getAllListHtml(this.action_domains, ["label", "ip", "addr"], $("#domainDatagrid"), $("#allDomainCodeList"));
    },
    /**
     * 加载全部IP访问地址
     */
    showAllIpList: function () {
        this.getAllListHtml(this.action_ips, ["ip", "addr"], $("#ipDatagrid"), $("#allIpCodeList"));
    },
    /**
     * 加载全部系統文件操作
     */
    showAllSysFileList: function () {
        this.getAllListHtml(this.action_oper_sys_files, ["filePath", "operCN", "fileDesc"], $("#sysFileDatagrid"), $("#allSysFileCodeList"));
    },
    /**
     * 加载全部权限行为信息
     */
    showAllPermissionList: function () {
        this.getAllListHtml(this.permissions, ["ext_id", "ext_name", "safeName"], $("#permissionDatagrid"), $("#allPermissionCodeList"));
    },
    /**
     *
     * @param datas  列表数据源
     * @param divTableHeader 模块头
     * @param columnsDataField 取列表的数据字段数组
     * @param allCodeList 显示全部按钮
     * @param datagrid Table的id
     * @param divPanel 模块id
     */
    getPanelHtml: function (datas, divTableHeader, columnsDataField, allCodeList, datagrid, divPanel, formateObj) {
        if (datas.length > 0) {
            var htmlObj = divTableHeader;
            var vHtml = htmlObj.html();
            htmlObj.html(this.replaceMatch(vHtml, formateObj));

            var tmp2 = [];
            if (datas.length > this.more_file_fixed) {
                for (var j = 0; j < this.more_file_fixed; j++) {
                    tmp2.push(datas[j]);
                }
            }
            else {
                tmp2 = datas;
            }
            var tableRowsHtmlStr = this.getReportAppTableRows(tmp2, columnsDataField, true, 0);
            var tableHtmlObj = datagrid;
            tableHtmlObj.append(tableRowsHtmlStr);
            if (datas.length > this.more_file_fixed) {
                allCodeList.show();
            }
            else {
                allCodeList.hide();
            }
        }
        else {
            divPanel.hide();
        }
    },
    getAllListHtml: function (datas, columnsDataField, datagrid, allCodeList) {
        var tmp = [];
        for (var i = this.more_file_fixed; i < datas.length; i++) {
            tmp.push(datas[i]);
        }
        var tableHtmlStr = this.getReportAppTableRows(tmp, columnsDataField, true, this.more_file_fixed);
        var tableHtmlObj = datagrid;
        tableHtmlObj.append(tableHtmlStr);
        allCodeList.hide();
    },
    /**
     * 生成Table行信息
     * @param datas 数据源
     * @param columnDataFields 列数据filed[]
     * @param isLoadNullHeader
     * @param defaultIndex 行数起始
     * @returns {*}
     */
    getReportAppTableRows: function (datas, columnDataFields, isLoadNullHeader, defaultIndex) {
        if (!isLoadNullHeader && (datas == null || datas.length == 0))
            return "";
        //是否有级别字段
        var hasSafeField = columnDataFields.indexOf("safeName") > -1 ? true : false;
        //表头
        var htmlArr = [];
        //内容
        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            var className = "td-text-color-0";
            if (item.hasOwnProperty("safe_level")) {
                var safe_level = item.safe_level;
                if (safe_level == 0) {
                    className = "td-text-color-0";
                }
                else if (safe_level == 1) {
                    className = "td-text-color-1";
                }
                else if (safe_level == 2) {
                    className = "td-text-color-2";
                }
            }
            htmlArr.push("<tr>");
            if (!hasSafeField)
                htmlArr.push("<td class='" + className + "'>" + (i + 1 + defaultIndex) + " </td>");
            else
                htmlArr.push("<td class='td-text-color-0'>" + (i + 1 + defaultIndex) + " </td>");
            for (var j = 0; j < columnDataFields.length; j++) {
                if (!hasSafeField)
                    htmlArr.push("<td class='" + className + "'>" + item[columnDataFields[j]] + " </td>");
                else {
                    if (columnDataFields[j] == 'safeName')
                        htmlArr.push("<td class='" + className + "'>" + item[columnDataFields[j]] + " </td>");
                    else
                        htmlArr.push("<td class='td-text-color-0'>" + item[columnDataFields[j]] + " </td>");
                }
            }
            htmlArr.push("</tr>");
        }
        return htmlArr.join('');
    },
    /*解析扩展信息列表*/
    analysisExts: function () {
        var permissionsSafe = [], permissionsWarn = [], permissionsDanger = [],
            activitiesSafe = [], activitiesWarn = [], activitiesDanger = [],
            servicesSafe = [], servicesWarn = [], servicesDanger = [],
            receiversSafe = [], receiversWarn = [], receiversDanger = [];
        var orderLevel = function (item, danger, warn, safe) {
            if (item.safe_level == 2) {
                danger.push(item);
            }
            else if (item.safe_level == 1) {
                warn.push(item);
            }
            else {
                safe.push(item);
            }
        }
        this.exts.forEach(function (item, index) {
            //0：权限 Permission
            if (item.ext_type == 0) {
                orderLevel(item, permissionsDanger, permissionsWarn, permissionsSafe);
            }
            //1：界面 Activitie
            else if (item.ext_type == 1) {
                orderLevel(item, activitiesDanger, activitiesWarn, activitiesSafe);
            }
            //2：服务 Service
            else if (item.ext_type == 1) {
                orderLevel(item, servicesDanger, servicesWarn, servicesSafe);
            }
            //3：接收器 Receiver
            else if (item.ext_type == 1) {
                orderLevel(item, receiversDanger, receiversWarn, receiversSafe);
            }
        });
        //组装扩展信息
        this.permissions = permissionsDanger.concat(permissionsWarn).concat(permissionsSafe);
        this.activities = activitiesDanger.concat(activitiesWarn).concat(activitiesSafe);
        this.services = servicesDanger.concat(servicesWarn).concat(servicesSafe);
        this.receivers = receiversDanger.concat(receiversWarn).concat(receiversSafe);
    },
    /*解析行为信息列表*/
    analysisActions: function () {
        var behavior = {};
        var dangerActObj = {};
        var actionType;
        var my = this;
        var formatereg = new RegExp("\\[(.+?)\\]", "gi");
        //是否在数据中已经存在了此系统文件操作信息
        var hasSysFile = function (filePath) {
            var item = null;
            my.action_oper_sys_files.forEach(function (value) {
                if (value.filePath == filePath)//已经存在
                {
                    value.num++;
                    item = value;
                }
            });
            return item;
        };
        //判断是否已经包含此域名
        var hasDomain = function (domain) {
            var item = null;
            my.action_domains.forEach(function (value) {
                if (value.label == domain)//已经存在
                {
                    value.num++;
                    item = value;
                }
            });
            return item;
        };
        //判断是否已经有IP存在
        var hasIP = function (ip) {
            var item = null;
            my.action_ips.forEach(function (value) {
                if (value.ip == ip)//已经存在
                {
                    value.num++;
                    item = value;
                }
            });
            return item;
        };
        //判断是否已经有相应的危险行为
        var hasDangerAct = function (dangerTitle) {
            var item = null;
            my.action_dangers.forEach(function (value) {
                if (value.title == dangerTitle)//已经存在
                {
                    value.num++;
                    item = value;
                }
            });
            return item;
        }

        //遍历数据
        this.actions.forEach(function (item) {
            //由于10030有可能包含10831数据，需要分析处理
            if (item.action_id == 10030 && item.sshow.indexOf("邮件发送") == 0) {
                item.action_id = 10831;
            }
            //行为字典
            behavior = my.behaviorDic[item.action_id];
            //危险行为
            dangerActObj = my.dangerActionDic[item.action_id];
            if (dangerActObj) {
                var dangerItem = hasDangerAct(dangerActObj.title);
                if (dangerItem == null) {
                    my.action_dangers.push({
                        title: dangerActObj.title,
                        contents: dangerActObj.action == "1" ? [item.sshow] : [],
                        safe_level: item.safe_level,
                        desc: dangerActObj.desc,
                        threshold: dangerActObj.threshold,
                        order: dangerActObj.order,
                        num: 1
                    });
                } else {
                    if (dangerActObj.action == "1")
                        dangerItem.contents.push(item.sshow);
                }
            }
            actionType = behavior.action_type;
            item.behavior = behavior;
            // behavior.format_trojan == " " ? new RegExp(behavior.format_std,"gi"):new RegExp(behavior.format_trojan,"gi"); 由于没有统一，所以暂时取消
            var content = item.sshow;
            if (actionType == "网络") {
                //首先把格式化里面的数据找出来.
                var match = content.match(formatereg);
                for (regkey in match) {
                    if (!isNaN(regkey) && parseInt(regkey) == 0) {
                        //对内容进行IP和域名验证
                        var ip = my.regularIP(match[regkey]);
                        if (ip != "null") {
                            var tmpIp = hasIP(ip[1]);
                            if (tmpIp == null)
                                if (item.safe_level == 1) {
                                    my.action_ips.unshift({
                                        ip: ip[1],
                                        addr: ip[2],
                                        safe_level: item.safe_level == 1 ? 2 : 0,
                                        num: 1
                                    });
                                }
                                else {

                                    my.action_ips.push({
                                        ip: ip[1],
                                        addr: ip[2],
                                        safe_level: item.safe_level == 1 ? 2 : 0,
                                        num: 1
                                    });
                                }

                        }
                        var domain = my.regularUrl(match[regkey]);
                        if (domain != "null") {
                            var tmpDomain = hasDomain(domain[1]);
                            if (tmpDomain == null)
                                if (item.safe_level == 1) {
                                    my.action_domains.unshift({
                                        label: domain[1],
                                        ip: domain[2],
                                        addr: domain[3],
                                        safe_level: item.safe_level == 1 ? 2 : 0,
                                        num: 1
                                    });
                                }
                                else {
                                    my.action_domains.push({
                                        label: domain[1],
                                        ip: domain[2],
                                        addr: domain[3],
                                        safe_level: item.safe_level == 1 ? 2 : 0,
                                        num: 1
                                    });
                                }

                        }
                    }
                }
            }
            else if (actionType == "文件相关") {
                //找出格式化的数据项
                var fileMatch = content.match(formatereg);
                var filePath;
                for (filekey in fileMatch) {
                    if (!isNaN(filekey) && parseInt(filekey) > 0) {
                        filePath = fileMatch[filekey];
                        filePath = filePath.substr(1, filePath.length - 2);
                        if (filePath.indexOf("/") > -1) {
                            // console.log(filePath);
                            var fileObj = my.sysFileTypeDic[filePath];
                            if (fileObj)//如果路径存在，表示是操作了系统文件
                            {
                                var fileItem = hasSysFile(filePath);
                                if (fileItem) {
                                    if (fileItem.oper.indexOf(item.action_id) == -1)
                                        fileItem.oper.push(item.action_id);
                                }
                                else {
                                    var obj = {
                                        filePath: fileObj.source_dir,
                                        fileDesc: fileObj.desc,
                                        fileType: fileObj.stype,
                                        oper: [item.action_id],
                                        num: 1
                                    }
                                    my.action_oper_sys_files.push(obj);
                                }
                            }
                        }
                    }
                }
            }
        });
        //对危险行为数据排序
        this.action_dangers.sort(
            function (a, b) {
                if (a.order < b.order) return -1;
                if (a.order > b.order) return 1;
                return 0;
            }
        );
    }
    ,
    /**
     * ip+地址正则匹配
     * @param value
     * @returns {Array|{index: number, input: string}}
     * 此处如果匹配正常，那么就是一个长度为3的数组 0：整个数据 1：匹配的ip 2：匹配的地理位置
     */
    regularIP: function (value) {
        var ipReg = /((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)(?:\.)){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))\((.*)\)/gi;
        var ip = ipReg.exec(value);
        ip = ip || 'null';
        return ip;
    }
    ,
    /**
     *  域名 ip 归属地 正则匹配
     * @param value
     * @returns {Array|{index: number, input: string}}
     *  分成2组返回 0：完全匹配数据 1：完整域名 2：ip 3：归属地
     */
    regularUrl: function (value) {
        var urlReg =
            /(?:http|https):\/\/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?).*\[((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)(?:\.)){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))\((.*)\)/;
        // /(?:http|https):\/\/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?)\//;
        var url = urlReg.exec(value);
        url = url || 'null';
        return url;
    }
    ,
    /*行为简报*/
    getAnlyseBriefReportHtml: function (isEmul) {
        return isEmul == 1 ? "<a target='_blank' href='行为简报.html' >点击查看</a>" : "";
    },
    /*行为报告*/
    getAnlyseDetailReportHtml: function (isEmul) {
        return isEmul == 1 ? "<a target='_blank' href='行为报告.html' >点击查看</a>" : "";
    },
    /*文件大小转换*/
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
    getAppFileSizeTitle: function (fileSize) {
        return fileSize == 0 ? "" : "文件大小：";
    }
    ,
    /*批量替换*/
    replaceMatch: function (text, obj) {
        return text.replace(/\[[@!]([^\]!@]+)\]/g,
            function (match, key) {
                if (obj[key] == 0) return obj[key];
                return obj[key] || "";
            });
    }
}
;


var AppTrojanType = {
    UnKnow: 0,
    Safe: 1,
    MalCode: 3,
    MalAction: 2
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