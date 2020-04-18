import axios from 'axios'

export const state = () => ({
  searchTerm: '',
  tags: [],
  stickers: null,
  searchLoading: false
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
  },

  setSearchloading(state, loading) {
    state.searchLoading = loading
  }
}

export const actions = {
  loadSticker({ state, commit }, force = false) {
    if (force || !state.stickers) {
      commit('setSearchloading', false)

      return axios
        .post(`${process.env.SERVER_URL}sticker/load/all`, {
          term: state.searchTerm,
          tags: state.tags
        })
        .then((r) => {
          commit('setSticker', r.data.data)
          commit('setSearchloading', false)
          return r.data.data
        })
    }
    return state.stickers
  }
}
