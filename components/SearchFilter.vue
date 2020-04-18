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
import _debounce from 'lodash/debounce'

export default {
  computed: {
    searchTerm: {
      get() {
        return this.$store.state.search.searchTerm
      },
      set(newVal) {
        this.$store.commit('search/updateSearchTerm', newVal)
        _debounce(() => {
          this.$store.dispatch('search/loadSticker', true)
        }, 400).bind(this)()
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
  },

  methods: {}
}
</script>
