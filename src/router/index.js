import Vue from 'vue'
import Router from 'vue-router'

// 主页
const home = () => import(/* webpackChunkName: "home" */ "@/views/home/home/home.vue")
const index = () => import(/* webpackChunkName: "home" */ "@/views/home/judge/judge.vue")
const addpeple = () => import(/* webpackChunkName: "home" */ "@/views/home/addpeple/addpeple.vue")
const departsearch = () => import(/* webpackChunkName: "home" */ "@/views/home/departsearch/departsearch.vue")
const result = () => import(/* webpackChunkName: "home" */ "@/views/home/result/result.vue")
const consultDetail = () => import(/* webpackChunkName: "home" */ "@/views/home/consultDetail/consultDetail.vue")
const buyService = () => import(/* webpackChunkName: "home" */ "@/views/home/buyService/buyService.vue")
const doctorlist = () => import(/* webpackChunkName: "home" */ "@/views/home/doctorlist/doctorlist.vue")
const pictureConsult = () => import(/* webpackChunkName: "home" */ "@/views/home/pictureConsult/pictureConsult.vue")

 
//  在线问诊
const online = () => import(/* webpackChunkName: "online" */ "@/views/online/online/online.vue")
const chatRoom = () => import(/* webpackChunkName: "home" */ "@/views/chat-room/chatRoom.vue")
const conversation = () => import(/* webpackChunkName: "home" */ "@/views/conversation/conversation.vue")
// 个人中心
const my = () => import(/* webpackChunkName: "my" */ "@/views/my/my/my.vue")
 
const adress = () => import(/* webpackChunkName: "my" */ "@/views/adress/adress.vue")
const adressinfo = () => import(/* webpackChunkName: "my" */ "@/views/adressinfo/adressinfo.vue")
const acctest = () => import(/* webpackChunkName: "my" */ "@/views/my/acctest/acctest.vue")
const acctestinfo = () => import(/* webpackChunkName: "my" */ "@/views/my/acctestinfo/acctestinfo.vue")
const idcardlist = () => import(/* webpackChunkName: "my" */ "@/views/my/idcardlist/idcardlist.vue")
const unblind = () => import(/* webpackChunkName: "my" */ "@/views/my/unblind/unblind.vue")
const myorder = () => import(/* webpackChunkName: "my" */ "@/views/my/myorder/myorder.vue")
const myorderinfo = () => import(/* webpackChunkName: "my" */ "@/views/my/myorderinfo/myorderinfo.vue")
const payment = () => import(/* webpackChunkName: "my" */ "@/views/my/payment/payment.vue")
const outpation = () => import(/* webpackChunkName: "my" */ "@/views/my/outpation/outpation.vue")
const outpationinfo = () => import(/* webpackChunkName: "my" */ "@/views/my/outpationinfo/outpationinfo.vue")
const payorder = () => import(/* webpackChunkName: "my" */ "@/views/my/payorder/payorder.vue")
const mybill = () => import(/* webpackChunkName: "my" */ "@/views/my/mybill/mybill.vue")
const valuation = () => import(/* webpackChunkName: "my" */ "@/views/my/valuation/valuation.vue")
const logistics = () => import(/* webpackChunkName: "my" */ "@/views/my/logistics/logistics.vue")





Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'judge',
    component: index,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '主页'
    }
  },
  {
    path: 'departsearch',
    name: 'departsearch',
    component: departsearch,
    meta: {
      title: '搜索'
    }
  },{
    path: '/result',
    name: 'result',
    component: result,
    meta: {
      title: '结果'
    }
  },{
    path: '/consultDetail',
    name: 'consultDetail',
    component: consultDetail,
    meta: {
      title: '医生详情'
    }
  },


  {
    path: '/addpeple',
    name: 'addpeple',
    component: addpeple,
    meta: {
      title: '添加门特患者'
    }
  },
   
  {
    path: '/my',
    name: 'my',
    component: my,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/buyService',
    name: 'buyService',
    component: buyService,
    meta: {
      title: '购买服务'
    }
  },
  {
    path: '/doctorlist',
    name: 'doctorlist',
    component: doctorlist,
    meta: {
      title: '医生列表'
    }
  },
   
  {
    path: '/pictureConsult',
    name: 'pictureConsult',
    component: pictureConsult,
    meta: {
      title: '图文确认'
    }
  },
  {
    path: '/payorder',
    name: 'payorder',
    component: payorder,
    meta: {
      title: '支付订单'
    }
  },
  {
    path: '/mybill',
    name: 'mybill',
    component: mybill,
    meta: {
      title: '我的医生'
    }
  },

  {
    path: '/acctest',
    name: 'acctest',
    component: acctest,
    meta: {
      title: '个人资料'
    }
  },
  {
    path: '/acctestinfo',
    name: 'acctestinfo',
    component: acctestinfo,
    meta: {
      title: '编辑个人资料'
    }
  },
  {
    path: '/adress',
    name: 'adress',
    component: adress,
    meta: {
      title: '地址管理'
    }
  },
  {
    path: '/adressinfo',
    name: 'adressinfo',
    component: adressinfo,
    meta: {
      title: '地址详情'
    }
  },
   
  {
    path: '/unblind',
    name: 'unblind',
    component: unblind,
    meta: {
      title: '患者信息'
    }
  },
  {
    path: '/idcardlist',
    name: 'idcardlist',
    component: idcardlist,
    meta: {
      title: '患者列表'
    }
  },

  {
    path: '/myorder',
    name: 'myorder',
    component: myorder,
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/myorderinfo',
    name: 'myorderinfo',
    component: myorderinfo,
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/logistics',
    name: 'logistics',
    component: logistics,
    meta: {
      title: '物流详情'
    }
  },
      {
          path: '/valuation',
          name: 'valuation',
          component: valuation,
          meta: {
              title: '在线调查'
          }
      },
  {
    path: '/payment',
    name: 'payment',
    component: payment,
    meta: {
      title: '收银台'
    }
  },
  {
    path: '/outpation',
    name: 'outpation',
    component: outpation,
    meta: {
      title: '我的处方'
    }
  },
  {
    path: '/outpationinfo',
    name: 'outpationinfo',
    component: outpationinfo,
    meta: {
      title: '处方详情'
    }
  },
 

  {
    path: '/online',
    name: 'online',
    component: online,
    meta: {
      title: '在线问诊'
    }
  },
      {
          path: '/conversation',
          name: 'conversation',
          component: conversation,
          meta: {
              title: '会话室'
          }
      },
      {
          path: '/chatRoom',
          name: 'chatRoom',
          component: chatRoom,
          meta: {
              title: '聊天室'
          }
      },

  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 10)
    })
  }
})
