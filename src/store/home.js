import { loadCards } from '../service/home'
import { loadDepart } from '../service/choosedepart'
 

const state = {
   cardList: [],
   cardTotal: 0,
   departList: [],
   departTotal: 0,
}

const getters = {}

const mutations = {
   ['SET_CARDS'](state, { list, total }) {
      state.cardList = list || []
      state.cardTotal = total || 0
   },
  
   ['SET_DEPART'](state, { list, total }) {
      state.departList = list || []
      state.departTotal = total || 0
   }
   
}
console.log(loadCards(),"ssssssss嗡嗡嗡嗡嗡嗡sssss")
console.log(loadDepart(),"ssssssss嗡嗡嗡嗡嗡嗡sssss")
const actions = {
   // 获取就诊卡片
   async getCards({ commit, state }, { update = false } = {}) {
      
      if (state.cardList.length && !update) return
      const res = await loadCards()
      if (res.code != 200) return console.error('获取就诊卡片失败: ', res)
      commit('SET_CARDS', { list: res.rows, total: res.total })
   },
    // 获取医生列表
    async getDepart({ commit, state }) {
      if (state.departList && !update) return

      const res = await loadDepart()
      console.log(res.rows,"数据书哈哈哈哈哈哈哈哈哈哈哈")
      if (res.code != 200) return console.error('获取医生列表: ', res)

      commit('SET_DEPART', { list: res.rows, total: res.total, })
   },
   
    
}

export default {
   state,
   getters,
   mutations,
   actions,
}