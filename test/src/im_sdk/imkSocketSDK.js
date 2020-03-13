import { updateOnlineStatus } from '@/im_sdk/api/user'
import { getUserChannel } from '@/im_sdk/api/channel'
import { IMClient } from '@/im_sdk/im_client'
import { WEBSOCKET_URL, USER_CHANNEL_LIST_SIZE } from '@/im_sdk/im_config'

export class ImkSocketSDK {
    constructor(IMData) {
        this.IMData = IMData
    }
    initIMClient() {
        //以下为
        let wsUrl = WEBSOCKET_URL + '?token=' + this.IMData.token
        const imClient = new IMClient(wsUrl, 30 * 1000)
            //this.$store.dispatch('setIMClient', imClient)
        imClient.bindOnlineStatusChanged(this.onOnlineStatusChanged) //用户状态更新
        imClient.bindNicknameChanged(this.onNicknameChanged) //修改用户名称
        imClient.bindAvatarChanged(this.onAvatarChanged)
        imClient.bindUnreadMessage(this.onUnreadMessage) //未读消息
        imClient.bindReadMessage(this.onReadMessage) //未读消息数量
        imClient.bindJoinChannel(this.onJoinChannel) //加入频道
        imClient.bindChannelNameChanged(this.onChannelNameChanged) //频道名称更改
        imClient.bindRemoveFromChannel(this.onRemoveFromChannel) //离开频道
        imClient.bindChannelRemoved(this.onChannelRemoved) //在删除频道
        imClient.bindUserOnline(this.onUserOnline) //状态更新
        imClient.bindUserOffline(this.onUserOffline) //状态更新
        imClient.connect(this.bindToGroupChannel)
        this.IMData.imClient = imClient
    }
    close = () => {
        if (this.IMData.imClient) {
            this.IMData.imClient.onClose();
            this.IMData.imClient = null
        }
    }
    onOnlineStatusChanged = (message) => {
        if (message.userId === this.IMData.user.userId) {
            return
        }
        for (let userChannel of this.IMData.userChannelList) {
            if (userChannel.toUserId == null) {
                continue
            }
            if (userChannel.toUserId === message.userId) {
                userChannel.toUserOnlineStatus = message.onlineStatus
                break
            }
        }
    }
    onNicknameChanged = (message) => {
        if (message.userId === this.IMData.user.userId) {
            this.IMData.user.nickname = this.IMData.user.nickname = message.nickname
            return
        }
        for (let userChannel of this.IMData.userChannelList) {
            if (userChannel.toUserId === message.userId) {
                if (userChannel.channelDisplayName == null || userChannel.channelDisplayName === '') {
                    userChannel.channelDisplayName = message.nickname
                }
                return
            }
        }
    }
    onAvatarChanged = (message) => {
        if (message.userId === this.IMData.user.userId) {
            this.IMData.user.avatarUrl = message.avatar
        }
    }
    onUnreadMessage = (message) => {
        if (message.channelId !== this.IMData.selectedChannelId) {
            let index = this.IMData.userChannelList.findIndex(item => item.channelId === message.channelId)
            if (index === -1) {
                let unreadMsgChannelIndex = this.IMData.unreadMessageChannelList.findIndex(item => item === message.channelId)
                if (unreadMsgChannelIndex == -1) {
                    this.IMData.unreadMessageChannelList.push(message.channelId)
                    let IMData = this.IMData
                    getUserChannel(IMData.user.id, message.channelId)
                        .then(response => {
                            let exists = IMData.userChannelList.findIndex(item => item.channelId === message.channelId)
                            if (exists === -1) {
                                IMData.userChannelList.unshift(response.data)
                            }
                            let existingUnreadMsgChannelIndex = IMData.unreadMessageChannelList.findIndex(item => item === message.channelId)
                            if (existingUnreadMsgChannelIndex > -1) {
                                IMData.unreadMessageChannelList.splice(existingUnreadMsgChannelIndex, 1)
                            }
                        })
                        .catch(error => {
                            this.outputError(error, "未读消息")
                        })
                }
            } else {
                this.IMData.userChannelList[index].unreadMessageCount += 1
            }
        }
    }
    onReadMessage = (message) => {
        for (let userChannel of this.IMData.userChannelList) {
            if (userChannel.channelId === message.channelId) {
                if (message.readAll) {
                    userChannel.unreadMessageCount = 0
                } else {
                    userChannel.unreadMessageCount -= message.total
                }
                return
            }
        }
    }
    onJoinChannel = (message) => {
        let index = this.IMData.userChannelList.findIndex(item => item.channelId === message.channelId)
        if (index > -1) {
            return
        }
        let IMData = this.IMData
        getUserChannel(this.IMData.user.id, message.channelId)
            .then(response => {
                let channelJoined = response.data
                let index = IMData.userChannelList.findIndex(item => item.channelId === channelJoined.channelId)
                if (index > -1) {
                    return
                }
                IMData.userChannelList.unshift(channelJoined)
                if (IMData.userChannelList.length > USER_CHANNEL_LIST_SIZE) {
                    IMData.userChannelList.pop()
                }

                let imClient = IMData.imClient
                if (imClient != null) {
                    let sendMessage = {
                        action: 'BIND_GROUP_CHANNEL',
                        groupIds: message.channelId
                    }
                    imClient.send(JSON.stringify(sendMessage))
                }
            })
            .catch(error => {
                this.outputError(error, "解除会话")
            })
    }
    onChannelNameChanged = (message) => {
        for (let channel of this.IMData.userChannelList) {
            if (channel.channelId === message.channelId) {
                channel.channelName = message.channelName
                return
            }
        }
    }
    onRemoveFromChannel = (message) => {
        let index = this.IMData.userChannelList.findIndex(item => item.channelId === message.channelId)
        this.leaveChannelCallback(message.channelId)
    }
    leaveChannelCallback = (channelId) => {
        let index = this.IMData.userChannelList.findIndex(item => item.channelId === channelId)
        if (index === -1) {
            return
        }
        let imClient = this.IMData.imClient
        if (imClient != null) {
            let sendMessage = {
                action: 'REMOVE_CHANNEL_FROM_GROUP',
                channelId: channelId
            }
            imClient.send(JSON.stringify(sendMessage))
        }
        this.IMData.userChannelList.splice(index, 1)
        if (this.IMData.selectedChannelId === channelId) {
            this.IMData.selectedChannelId = ''
        }
    }
    onChannelRemoved = (message) => {
        this.leaveChannelCallback(message.channelId)
    }
    onUserOnline = () => {
        this.IMData.onlineStatus = 'online'
        updateOnlineStatus(this.IMData.user.id, this.IMData.onlineStatus)
            .catch(error => {
                this.outputError(error, "设置用户状态-online")
            })
    }
    onUserOffline = () => {
        this.IMData.onlineStatus = 'offline'
        updateOnlineStatus(this.IMData.user.id, this.IMData.onlineStatus)
            .catch(error => {
                this.outputError(error, "设置用户状态-offline")
            })
    }
    bindToGroupChannel = (imClient) => {
        let groupIds = ''
        for (let channel of this.IMData.userChannelList) {
            if (channel.channelType === 'G') {
                groupIds += channel.channelId + ','
            }
        }
        if (groupIds !== '') {
            groupIds = groupIds.substr(0, groupIds.length - 1)
            let message = {
                action: 'BIND_GROUP_CHANNEL',
                groupIds: groupIds
            }
            imClient.send(JSON.stringify(message))
        }
    }
    setSelectChannel = (channelId) => {
        this.IMData.selectedChannelId = channelId
    }
}