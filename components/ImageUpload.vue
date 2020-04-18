<template>
  <v-row>
    <v-col cols="6">
      <v-file-input
        :error-messages="error"
        label="Sticker"
        :loading="isLoading"
        @change="uploadFile"
      />
    </v-col>
    <v-col v-if="value" cols="6">
      <sticker-img :img-id="value" />
    </v-col>
    <v-col v-if="isLoading" cols="12">
      <v-progress-linear :value="progress" />
    </v-col>
  </v-row>
</template>

<script>
import StickerImg from './Image'

export default {
  components: {
    StickerImg
  },
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      progress: 0,
      isLoading: false,
      error: []
    }
  },
  methods: {
    uploadFile(file) {
      if (!file) {
        this.$emit('input', undefined)
        return
      }
      this.isLoading = true
      this.error = []
      const formData = new FormData()
      formData.append('sticker', file)
      this.$axios
        .post(`${process.env.SERVER_URL}sticker/create/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length'
                )
            if (totalLength !== null) {
              this.progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              )
            }
          }
        })
        .then((d) => {
          if (d.data.success) {
            this.$emit('input', d.data.imgId)
          } else {
            throw new Error('could not upload')
          }
        })
        .catch(() => {
          this.error = ['Could not upload file']
        })
        .finally(() => {
          this.isLoading = false
          this.progress = 0
        })
    }
  }
}
</script>
