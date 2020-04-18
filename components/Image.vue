<template>
  <v-img
    :alt="alt"
    :src="src"
    min-height="128"
    min-width="128"
    max-height="128"
    max-width="128"
    contain
    aspect-ratio="1"
    position="center"
  />
</template>

<script>
export const downloadPath = (id, name) =>
  `${process.env.IMG_URL}${id}?filename=${name}`

export default {
  props: {
    alt: {
      type: String,
      default: 'sticker'
    },
    imgId: {
      type: String,
      required: true
    }
  },

  computed: {
    src() {
      return `${process.env.IMG_URL}${this.imgId}`
    }
  }
}
</script>
