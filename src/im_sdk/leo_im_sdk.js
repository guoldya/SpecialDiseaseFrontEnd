import { RestFulApi } from '@/im_sdk/restFulApi'
import { ImkSocketSDK } from '@/im_sdk/imkSocketSDK'
import { ImSessionSDK } from '@/im_sdk/imSessionSDK'
import { ImSendSDK } from '@/im_sdk/imSendSDK'

//获取用户数量上限
export class ImSdk {
    //构造函数
    constructor() {
        this.user = null //当前用户信息
        this.onlineStatus = null //当前用户状态
        this.token = null //令牌
        this.imClient = null //IM通讯对象
        this.userChannelList = [] //当前用户好友列表  含群主列表
        this.unreadMessageChannelList = [] //解除消息列表 TODO：待定
        this.isAdmin = null //当前会话用户是否是管理员

        this.selectedChannelId = null //当前会话用户通道ID
        this.userChannel = null //当前会话用户基本信息

        this.maxCreateAt = 0 //消息读取起点
        this.messageList = [] //与会话用户的消息列表
        this.hasMoreMessage = false //
        this.isOpenWS = false //是否建立与服务器连接
            //初始化所有SDK
        this.restFulApi = new RestFulApi(this)
        this.imkSocketSDK = new ImkSocketSDK(this)
        this.imSessionSDK = new ImSessionSDK(this)
        this.imSendSDK = new ImSendSDK(this)
            //IM核心对象挂载到WINDOW节点上方便调试 发布时关闭
        window.IM = this
    }
    outputError(error, msg) {
        //错误提示
        console.log(error, msg)
    }
    userLogout() {
        //删除缓存
        // sessionStorage.clear()
        this.imkSocketSDK.close()
        this.user = null //当前用户信息
        this.onlineStatus = null //当前用户状态
        this.token = null //令牌
        this.imClient = null //IM通讯对象
        this.userChannelList = [] //当前用户好友列表  含群主列表
        this.unreadMessageChannelList = [] //解除消息列表 TODO：待定
        this.isAdmin = null //当前会话用户是否是管理员

        this.selectedChannelId = null //当前会话用户通道ID
        this.userChannel = null //当前会话用户基本信息

        this.maxCreateAt = 0 //消息读取起点
        this.messageList = [] //与会话用户的消息列表
        this.hasMoreMessage = false //
        this.isOpenWS = false //是否建立与服务器连接
            //初始化所有SDK
        this.restFulApi = new RestFulApi(this)
        this.imkSocketSDK = new ImkSocketSDK(this)
        this.imSessionSDK = new ImSessionSDK(this)
        this.imSendSDK = new ImSendSDK(this)
            //TODO:1关闭 通讯 2通知后台
    }
    createUserConnect(username, password, { userConnectCallback } = {}) {
        // if (this.isOpenWS == true) {
        //     return;
        // }
        if(username==this.isOpenWS) {
            return
        }else if(this.isOpenWS){
            this.userLogout()
        }
        //创建于服务端的会话
        this.restFulApi.userLogi(username, password, (userId) => {
            this.restFulApi.userUpdateOnlineStatus(userId, () => {
                this.restFulApi.userlistUserChannels(() => {
                    console.log(this, "数据状态查询")
                        //初始化会话连接
                    this.imkSocketSDK.initIMClient();
                    // this.isOpenWS = false;
                    userConnectCallback()
                    this.isOpenWS=username;
                })
            })
        })
    }
    openSession(fromUsername, toUserId, toUsername, { getMessageCallback } = {}) {
        console.log(toUsername,"医生姓名创建链接")
        //打开会话
        let exists = this.userChannelList.findIndex(item => item.toUserId === toUserId)
        if (exists == -1) {
            let channel = {
                fromUsername: fromUsername,
                toUserId: toUserId,
                toUsername: toUsername,
            }
            this.restFulApi.createChannel(channel, (data) => {
                this.userChannel = data
                this.selectedChannelId = data.channelId
                this.imSessionSDK.init()
                this.imSessionSDK.init({ getMessageCallback })
            })
        } else {
            this.userChannel = this.userChannelList[exists]
            // this.penSession(this.userChannelList[exists].channelId)
            this.penSession(this.userChannelList[exists].channelId, { getMessageCallback })
        }
    }
    penSession = (channelId) => {
        //打开会话
        this.selectedChannelId = channelId
        this.imSessionSDK.init()
    }
    userIdToChannelId() {
        //用户不在线时前端要处理掉
    }
    send(message) {
        //发送消息
        this.imSendSDK.send(message)
    }
    moreMessageList(callback) {
        //获取跟多历史消息
        this.restFulApi.getMessageList(callback)
    }
    registerUser = (userid, name, callback) => {
        //如果业务系统没有实现用户同步  可以前端手工同步下
        this.restFulApi.registerUser(userid, name, callback)
    }
}