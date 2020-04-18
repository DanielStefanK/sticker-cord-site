import axios from 'axios'

export const state = () => ({
  tags: null
})

export const mutations = {
  setTags(state, tags) {
    state.tags = tags
  }
}

export const actions = {
  getTags({ state, commit }) {
    if (!state.tags) {
      return axios.get(`${process.env.SERVER_URL}tag/load/all`).then((r) => {
        commit('setTags', r.data.data)
        return r.data.data
      })
    }
  }
}
