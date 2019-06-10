import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const _api = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Kyletest'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bugs: [],
    bug: {},
    notes: []
  },
  mutations: {
    setBugs(state, data) {
      state.bugs = data
    },
    setBug(state, data) {
      state.bug = data
    },
    setNotes(state, data) {
      state.notes = data
    }

  },
  actions: {
    async getBugs({ commit, dispatch }) {
      try {
        let res = await _api.get('bugs')
        console.log(res.data.results)
        commit('setBugs', res.data.results)
      } catch (error) {
        console.error(error)
      }
    },
    createBug({ commit, dispatch }, payload) {
      _api.post("bugs", payload)
        .then(res => {
          dispatch("getBugs")
        })
        .catch(err => console.error(err))
    },
    async getBug({ commit }, id) {
      let res = await _api.get('bugs/' + id)
      commit('setBug', res.data.results)
    },
    closeBug({ commit, dispatch }, id) {
      let res = _api.delete('bugs/' + id)
        .then(res => {
          dispatch("getBugs")
        })
    },
    async createNote({ commit, dispatch }, data) {
      let id = data.bug
      let res = await _api.post('bugs/' + data.bug + '/notes', data)
        .then(res => {
          dispatch('getNotes', id)
        })
    },
    async getNotes({ commit }, id) {
      let res = await _api.get('bugs/' + id + '/notes')
      commit('setNotes', res.data.results)
    }
  }
})
