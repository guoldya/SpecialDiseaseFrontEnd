import { login } from '@/im_sdk/api/auth'
import { updateOnlineStatus, registerUser } from '@/im_sdk/api/user'
import { listUserChannels, getUserChannel, hideChannel, searchUserChannel, isAdmin, createChannel } from '@/im_sdk/api/channel'
import { listMessage, readMessage, removeMessage, saveMessage } from '@/im_sdk/api/message'
import { USER_CHANNEL_LIST_SIZE } from '@/im_sdk/im_config'

class RestFulApi {

    constructor(IMData) {
        this.IMData = IMData
    }
    userLogi = (username, password, callback) => {
        let IMData = this.IMData;
        login(username, password)
            .then(response => {
                //用户信息写入浏览器内存
                IMData.user = {
                    userId: response.data.userId,
                    id: response.data.userId,
                    name: response.data.username,
                    nickname: response.data.nickname,
                    firstLetterOfName: response.data.firstLetterOfName,
                    avatarUrl: response.data.avatarUrl
                }
                sessionStorage.setItem('currentUser', IMData.user)
                    //存储token
                IMData.token = response.data.token
                sessionStorage.setItem('token', IMData.token)
                    //调用回调韩式
                callback(response.data.userId);
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    //登陆失败
                    // _this.utputError(error, "登录失败，请检查用户名或口令是否正确！")
                }
                // _this.outputError(error, "登陆失败")
            })
    }
    userUpdateOnlineStatus(userId, callback) {
        let IMData = this.IMData;
        updateOnlineStatus(userId, 'online')
            .then(_ => {
                for (let key in _.data) {
                    IMData.user[key] = _.data[key]
                }
                console.log("状态更新成功")
                callback()
            })
            .catch(error => {
                _this.outputError(error, "状态更新")
            })
    }
    userlistUserChannels = (callback) => {
        listUserChannels(this.IMData.user.userId, USER_CHANNEL_LIST_SIZE).then(response => {
                this.IMData.userChannelList = response.data
                callback()
            })
            .catch(error => {
                this.IMData.outputError(error, "userlistUserChannels")
            })
    }
    getSessionUserChannel = () => {
        getUserChannel(this.IMData.user.id, this.IMData.selectedChannelId)
            .then(response => {
                this.IMData.userChannel = response.data
                if (this.IMData.userChannel.channelType === 'G') {
                    isAdmin(this.IMData.selectedChannelId)
                        .then(response => {
                            this.IMData.isAdmin = response.data
                        })
                        .catch(error => {
                            this.IMData.outputError(this, error)
                        })
                }
            })
            .catch(error => {
                _this.outputError(error, "获取当前会话用户")
            })
    }
    removeUserMessage(messageId, index) {
        removeMessage(messageId, this.selectedChannelId, this.user.id)
            .then(response => {
                if (response.data !== 0) {
                    _this.messageList.splice(index, 1)
                }
            })
            .catch(error => {
                _this.outputError(error, "删除消息")
            })
    }
    putMessage = (newMessage) => {
        let IMData = this.IMData;
        saveMessage(newMessage)
            .then(response => {
                IMData.messageList.push(response.data)
            })
            .catch(error => {
                IMData.outputError(error, "发送消息")
            })
    }
    getMessageList = (callback) => {
        const limit = 20
        let IMData = this.IMData;
        listMessage(IMData.selectedChannelId, IMData.maxCreateAt, limit)
            .then(response => {
                IMData.hasMoreMessage = response.data.length === 20
                if (response.data.length > 0) {
                    IMData.messageList = [...response.data.reverse(), ...IMData.messageList]
                    IMData.maxCreateAt = IMData.messageList[0].createAt
                    readMessage(IMData.selectedChannelId, response.data.length)
                        .then(response => {
                            callback(true)
                        })
                        .catch(error => {
                            callback(false)
                            IMData.outputError(this, error)
                        })
                } else {
                    callback(null)
                }
            })
            .catch(error => {
                callback(false)
                IMData.outputError(this, error)
            })
    }
    createChannel = (channel, callback) => {
        channel.type = 'P'
        channel.fromUserNickname = channel.fromUsername
        channel.toUserNickname = channel.toUsername
        createChannel(channel)
            .then(response => {
                callback(response.data)
            })
            .catch(error => {
                callback(null)
                this.IMDataoutputError(this, error)
            })

    }
    registerUser = (name, nickname, callback) => {
        let userModel = {
            name: name,
            nickname: nickname,
            password: '123456',
            checkPassword: '123456',
        }
        registerUser(userModel)
            .then(response => {
                callback(true)
            })
            .catch(error => {
                callback(false)
            })
    }
}
export { RestFulApi }
