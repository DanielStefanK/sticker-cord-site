<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" />
    </template>
    <v-card>
      <v-card-title>
        Change Password
      </v-card-title>
      <v-card-text>
        <StickerImg :img-id="sticker.imageId" />
        <v-text-field v-model="name" label="Name on the server" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text :disabled="isLoading" @click="close">
          cancel
        </v-btn>
        <v-btn color="primary" :loading="isLoading" @click="submit">
          Add to Guild
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import StickerImg from './Image'

export default {
  components: {
    StickerImg
  },

  props: {
    sticker: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      name: '',
      isLoading: false
    }
  },

  created() {
    this.name = this.sticker.stickerName.replace(/ /g, '')
  },

  methods: {
    close() {
      this.dialog = false
    },

    submit() {
      if (this.confirmPassword !== this.newPassword) {
        return
      }

      this.isLoading = true
      this.$axios
        .post(`${process.env.SERVER_URL}discord/sticker/add`, {
          stickerId: this.sticker.id,
          name: this.name
        })
        .then(({ data }) => {
          if (data.success) {
            this.close()
          } else {
            throw new Error('could not change pass')
          }
        })
        .catch(() => {
          this.error = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
