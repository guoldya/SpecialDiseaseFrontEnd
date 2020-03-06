export class ImSendSDK {
    constructor(IMData) {
        this.IMData = IMData
    }
    send = (message) => {
        const newMessage = {
            channelId: this.IMData.selectedChannelId,
            channelType: 'p',
            // content: message.replace(new RegExp("\n", "gm"), "<br />")
            content: message
        }
        this.IMData.restFulApi.putMessage(newMessage)
    }
}
