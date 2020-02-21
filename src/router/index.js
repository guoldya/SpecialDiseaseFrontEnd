import Vue from 'vue'
import Router from 'vue-router'

// 主页
const home = () => import(/* webpackChunkName: "home" */ "@/views/home/home/home.vue")

//  在线问诊

const online = () => import(/* webpackChunkName: "online" */ "@/views/online/online/online.vue")


// 个人中心
const my = () => import(/* webpackChunkName: "my" */ "@/views/my/my/my.vue")
const adress = () => import(/* webpackChunkName: "my" */ "@/views/adress/adress.vue")
const adressinfo = () => import(/* webpackChunkName: "my" */ "@/views/adressinfo/adressinfo.vue")
const acctest = () => import(/* webpackChunkName: "my" */ "@/views/my/acctest/acctest.vue")
const acctestinfo = () => import(/* webpackChunkName: "my" */ "@/views/my/acctestinfo/acctestinfo.vue")
const idcardlist = () => import(/* webpackChunkName: "my" */ "@/views/my/idcardlist/idcardlist.vue")
const consultation = () => import(/* webpackChunkName: "my" */ "@/views/my/consultation/consultation.vue")
const myorder = () => import(/* webpackChunkName: "my" */ "@/views/my/myorder/myorder.vue")
const payment = () => import(/* webpackChunkName: "my" */ "@/views/my/payment/payment.vue")
const outpation = () => import(/* webpackChunkName: "my" */ "@/views/my/outpation/outpation.vue")
const payorder = () => import(/* webpackChunkName: "my" */ "@/views/my/payorder/payorder.vue")
const mydoctor = () => import(/* webpackChunkName: "my" */ "@/views/my/mydoctor/mydoctor.vue")
 
 
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '在线门诊'
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
    path: '/payorder',
    name: 'payorder',
    component: payorder,
    meta: {
      title: '支付订单'
    }
  },
  {
    path: '/mydoctor',
    name: 'mydoctor',
    component: mydoctor,
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
    path: '/idcardlist',
    name: 'idcardlist',
    component: idcardlist,
    meta: {
      title: '患者信息'
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
    path: '/consultation',
    name: 'consultation',
    component: consultation,
    meta: {
      title: '我的咨询'
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
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '主页'
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