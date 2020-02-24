import Vue from 'vue'
import App from './App.vue'
import * as mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import axios from 'axios';
import Config from './config/config';
import store from './store/store';
import infiniteScroll from 'vue-infinite-scroll';
import filters from './filter/filter';
import router from './router'
 

import Header from './components/header/header.vue';
import Address from './components/address/address.vue';
import Footer from './components/footer/footer.vue';
import Loading from './components/loading/loading.vue';
import Null from './components/null';
import Search from './components/search/search.vue';
import doctorList from './components/doctorList';
import Apptab from './components/apptab/apptab.vue';
import Recordcard from './components/recordcard';

Vue.component('Null', Null);
Vue.component('Loading', Loading);
Vue.component('Footer', Footer);
Vue.component('Address', Address);
Vue.component('Header', Header);
Vue.component('Search', Search);
Vue.component('doctorList', doctorList);
Vue.component('Apptab', Apptab);
Vue.component('Recordcard', Recordcard);

Vue.prototype.$conf = Config;
Vue.use(mandMobile)
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 开发环境
const isDev = process.env.NODE_ENV === 'development'

// 开启chrome devtools
Vue.config.devtools = isDev;


import './assets/responsive'
import './assets/global.css'



 
Vue.config.productionTip = false;
 const BASE_URL = '/api/sds';
 
 axios.defaults.baseURL = BASE_URL;
Vue.use(infiniteScroll);



// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
//重新刷新页面拦截器
// const reloadInterceptor=(to,from)=>{
//     if((from.name=='home'||from.name=='my')&&(to.name=='feerecord'||from.name=='reportquery')){
//         let isRefresh=sessionStorage.get('isRefresh');
//         console.log('isRefresh:'+isRefresh);
//         if(isRefresh=='0'){
//             sessionStorage.setItem('isRefresh',null);
//             window.location.reload();
//         }else{
//             sessionStorage.set('isRefresh',0);
//         }
//     }else if((from.name=='feerecord'||from.name=='reportquery')&&(to.name=='home'||from.name=='my')){
//         sessionStorage.set('isRefresh',0);
//     }
// };


 

Vue.config.productionTip = false;
 
axios.interceptors.request.use(function (config) {
    let url = config.url;
    // 如果是登陆
    if (localStorage.getItem("token7")) {
        // config.headers.TOKEN = localStorage.getItem("token7");
        // config.headers.UUID = localStorage.getItem("UUID7");
         

        config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtb2JpbGVcIjpcIjE4OTk2MTI4NzkxXCIsXCJuaWNrbmFtZVwiOlwi5Zmr5oGL44CCZmxvd2VyXCIsXCJpZFwiOjE4OX0iLCJqdGkiOiIxZjgxODhkZC01ZTk2LTQwZjUtODIxNC00YjFmMDg2MjQ3MWQiLCJpYXQiOjE1NjE2MDM4NzYsImV4cCI6MTU2NDE5NTg3Nn0.Tff9tLESvE7f0QgjiTsp4K1mdgpS8ZUUnrsc07aUFgU";
    } else {
        if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
            config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtb2JpbGVcIjpcIjE4OTk2MTI4NzkxXCIsXCJuaWNrbmFtZVwiOlwi5Zmr5oGL44CCZmxvd2VyXCIsXCJpZFwiOjE4OX0iLCJqdGkiOiIxZjgxODhkZC01ZTk2LTQwZjUtODIxNC00YjFmMDg2MjQ3MWQiLCJpYXQiOjE1NjE2MDM4NzYsImV4cCI6MTU2NDE5NTg3Nn0.Tff9tLESvE7f0QgjiTsp4K1mdgpS8ZUUnrsc07aUFgU";
        } else {
            config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtb2JpbGVcIjpcIjE4OTk2MTI4NzkxXCIsXCJuaWNrbmFtZVwiOlwi5Zmr5oGL44CCZmxvd2VyXCIsXCJpZFwiOjE4OX0iLCJqdGkiOiIxZjgxODhkZC01ZTk2LTQwZjUtODIxNC00YjFmMDg2MjQ3MWQiLCJpYXQiOjE1NjE2MDM4NzYsImV4cCI6MTU2NDE5NTg3Nn0.Tff9tLESvE7f0QgjiTsp4K1mdgpS8ZUUnrsc07aUFgU";
        };
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
 
// 微信公众号
// axios.interceptors.request.use(function (config) {
//     let url = config.url;
//     // 如果是登陆
//     if (sessionStorage.getItem("token7")) {
//         console.log(sessionStorage.getItem("token7"), "南川要用的sss")
//         config.headers.Authorization = sessionStorage.getItem("token7");
//     } else {
//         // if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
//         //     config.headers.Authorization = "";
//         // } else {
//         //     config.headers.Authorization = "";
//         // };
//     }
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });
// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
    // console.log(res, "总配置")
    if (res.data.code == 401 && res.data.msg && res.data.msg.indexOf('未登录') || (res.data.code == 402) || (res.data.code == 800)) {
        // 未登录操作npm
        // router.replace('/login?back=1');
        // console.log(res)
        // router.replace('/control');
    } else if (res.data.code == 500) {
        // setTimeout(() => {
        //     // router.replace('/lostpage');
        // }, 5000)
    } else if (res.data.code == 406) {
        var storage = window.sessionStorage;
        storage.setItem('token7', res.data.data.token);
        router.replace('/home')
    }
    return res;
});
Vue.prototype.$axios = axios;



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
