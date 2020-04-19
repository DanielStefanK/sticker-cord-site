import axios from 'axios'

export const state = () => ({
  searchTerm: '',
  tags: [],
  stickers: null,
  searchLoading: false,
  loadingMore: false,
  hasMore: false,
  page: 1
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

  setSearchLoading(state, loading) {
    state.searchLoading = loading
  },

  setLoadingMore(state, loading) {
    state.loadingMore = loading
  },

  setPage(state, page) {
    state.page = page
  },

  setHasMore(state, more) {
    state.hasMore = more
  }
}

export const actions = {
  loadSticker({ state, commit }, force = false) {
    if (force || !state.stickers) {
      commit('setSearchLoading', true)
      commit('setPage', 1)

      return axios
        .post(`${process.env.SERVER_URL}sticker/load/all`, {
          term: state.searchTerm,
          tags: state.tags,
          page: state.page
        })
        .then((r) => {
          commit('setSticker', r.data.data.sticker)
          commit('setHasMore', r.data.data.hasMore)
          commit('setSearchLoading', false)
          return r.data.data
        })
    }
    return state.stickers
  },

  loadNextPage({ state, commit }) {
    if (!state.loadingMore && state.hasMore) {
      commit('setLoadingMore', true)
      return axios
        .post(`${process.env.SERVER_URL}sticker/load/all`, {
          term: state.searchTerm,
          tags: state.tags,
          page: state.page + 1
        })
        .then((r) => {
          commit('setSticker', [...state.stickers, ...r.data.data.sticker])
          commit('setHasMore', r.data.data.hasMore)
          commit('setLoadingMore', false)
          commit('setPage', state.page + 1)
          return r.data.data
        })
    }
  }
}
