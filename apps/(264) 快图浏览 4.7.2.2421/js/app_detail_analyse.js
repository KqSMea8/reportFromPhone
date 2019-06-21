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
var app
$(function () {
    //添加底部
    // $("#footer").load("bodyfooter.html")
    $('#back-to-top').fadeOut(100);
    $(window).scroll(function(){
        if ($(window).scrollTop()>300){
            $("#back-to-top").fadeIn(300);
        }
        else
        {
            $("#back-to-top").fadeOut(300);
        }
    });
    //初始化数据
    app = new DeviceReport(REPORT_APP_DATA);

    //打印
    $("a#print").click(function () {
        window.print();
    });
    //返回顶部
    $("#back-to-top").click(function () {
        $('body,html').animate({scrollTop: 0}, 1000);
        return false;
    });
    $("#linkCloseWin").click(function () {
        window.close();
    });
    layui.use(['laypage'], function () {
        $.laypage = layui.laypage;
        app.init();
        //显示正文
        showContent();
    })
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
    //安全等级 -> 1：安全  2：恶意代码  3：恶意行为
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
    this.report_time = this.start_time.substr(0,10);
    //权限列表
    this.permissions = [];
    //开发商自定义权限
    this.customPermissions = [];
    //窗体列表
    this.activities = [];
    //服务列表
    this.services = [];
    //广播列表
    this.receivers = [];
    //开发商自定义广播
    this.customReceivers = [];
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
    //应用安全级别
    this.safe = 0;
    this.warn = 0;
    this.danger = 0;
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

    //安全评估结果
    this.assess_result = _AnlyseResultDefined[this.safe_level - 1].ResultType;
    //应用操作系统
    this.app_os_type = this.osType[this.os_type];
    //文件标题
    this.app_file_size_title = this.getAppFileSizeTitle(this.file_size);
    //默认分页行数
    this.pageSize = 10;
    //日志选项
    this.selected_group_index = 3;
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
        this.createPermissionDataGrid();
        this.createCusPermissionDataGrid();
        this.createReceiverDataGrid();
        this.createCusReceiverDataGrid();
        this.createServiceDataGrid();
        this.createActivitieDataGrid();
        this.createReportActionList();
    },
    /**
     * 报表头
     */
    createReportHeader: function () {
        document.title = this.app_name +"-应用详细报告";
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
    },

    /**
     *样本信息
     */
    createAppInfo: function () {
        var infoHtmlObj = $("#appInfo");
        if(this.app_sign == "")
        {
            $("#app_sign").hide();
        }
        var vHtml = infoHtmlObj.html();
        this.os_type = this.osType[this.os_type] + "设备";
        infoHtmlObj.html(this.replaceMatch(vHtml, this));
    },
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
        this.getPanelHtml(this.permissions,
            $('#h5Perm'),
            "divPermissionPageBar",
            app.getPermissionTableHeader,
            ["ext_id", "ext_name", "safeName"],
            $('#permissionDatagrid'),
            $('#divPermissionPanel'),
            {total: this.permissions.length}
        )
    },
    //自定义权限
    createCusPermissionDataGrid: function () {
        this.getPanelHtml(this.customPermissions,
            $('#h5CusPerm'),
            'divCusPermissionPageBar',
            app.getOtherPermissionTableHeader,
            ["ext_id"],
            $('#cusPermissionDatagrid'),
            $('#divCustomPermissionPanel'),
            {total: this.customPermissions.length}
        )
    }
    ,
    //广播列表
    createReceiverDataGrid: function () {
        this.getPanelHtml(this.receivers,
            $('#h5Receiver'),
            'divReceiverPageBar',
            app.getOtherPermissionTableHeader,
            ["ext_id"],
            $('#receiverDatagrid'),
            $('#divReceiverPanel'),
            {total: this.receivers.length}
        )
    }
    ,
    //自定义广播列表
    createCusReceiverDataGrid: function () {
        this.getPanelHtml(this.customReceivers,
            $('#h5CusReceiver'),
            'divCusReceiverPageBar',
            app.getOtherPermissionTableHeader,
            ["ext_id"],
            $('#cusReceiverDatagrid'),
            $('#divCusReceiverPanel'),
            {total: this.customPermissions.length}
        )
    }
    ,
    //服务列表
    createServiceDataGrid: function () {
        this.getPanelHtml(this.receivers,
            $('#h5Service'),
            'divServicePageBar',
            app.getOtherPermissionTableHeader,
            ["ext_id"],
            $('#serviceDatagrid'),
            $('#divServicePanel'),
            {total: this.services.length}
        )
    }
    ,
    //窗体列表
    createActivitieDataGrid: function () {
        this.getPanelHtml(this.activities,
            $('#h5Activitie'),
            'divActivitiePageBar',
            app.getOtherPermissionTableHeader,
            ["ext_id"],
            $('#activitieDatagrid'),
            $('#divActivitiePanel'),
            {total: this.activities.length}
        )
    }
    ,
    createReportActionList: function () {
        var my = this;
        var vHtml = $('#h5Action').html();
        $('#h5Action').html(this.replaceMatch(vHtml, {total:this.actions.length}));
        my.setActionTableData(this.actions);
        $("div.section-app-action-group a").click(function () {
            $(".section-app-action-group a").removeClass("action-group-selected");
            $(this).addClass("action-group-selected");
            var groupIndex = parseInt($(this).attr("data-group-index"));
            my.selected_group_index = groupIndex;
            var datas = my.actions;
            if (groupIndex != 3) {
                datas = my.actions.filter(function (item) {
                 return  item.safe_level == groupIndex;
                });
                if(groupIndex == 2)
                {
                    $('#txtAppActionContent').attr('placeholder', '搜索高危 '+datas.length+' 条行为日志');
                }
                else if(groupIndex == 1)
                {
                    $('#txtAppActionContent').attr('placeholder', '搜索敏感 '+datas.length+' 条行为日志');
                }
                else if(groupIndex == 0)
                {
                    $('#txtAppActionContent').attr('placeholder', '搜索普通 '+datas.length+' 条行为日志');
                }
            }
            else
            {
                $('#txtAppActionContent').attr('placeholder', '搜索全部 '+datas.length+' 条行为日志');
            }
            my.setActionTableData(datas);
        });
        //过滤
        $('#txtAppActionContent').attr('placeholder', '搜索全部 '+this.actions.length+' 条行为日志');
        $('#txtAppActionContent').keydown(function(event) {
                if (event.keyCode == "13") {
                    var action_content = $("#txtAppActionContent").val();
                    var datas = my.actions;
                    //数据过滤
                    if (my.selected_group_index != 3) {
                        datas = my.actions.filter(function (item) {
                            if (item.safe_level != my.selected_group_index)
                                    return false;
                            if (action_content != "" && item.sshow.indexOf(action_content) < 0)
                                return false;
                            return true;
                        });
                    } else {
                        datas = my.actions.filter(function (item) {
                            if (action_content != "" && item.sshow.indexOf(action_content) < 0)
                                return false;
                            return true;
                        });
                    }
                    my.setActionTableData(datas);
                }
            }
        );
    }
    ,
    /**
     * 为行为日志列表赋值
     * @param datas
     */
    setActionTableData:function (datas) {
        app.loadPageData(datas,
            0,
            app.pageSize,
            "divActionPageBar",
            app.getActionTableHeader,
            app.getReportAppTableRows,
            ['time_msec','sshow','action_count','safeName'],
            $('#actionDatagrid')
        )
    }
    ,
    /*权限列表头信息*/
    getPermissionTableHeader: function () {
        var tHtml = ['<thead>\n' +
        '<tr>\n' +
        '<th width="56px">编号</th>\n' +
        '<th>许可名称</th>\n' +
        '<th>信息</th>\n' +
        '<th>级别</th>\n' +
        '</tr>\n' +
        '</thead>'
        ];
        return tHtml.join('');
    },
    /*其他权限头*/
    getOtherPermissionTableHeader: function () {
        var tHtml = ['<thead>\n' +
        '<tr>\n' +
        '<th width="56px">编号</th>\n' +
        '<th>许可名称</th>\n' +
        '</tr>\n' +
        '</thead>'
        ];
        return tHtml.join('');
    },
    /*行为日志头*/
    getActionTableHeader:function () {
        var tHtml = ['<thead>\n' +
        '<tr>\n' +
        '<th style="width: 56px">编号</th>\n' +
        '<th style="width: 100px">触发时间</th>\n' +
        '<th style="width: 650px">行为内容</th>\n' +
        '<th style="width: 100px">触发次数</th>\n' +
        '<th style="width: 50px">等级</th>\n' +
        '</tr>\n' +
        '</thead>'
        ];
        return tHtml.join('');
    },
    /**
     *
     * @param datas
     * @param divTableHeader
     * @param turnPageBarId
     * @param tableHeaderFunction
     * @param columnsDataField
     * @param allCodeList
     * @param tableCanvasId
     * @param divPanel
     * @param formateObj
     */
    getPanelHtml: function (datas, tableTitle, turnPageBarId, tableHeaderFunction, columnsDataField, tableCanvasId, divPanel, formateObj) {
        if (datas.length > 0) {
            var vHtml = tableTitle.html();
            tableTitle.html(this.replaceMatch(vHtml, formateObj));
            this.loadPageData(datas,
                0,
                this.pageSize,
                turnPageBarId,
                tableHeaderFunction,
                this.getReportAppTableRows,
                columnsDataField,
                tableCanvasId
            )
        }
        else {
            divPanel.hide();
        }
    },
    /**
     * 分析翻页数据
     * @param datas [] 全部数据源
     * @param startIndex int 开始行
     * @param pageSize int 每页显示条数
     * @param turnPageBarId String翻页控件id
     * @param tableHeaderFunction Function 列表头方法
     * @param tableRowsFunction Function 生成列表行方法
     * @param columnDataFields [] 显示字段
     * @param tableCanvasId String 列表容器ID
     */
    loadPageData: function (datas, startIndex, pageSize, turnPageBarId, tableHeaderFunction, tableRowsFunction, columnDataFields, tableCanvasId) {
        var vPageSize = pageSize || app.pageSize;
        var tableHtml = [];
        tableHtml.push(tableHeaderFunction());
        var vDatas = [];
        for (var i = 0; i < vPageSize; i++) {
            if (startIndex + i < datas.length)
                vDatas.push(datas[i + startIndex]);
        }
        var rowHtml = tableRowsFunction(vDatas, columnDataFields, startIndex);
        tableHtml.push(rowHtml);
        tableCanvasId.html(tableHtml.join(''));
        if (startIndex == 0)
            app.loadPager(datas, datas.length, turnPageBarId, app.loadPageData, turnPageBarId, tableHeaderFunction, tableRowsFunction, columnDataFields, tableCanvasId);
    },
    //翻页控件
    loadPager: function (datas, dataCount, divPageBarId, turnPageFunction, turnPageBarId, tableHeaderFunction, tableRowsFunction, columnDataFields, tableCanvasId) {
        var my = this;
        $('#' + divPageBarId + '').replaceWith('<span id="' + divPageBarId + '"></span>');
        if (dataCount == 0)
            return;
        $.laypage.render({
            elem: divPageBarId,
            count: dataCount,
            limit: this.pageSize,
            theme: '#34A8FF',
            jump: function (obj, first) {
                if (!first)
                    turnPageFunction(datas, (obj.curr - 1) * my.pageSize, my.pageSize, turnPageBarId, tableHeaderFunction, tableRowsFunction, columnDataFields, tableCanvasId);
            }
        })
    },
    /**
     * 生成Table行信息
     * @param datas 数据源
     * @param columnDataFields 列数据filed[]
     * @param isLoadNullHeader
     * @param defaultIndex 行数起始
     * @returns {*}
     */
    getReportAppTableRows: function (datas, columnDataFields, defaultIndex) {
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
        var my = this;
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
            //自定义

            //0：权限 Permission
            if (item.ext_type == 0) {
                if (item.is_system == 0) {
                    my.customPermissions.push(item);
                }
                else {
                    orderLevel(item, permissionsDanger, permissionsWarn, permissionsSafe);
                }
            }
            //1：界面 Activitie
            else if (item.ext_type == 1) {
                orderLevel(item, activitiesDanger, activitiesWarn, activitiesSafe);
            }
            //2：服务 Service
            else if (item.ext_type == 2) {
                orderLevel(item, servicesDanger, servicesWarn, servicesSafe);
            }
            //3：接收器 Receiver
            else if (item.ext_type == 3) {
                if (item.is_system == 0) {
                    my.customReceivers.push(item);
                }
                else {
                    orderLevel(item, receiversDanger, receiversWarn, receiversSafe);
                }
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
        var my = this;
        //遍历数据
        this.actions.forEach(function (value) {
            //根据行为字典表重新定义safelevel
            var action_id = value.action_id;
            var safe_level = my.behaviorDic[action_id].safe_level;
            value.safe_level = safe_level;
            value.time_msec = (value.time_msec/1000).toFixed(1);
            if (safe_level == 0)
            {
                value.safeName = "普通";
                my.safe++;
            }
            else if (safe_level == 1) {
                value.safeName = "敏感";
                my.warn++;
            }
            else if (safe_level == 2) {
                value.safeName = "高危";
                my.danger++;
            }
        });
    },
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
    },
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
    },
    getAppFileSizeTitle: function (fileSize) {
        return fileSize == 0 ? "" : "文件大小：";
    },
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