export default {
  setWebsocket(state, websocket) {
    state.websocket = websocket
    // console.log(websocket, 'websocket的值')
  },
  updateChatQueue(state, data) { //更新队列
    let friend = data
    console.log("data:"+JSON.stringify(data))
    let chatQueue = state.chatQueue
    let index = chatQueue.findIndex(msg => msg.id == friend.from)
    if (index != -1) {
      let obj = chatQueue[index]
      let num = chatQueue[index].newNews + (friend.newNews || 1)
      obj.newNews = num
      obj.id = friend.from
      obj.content = friend.content
      chatQueue.splice(index, 1, obj)
    } else { // 添加新的队列
      if (!friend.newNews) {
        friend.newNews = 1
      }
      // friend.isRead = false
      chatQueue.unshift(friend)
    }
    state.chatQueue = chatQueue
  },
  setPatienDetail(state, data) { // 设置病人详情
    state.patienDetail = data
  },
  setHistoryNews(state, data) { // 设置历史消息
    state.historyNews = data
  },
  setFriendId(state, data) {
    state.friendId = data
  },
  setChatQueue(state, data) {// 直接设置队列，同于消除红色的圆点
    state.chatQueue = data
  }
}
