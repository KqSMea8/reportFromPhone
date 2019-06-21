/**
 *
 * @param startDate 开始时间 yyyy-mm-dd hh:mi:ss
 * @param endDate 结束时间 yyyy-mm-dd hh:mi:ss
 * @returns {string} 时间差
 */
function getDateTimeSpan(beginTime,endTime){
    var date1 = new Date(Date.parse(beginTime));
    var date2 =new Date( Date.parse(endTime));
    var date3 = date2.getTime() - date1.getTime();  //时间差的毫秒数
    var resultStr = "";
    //计算出相差天数
    var days = Math.floor(date3/(24*3600*1000));
    if(days > 0)
        resultStr += days + "天";
    //计算出小时数
    var leave1 = date3%(24*3600*1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1/(3600*1000));
    if(hours > 0)
        resultStr += hours + "小时";
    //计算相差分钟数
    var leave2 = leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2/(60*1000));
    if(minutes > 0)
        resultStr += minutes + "分";
    //计算相差秒数
    var leave3 = leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3/1000);
    if(seconds > 0)
        resultStr += seconds + "秒";
    if(resultStr == "")
        resultStr = "1秒";
    return resultStr;
}

/**
 * 数字型版本转字符型版本号
 * 11.22.33.4444 不足10位补充足10再分区
 * @param value 数字型版本号 XXXXXXXXXXX
 * @returns {string}
 */
function formatVersion(value){
    var ver = value.toString();
    if(ver.length > 10)
        ver = ver.substr(0,10);
    for(var i = ver.length;i <= 9;i++)
        ver = "0" + ver;
    var data = [
        parseInt(ver.substr(0,2)).toString(),
        parseInt(ver.substr(2,2)).toString(),
        parseInt(ver.substr(4,2)).toString(),
        ver.substr(6,4)
    ];
    return data.join(".");
}