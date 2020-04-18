import axios from 'axios'

export const state = () => ({
  searchTerm: '',
  tags: [],
  stickers: null
})

export const mutations = {
  updateSearchTerm(state, term) {
    state.searchTerm = term
  },

  setTags(state, tags) {
    state.tags = tags
  },

  setSticker(state, stickers) {
    state.stickers = stickers
  }
}

export const actions = {
  loadSticker({ state, commit }, force = false) {
    if (force || !state.stickers) {
      return axios
        .get(`${process.env.SERVER_URL}sticker/load/all`)
        .then((r) => {
          commit('setSticker', r.data.data)
          return r.data.data
        })
    }
    return state.stickers
  }
}
