import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_VERSION } from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    place: null
  },
  mutations: {
    // eslint-disable-next-line no-return-assign
    SET_PLACE: (state, data) => state.place = data
  },
  actions: {
    async getPlace({ commit }, searchStr) {
      try {
        const response = await axios.get(`https://tabler.ru/api/${API_VERSION}/places/${searchStr}`)
        console.log(response)
        if(response.status === 200 && response.data.status === 'Success') {
          commit('SET_PLACE', response.data.data.place)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
})
