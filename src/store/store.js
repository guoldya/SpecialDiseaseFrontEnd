import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
  

 
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        selectAdress: '',
        feeActiveId: '',
        userInfo: {
              nickname:'默认'
        },
    },
    mutations: {
   
        selectAdressFun: (state, n) => {
            state.selectAdress = n;
        },
        SET_USERINFO: (state, n) => {
            state.userInfo = n;
        },
        feeActiveFun: (state, n) => {
            state.feeActiveId = n;
        },
    },
    actions:{},
    modules: {
        home,
    }
})

