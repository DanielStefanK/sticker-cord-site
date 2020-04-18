<template>
  <v-row>
    <v-col v-if="isLoading">
      <v-progress-linear indeterminate />
    </v-col>
    <template v-else-if="stickers && stickers.length">
      <v-col v-for="s in stickers" :key="s.id" align-self="center">
        <v-card class="pa-1" width="150px">
          <v-row justify="center">
            <sticker-img :img-id="s.imageId" :alt="s.description" />
          </v-row>

          <div class="title text-center">
            {{ s.stickerName }}
          </div>

          <div>
            <tag v-for="t in s.tags" :key="t.id" small :tag="t" />
          </div>

          <v-card-actions>
            <v-spacer />
            <v-btn
              small
              fab
              color="primary"
              :href="downloadPath(s.imageId, s.stickerName)"
            >
              <v-icon small>
                fa-file-download
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    <v-col v-else>
      <v-alert type="info">
        No stickers met the condition
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import StickerImg, { downloadPath } from './Image'
import Tag from './Tag'

export default {
  components: {
    StickerImg,
    Tag
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
    }
  },

  methods: {
    downloadPath
  }
}
</script>
