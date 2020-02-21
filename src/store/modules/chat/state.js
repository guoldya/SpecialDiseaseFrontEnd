export default {
  websocket: '',// websocket
  // chatQueue: [{ // num
  //   chatType: 2,
  //   cmd: 11,
  //   content: "医生，我有点肚子痛",
  //   createTime: 1552460922528,
  //   from: 125,
  //   id: "73deef146c3c40af9ec61cd2cfbc3623",
  //   msgType: 0,
  //   to: 1,
  //   newNews: 1,
  // }, {
  //   chatType: 2,
  //   cmd: 11,
  //   content: "医生，你好",
  //   createTime: 1552460932528,
  //   from: 123,
  //   id: "73deef146c3c40af9ec61cd2cfbc3623",
  //   msgType: 0,
  //   to: 1,
  //   newNews: 1
  // }],
  chatQueue:[],// 聊天队列
  historyNews: [], // 历史消息
  // currentFriendNews:{}, // 好友传过来的当前消息
  friendId: null, // 当前朋友id
  // 病人详情
  patienDetail: {
    patientName: "点击选择就诊人",
  },
}
