const BASE_API = 'http://localhost:2006' //废弃
// const WEBSOCKET_URL = 'ws://192.168.0.22:2007'//这里替换成公网IP和端口
// const WEBSOCKET_URL = 'ws://192.168.0.31:2007' //这里替换成公网IP和端口ws://m.cq2win.com:2007
// const WEBSOCKET_URL
 
const WEBSOCKET_URL = process.env.NODE_ENV == 'development' ? 'ws://192.168.0.31:2007' : 'ws://m.cq2win.com:2007';
const USER_CHANNEL_LIST_SIZE = 16

export {
  BASE_API,
  WEBSOCKET_URL,
  USER_CHANNEL_LIST_SIZE
}