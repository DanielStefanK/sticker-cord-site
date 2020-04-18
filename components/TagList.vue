<template>
  <v-row>
    <v-col v-if="!$fetchState.pending" cols="12">
      <v-chip-group v-model="selectedTags" column multiple>
        <v-row no-gutters>
          <v-col v-for="tag in availableTags" :key="tag.id" cols="auto" sm="12">
            <tag :tag="tag" />
          </v-col>
        </v-row>
      </v-chip-group>
    </v-col>
  </v-row>
</template>

<script>
import Tag from './Tag'

export default {
  components: {
    Tag
  },

  async fetch() {
    await this.$store.dispatch('cache/getTags')
  },

  computed: {
    selectedTags: {
      get() {
        return this.$store.state.search.tags
      },
      set(newVal) {
        this.$store.commit('search/setTags', newVal)
      }
    },

    availableTags() {
      return this.$store.state.cache.tags
    }
  },

  watch: {
    selectedTags() {
      this.$store.dispatch('search/loadSticker', true)
    }
  }
}
</script>
