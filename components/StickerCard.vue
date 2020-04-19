<template>
  <v-card class="px-1 pt-1 card-outer" height="100%">
    <v-row justify="center">
      <sticker-img :img-id="sticker.imageId" :alt="sticker.description" />
    </v-row>

    <div class="title text-center">
      {{ sticker.stickerName }}
    </div>

    <div>
      <tag v-for="t in sticker.tags" :key="t.id" class="ma-1" small :tag="t" />
    </div>

    <v-card-actions class="bottom">
      <v-row width="100%" justify="space-between" align="center" no-gutters>
        <v-col>
          <span class="caption">
            <v-icon small class="mr-1"> fa-download </v-icon>
            {{ sticker.downloads }}
          </span>
        </v-col>
        <v-col class="text-right">
          <create-sticker is-update :base-sticker="sticker">
            <template v-slot:activator="{ on }">
              <v-btn v-if="$auth.loggedIn" fab text small v-on="on">
                <v-icon small>fa-edit</v-icon>
              </v-btn>
            </template>
          </create-sticker>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                fab
                text
                color="primary"
                :href="
                  downloadPath(
                    sticker.imageId,
                    stickerName(sticker.stickerName)
                  )
                "
                v-on="on"
              >
                <v-icon small>
                  fa-file-download
                </v-icon>
              </v-btn>
            </template>
            <span>
              Download
            </span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.card-outer {
  padding-bottom: 50px;
  position: relative;
}
</style>

<script>
import StickerImg, { downloadPath } from './Image'
import Tag from './Tag'
import CreateSticker from './CreateSticker'
export default {
  components: {
    StickerImg,
    Tag,
    CreateSticker
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
