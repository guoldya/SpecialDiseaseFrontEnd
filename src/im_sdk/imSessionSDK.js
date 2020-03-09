import { listMessage, readMessage } from '@/im_sdk/api/message'

export class ImSessionSDK {
    constructor(IMData) {
        this.IMData = IMData
    }
    init = () => {
        if (this.IMData.selectedChannelId === undefined || this.IMData.selectedChannelId == null) {
            return false
        }
        this.IMData.maxCreateAt = 0
        this.IMData.messageList = []
        this.initIMClient()
            //返回true不代表绝对会话连接成功

        let imClient = this.IMData.imClient
        imClient.bindNewMessage(this.onNewMessage)
        imClient.bindReconnectSuccessed(this.onReconnected)
        imClient.bindConnectionClosed(this.onConnectionClosed)
        imClient.unbindUserOnlineStatusChanged()
        imClient.bindUserOnlineStatusChanged(this.onUserOnlineStatusChanged)
        imClient.bindMessageRemoved(this.onMessageRemoved)

        this.IMData.restFulApi.getSessionUserChannel()
        this.getMessageList()
        return true
    }
    initIMClient = () => {
        let st = setTimeout(() => {
            let imClient = this.IMData.imClient
            if (imClient != null) {
                imClient.bindMembersCountChanged(this.onMembersCountChanged)
                clearTimeout(st)
            }
        }, 500)
    }
    onMembersCountChanged = (message) => {
        if (this.IMData.selectedChannelId === message.channelId) {
            this.IMData.userChannel.memberCount += message.count
        }
    }
    getMessageList = () => {
        const limit = 20
        listMessage(this.IMData.selectedChannelId, this.IMData.maxCreateAt, limit)
            .then(response => {
                this.IMData.hasMoreMessage = response.data.length === 20
                if (response.data.length > 0) {
                    this.IMData.messageList = [...response.data.reverse(), ...this.IMData.messageList]
                    this.IMData.maxCreateAt = this.IMData.messageList[0].createAt
                    readMessage(this.IMData.selectedChannelId, response.data.length)
                        .catch(error => {
                            this.outputError(error, "标记消息已经读取")
                        })
                }
            })
            .catch(error => {
                this.outputError(error, "获取消息列表")
            })
    }
    onNewMessage = (message) => {
        if (this.IMData.selectedChannelId === message.channelId && this.IMData.user.id !== message.senderId) {
            this.IMData.messageList.push(message)
        }
    }
    onReconnected = () => {
        console.log('重连成功！！！')
    }
    onConnectionClosed = () => {
        console.log('连接被断开')
    }
    onUserOnlineStatusChanged = (receiveMessage) => {
        for (let message of this.IMData.messageList) {
            if (message.senderId === receiveMessage.userId) {
                message.senderOnlineStatus = receiveMessage.onlineStatus
            }
        }
    }
    onMessageRemoved = (receiveMessage) => {
        if (this.IMData.messageList != null && this.IMData.messageList.length > 0) {
            let messageId = receiveMessage.messageId
            let senderId = receiveMessage.senderId
            if (senderId === this.IMData.user.id) {
                return
            }
            let index = 0
            for (let message of this.IMData.messageList) {
                if (message.id === messageId) {
                    this.IMData.messageList.splice(index, 1)
                    return
                }
                index++
            }
        }
    }
}