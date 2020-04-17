export const state = () => ({
  searchTerm: '',
  tags: []
})

export const mutations = {
  updateSearchTerm(state, term) {
    state.searchTerm = term
  },

  setTags(state, tags) {
    state.tags = tags
  }
}
