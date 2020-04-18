<template>
  <v-card class="pa-1" style="height: 100%">
    <v-row justify="center">
      <sticker-img :img-id="sticker.imageId" :alt="sticker.description" />
    </v-row>

    <div class="title text-center">
      {{ sticker.stickerName }}
    </div>

    <div>
      <tag v-for="t in sticker.tags" :key="t.id" class="ma-1" small :tag="t" />
    </div>

    <v-card-actions>
      <v-spacer />
      <v-btn
        small
        fab
        color="primary"
        :href="downloadPath(sticker.imageId, stickerName(sticker.stickerName))"
      >
        <v-icon small>
          fa-file-download
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import StickerImg, { downloadPath } from './Image'
import Tag from './Tag'
export default {
  components: {
    StickerImg,
    Tag
  },
  props: {
    sticker: {
      type: Object,
      required: true
    }
  },

  methods: {
    downloadPath,
    stickerName(name) {
      return name.replace(/ /g, '-')
    }
  }
}
</script>
