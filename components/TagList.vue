<template>
  <v-row>
    <v-col v-if="!$fetchState.pending" cols="12">
      <v-chip-group v-model="selectedTags" column multiple>
        <v-row no-gutters>
          <v-col v-for="tag in availableTags" :key="tag.id" cols="auto" sm="12">
            <v-chip
              :color="tag.color ? `#${tag.color}` : 'default'"
              :value="tag.id"
              filter
              >{{ tag.name }}</v-chip
            >
          </v-col>
        </v-row>
      </v-chip-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
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
  }
}
</script>
