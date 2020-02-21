import { loadCards } from '../service/home'
 
 

const state = {
   cardList: [],
   cardTotal: 0,
   
}

const getters = {}

const mutations = {
   ['SET_CARDS'](state, { list, total }) {
      state.cardList = list || []
      state.cardTotal = total || 0
   },
  
  
   
}
console.log(loadCards(),"loadCards")
const actions = {

   // 获取就诊卡片
   async getCards({ commit, state }, { update = false } = {}) {
      // loadCards(data).then(res => {

      // })

      if (state.cardList.length && !update) return

      const res = await loadCards()
      if (res.code != 200) return console.error('获取就诊卡片失败: ', res)

      commit('SET_CARDS', { list: res.rows, total: res.total })
   },
   // 获取消息列表
   
    
}

export default {
   state,
   getters,
   mutations,
   actions,
}