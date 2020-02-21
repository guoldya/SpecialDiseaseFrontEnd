export default {
  setWebsocket({ commit }, data) {
    commit('setWebsocket', data)
  },
  updateChatQueue({ commit }, data) {
    commit('updateChatQueue', data)
  },
  updatePayChatQueue({ commit }, data) {
    commit('updatePayChatQueue', data)
  },
  setHistoryNews({ commit }, data) {
    commit('setHistoryNews', data)
  },
  setFriendId({ commit }, data) {
    commit('setFriendId', data)
  },
  setChatQueue({ commit }, data) {
    commit('setChatQueue', data)
  },
  setPatienDetail({ commit }, data) {
    commit('setPatienDetail', data)
  },
}