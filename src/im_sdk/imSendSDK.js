export class ImSendSDK {
    constructor(IMData) {
        this.IMData = IMData
    }
    send = (message) => {
        const newMessage = {
            channelId: this.IMData.selectedChannelId,
            channelType: "P",
            content: message
        }
        this.IMData.restFulApi.putMessage(newMessage)
    }
}