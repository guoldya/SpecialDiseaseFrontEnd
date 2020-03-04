1.VUE全局插件加载时 初始化IMSDK  也可以通过局部加载SDK
2.leo-im-sdk constructor有详细参数 按正常VUE数据监听即可
2.1 createUserConnect建立与服务端对话
2.2 openSession创建于特定用户的会话  与某人聊天必须创建会话 否则无法接收消息messageList为当会话消息列表
2.3 send发送消息给会话用户
3.userChannelList 标示当前好友列表
3.1unreadMessageCounts标示未读消息数量 一但建立会话SDK会自动读取所有未读消息 如一但读取及为已读