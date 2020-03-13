import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';



import {
    Toast
} from 'mand-mobile'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export default new Vuex.Store({
    state: {
        selectAdress: '',
        feeActiveId: '',
        userInfo: '',
        accountInfo: '',
        current: Date.now(), // 当前时间
        intervalID: 0,
        status:'',
        message: undefined,
        test: ''
    },
    getters: {
        hidden(state) {
            // eslint-disable-next-line no-unused-vars
            const temp = state.current
            if (typeof document.hasFocus !== 'function') {
                return document.hidden
            }
            return !document.hasFocus()
        }
    },
    mutations: {
        selectAdressFun: (state, n) => {
            state.selectAdress = n;
        },
        selectTestFun: (state, n) => {
            state.test = n;
        },
        SET_USERINFO: (state, n) => {
            state.userInfo = n;
        },
        feeActiveFun: (state, n) => {
            state.feeActiveId = n;
        },

        accountInfoFun: (state, n) => {
            state.accountInfo = n;
        },
        statusFun: (state, n) => {
            state.status = n;
        },
        startComputeCurrent(state) { //启动定时器设定当前时间
            state.intervalID = setInterval(() => {
                state.current = Date.now()
            }, 500)
        },
        stopComputeCurrent(state) {
            clearInterval(state.intervalID)
            state.intervalID = 0
        },
        showMessage(state, options) {
            if (state.message) {
                state.message.hide()
            }
            let type = options.type || 'success',
                content = options.message,
                duration = options.duration || 2000;
            if (type === 'success') {
                state.message = Toast.succeed(content, duration)
            } else if (type === 'error') {
                state.message = Toast.failed(content, duration)
            } else {
                state.message = Toast.info(content, duration)
            }

        }
    },
    actions: {},
    modules: {
        home,


    },
    plugins: [vuexLocal.plugin]
})