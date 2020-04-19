<template>
  <v-row>
    <v-col
      v-if="isLoadingSearch"
      cols="12"
      align-self="center"
      class="text-center"
    >
      <v-progress-circular color="primary" indeterminate />
    </v-col>
    <v-col v-if="isLoading">
      <v-progress-linear indeterminate />
    </v-col>
    <template v-else-if="stickers && stickers.length">
      <v-col v-for="s in stickers" :key="s.id" cols="12" sm="6" md="4" lg="3">
        <sticker-card :sticker="s" />
      </v-col>
      <span v-intersect.quiet="loadMore" class="bottom">Load More</span>
    </template>
    <v-col v-else>
      <v-alert type="info">
        No stickers met the condition
      </v-alert>
    </v-col>
  </v-row>
</template>

<style scoped>
.bottom {
  bottom: 0;
  visibility: hidden;
}
</style>

<script>
import StickerCard from './StickerCard'

export default {
  components: {
    StickerCard
  },

  async fetch() {
    await this.$store.dispatch('search/loadSticker')
  },

  computed: {
    stickers() {
      return this.$store.state.search.stickers
    },

    isLoading() {
      return !!(
        this.$fetchState.pending || this.$store.state.search.loadingStickers
      )
    },

    isLoadingSearch() {
      return this.$store.state.search.searchLoading
    }
  },

  methods: {
    loadMore() {
      this.$store.dispatch('search/loadNextPage')
    }
  }
}
</script>
