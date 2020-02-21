
import moment from 'moment'
/**
 * 给商品价格加补0
 * @param {*} value
 */

const filterType = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "住院"
    } else if (value == 2) {
        return "门诊"
    } else if (value == 3) {
        return "体检"
    }
};
const filterTypeIMG = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return require('@/assets/images/zhuyuan.png')
    } else if (value == 2) {
        return require('@/assets/images/menzhen.png')
    } else if (value == 3) {
        return require('@/assets/images/tijian.png')
    }
};

const keepTwoNum = function (value) {
    if (value == undefined) {
        return "0.00"
    }
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
};

const payTypeFilter = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 0) {
        return "未支付"
    } else if (value == 1) {
        return "已支付"
    } else if (value == 2) {
        return "已退号"
    } else if (value == 3) {
        return "已签到"
    } else if (value == 4) {
        return "已就诊"
    } else if (value == 5) {
        return "已取消"
    } else if (value == 6) {
        return "已失效"
    }
};
const paystatusFilter = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "待支付"
    } else if (value == 2) {
        return "已支付"
    } else if (value == 3) {
        return "已退款"
    } else if (value == 4) {
        return "已关闭"
    }
};
 
 
 

const payStatus = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 3) {
        return "已关闭"
    } else if (value == 1) {
        return "待支付"
    } else if (value == 2) {
        return "已支付"
    }
};
//   <!-- 1-- 一般 2--口腔 3--血常规 4--尿常规 5--实验室 6--超声 7--放射 8--心电图 -->
const payStatusIMG = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return require('@/assets/images/medica1 (10).png')
    } else if (value == 2) {
        return require('@/assets/images/medica1 (4).png')
    } else if (value == 3) {
        return require('@/assets/images/medica1 (9).png')
    } else if (value == 4) {
        return require('@/assets/images/medica1 (6).png')
    } else if (value == 5) {
        return require('@/assets/images/medica1 (5).png')
    } else if (value == 6) {
        return require('@/assets/images/medica1 (1).png')
    } else if (value == 7) {
        return require('@/assets/images/medica1 (2).png')
    } else if (value == 8) {
        return require('@/assets/images/medica1 (8).png')
    }
};
const payStatusText = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "一般"
    } else if (value == 2) {
        return "口腔"
    } else if (value == 3) {
        return "血常规"
    } else if (value == 4) {
        return "尿常规"
    } else if (value == 5) {
        return "实验室"
    } else if (value == 6) {
        return "超声"
    } else if (value == 7) {
        return "放射"
    } else if (value == 8) {
        return "心电图"
    }
};


const medicaIMG = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 3) {
        return require('@/assets/images/icon_closed.png')

    } else if (value == 1) {
        return require('@/assets/images/icon_tobepaid.png')

    } else if (value == 2) {
        return require('@/assets/images/icon_pay1.png')
    }
};
const feeTypeFilterIMG = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return require('@/assets/images/mse(4).png')
    } else if (value == 2) {
        return require('@/assets/images/jiancha5.png')
    } else if (value == 3) {
        return require('@/assets/images/jiancha1.png')
    } else if (value == 4) {
        return require('@/assets/images/jiancha2.png')
    } else if (value == 5) {
        return require('@/assets/images/jiancha3.png')
    } else if (value == 6) {
        return require('@/assets/images/jiancha6.png')
    } else if (value == 7) {
        return require('@/assets/images/jiancha4.png')
    }
};
const bizTypeFilterIMG = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return require('@/assets/images/mse(4).png')
    } else if (value == 2) {
        return require('@/assets/images/mse(2).png')
    } else if (value == 3) {
        return require('@/assets/images/mse(5).png')
    } else if (value == 4) {
        return require('@/assets/images/mse(3).png')
    } else if (value == 5) {
        return require('@/assets/images/mse(1).png')
    } else if (value == 6) {
        return require('@/assets/images/tingzhen.png')
    } else {
        return require('@/assets/images/mse(4).png')
    }
};
const feeTypeFilter = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "挂号"

    } else if (value == 2) {
        return "西药"

    } else if (value == 3) {
        return "检查"
    } else if (value == 4) {
        return "检验"

    } else if (value == 5) {
        return "治疗"
    } else if (value == 6) {
        return "病案复印"

    } else if (value == 7) {
        return "住院预缴"
    }
};
// 复印用途


const stageType = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "上午"

    } else if (value == 2) {
        return "下午"

    }
};
const usageFilter = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "全套复印"

    } else if (value == 2) {
        return '交通事故'

    } else if (value == 3) {
        return '保险'
    } else if (value == 4) {
        return '商业保险'

    } else if (value == 5) {
        return '保险报销'
    }
};
const recipeTypeFilter = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 0) {
        return "新处方"
    } else if (value == 1) {
        return "已审核"
    } else if (value == 2) {
        return "已取药"
    } else if (value == 3) {
        return "已退药 "
    } else if (value == 4) {
        return "已失效"
    } else if (value == 5) {
        return "已下订单"
    }
};

const payMethod = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "支付宝"
    } else if (value == 2) {
        return "微信"
    } else if (value == 3) {
        return "医保"
    }
};
const bizType = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "预约"
    } else if (value == 2) {
        return "缴费"
    } else if (value == 3) {
        return "报告"
    } else if (value == 4) {
        return "排队"
    } else if (value == 5) {
        return "病案复印"
    } else if (value == 6) {
        return "停诊"
    }
};
const feeClass = function (value) {
    if (value == undefined) {
        return "预缴金"
    }
    if (value == 1) {
        return "预缴金缴纳"
    } else if (value == 2) {
        return "结算缴费"
    }
};

const admissionFilter = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "待入院"
    } else if (value == 2) {
        return "正在住院"
    } else if (value == 3) {
        return "已出院"
    }
};

//时间保留号数
const time = function (value) {
    if (value == undefined) {
        return ""
    }
    let val = value.split(' ')[0];
    return val
    // if(!ms){return;};
    // let curTime = new Date(ms);
    // let year = curTime.getFullYear();
    // let month = curTime.getMonth() + 1;
    // let day = curTime.getDate();
    // let hours = curTime.getHours();
    // let minutes = curTime.getMinutes();
    // month = month <= 9 ? "0" + month : month;
    // day = day <= 9 ? "0" + day : day;
    // hours = hours <= 9 ? "0" + hours : hours;
    // minutes = minutes <= 9 ? "0" + minutes : minutes;
    // return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
};
const lasttime = function (dataStr, pattern = 'YYYY-MM-DD HH:mm') {
    return moment(dataStr).format(pattern)
};

const inquiryTime = function (dataStr, pattern = 'HH:mm') {
    return moment(dataStr).format(pattern)
};
const inquiryYaer = function (dataStr, pattern = 'YYYY') {
    return moment(dataStr).format(pattern)
};
const inquiryDDD = function (dataStr, pattern = 'MM-DD') {
    return moment(dataStr).format(pattern)
};
const drugCheck = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 0) {
        return "新处方"
    } else if (value == 1) {
        return "已审核"
    } else if (value == 2) {
        return "已取药"
    } else if (value == 3) {
        return "已退药"
    } else if (value == 4) {
        return "已失效"
    } else if (value == 5) {
        return "已下订单"
    }
};
const level = function (value) {
    let msg = ''
    switch (value) {
        case 1:
            msg = '普通';
            break;
        case 2:
            msg = '主治医生';
            break;
        case 3:
            msg = '副教授';
            break;
        case 4:
            msg = '五级专家';
            break;
        case 5:
            msg = '四级专家';
            break;
        case 6:
            msg = '三级专家';
            break;
        case 7:
            msg = '二级专家';
            break;
        case 8:
            msg = '一级专家';
            break;
        case 9:
            msg = '特需';
            break;
    }
    return msg;
};
const examStatus = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "已预约"
    } else if (value == 2) {
        return "已检查"
    } else if (value == 3) {
        return "检查中"
    }
};
const cardType = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "身份证"
    } else if (value == 2) {
        return "医保卡"
    } else if (value == 3) {
        return "护照"
    }
};
const examSex = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "男"
    } else if (value == 2) {
        return "女"
    }
};

const busistatus = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "待审核"
    } else if (value == 2) {
        return "审核通过"
    } else if (value == 3) {
        return "审核不通过"
    } else if (value == 4) {
        return "已发件"
    }
};
const deliveryMode = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "配送"
    } else if (value == 2) {
        return "自取"
    }
};
const weekMode = function (value) {
    switch (value) {
        case 0:
            return "天"
        case 1:
            return "一"
        case 2:
            return "二"
        case 3:
            return "三"
        case 4:
            return "四"
        case 5:
            return "五"
        case 6:
            return "六"
        default:
    }
};

// const feeType = function (value) {
//     if (value == undefined) {
//         return " "
//     }
//     if (value == 1) {
//         return "西药费"
//     } else if (value == 2) {
//         return "检查费"
//     } else if (value == 3) {
//         return "检验费"
//     } else if (value == 6) {
//         return "材料费"
//     } else if (value == 5) {
//         return "检验费"
//     }
// };

const feeType = function (value) {
    if (value == undefined) {
        return " "
    }
    if (value == 1) {
        return "西药费"
    } else if (value == 2) {
        return "中药费"
    } else if (value == 3) {
        return "治疗费"
    } else if (value == 4) {
        return "检查费"
    } else if (value == 5) {
        return "检验费"
    } else if (value == 6) {
        return "材料费"
    }
};
const timeFilter = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "近一个月"
    } else if (value == 2) {
        return "近三个月"
    } else if (value == 3) {
        return "近半年"
    }
};
const getAge = function (value) {
    if (value) return
    if (!value.split(" ")) return
    var strBirthdayArr = value.split(" ");
    var strBirthdayArr = strBirthdayArr[0].split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        value = 0;//同年 则为0岁
    }
    else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    value = ageDiff - 1;
                }
                else {
                    value = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    value = ageDiff - 1;
                }
                else {
                    value = ageDiff;
                }
            }
        }
        else {
            value = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }


    return value;//返回周岁年龄
};
export default {
    filterType,
    filterTypeIMG,
    keepTwoNum,
    payTypeFilter,
    time,
    payMethod,
    lasttime,
    drugCheck,
    examStatus,
    inquiryTime,
    examSex,
    getAge,
    admissionFilter,
    level,
    busistatus,
    cardType,
    recipeTypeFilter,
    deliveryMode,
    payStatus,
    payStatusIMG,
    payStatusText,
    medicaIMG,
    feeType,
    weekMode,
    bizTypeFilterIMG,
    feeClass,
    bizType,
    usageFilter,
    feeTypeFilter,
    feeTypeFilterIMG,
    stageType,
    paystatusFilter,
    timeFilter,
    inquiryDDD,
    inquiryYaer,
}
