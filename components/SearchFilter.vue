<template>
  <v-text-field
    ref="input"
    v-model="searchTerm"
    label="Search (type / to focus)"
    outlined
    rounded
  />
</template>

<script>
export default {
  computed: {
    searchTerm: {
      get() {
        return this.$store.state.search.searchTerm
      },
      set(newVal) {
        this.$store.commit('search/updateSearchTerm', newVal)
      }
    }
  },

  mounted() {
    const self = this
    window.addEventListener('keypress', function(e) {
      if (e.key === '/') {
        self.$refs.input.focus()
        e.stopPropagation()
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    })
  }
}
</script>
