<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" />
    </template>
    <v-card>
      <v-card-title>
        Create Sticker
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="sticker.name" label="Name" />
          </v-col>
          <v-col cols="12" sm="6">
            <tag-select v-model="sticker.tags" />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="sticker.description" label="Description" />
          </v-col>
          <v-col cols="12">
            <image-upload v-model="sticker.imageId" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="isLoading | isLoadingDelete" text @click="close"
          >Cancel</v-btn
        >
        <v-btn
          v-if="isUpdate"
          color="error"
          :loading="isLoadingDelete"
          :disabled="isLoading"
          @click="deleteSticker"
        >
          Delete
        </v-btn>
        <v-btn
          :disabled="isLoadingDelete"
          :loading="isLoading"
          color="primary"
          @click="submit"
        >
          {{ isUpdate ? 'Update' : 'Create' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TagSelect from './TagSelect'
import ImageUpload from './ImageUpload'

export const defaultSticker = () => ({
  id: null,
  name: '',
  tags: [],
  imageId: undefined,
  description: ''
})

export default {
  components: {
    TagSelect,
    ImageUpload
  },
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    },
    baseSticker: {
      type: Object,
      default: undefined
    }
  },

  data() {
    return {
      dialog: false,
      sticker: defaultSticker(),
      isLoading: false,
      error: false,
      isLoadingDelete: false
    }
  },

  created() {
    if (this.isUpdate && this.baseSticker) {
      this.sticker = {
        name: this.baseSticker.stickerName,
        description: this.baseSticker.description,
        tags: this.baseSticker.tags.map((t) => t.id),
        imageId: this.baseSticker.imageId,
        id: this.baseSticker.id
      }
    }
  },

  methods: {
    close() {
      this.dialog = false
      if (!this.isUpdate) {
        this.sticker = defaultSticker()
      }
    },

    submit() {
      this.isLoading = true
      this.$axios
        .post(
          `${process.env.SERVER_URL}sticker/create/${
            this.isUpdate ? 'update' : 'new'
          }`,
          this.sticker
        )
        .then(({ data }) => {
          if (data.success) {
            this.$store.dispatch('search/loadSticker', true)
            this.close()
          } else {
            throw new Error('could not create tag')
          }
        })
        .catch(() => {
          this.error = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    deleteSticker() {
      this.isLoadingDelete = true
      this.$axios
        .post(`${process.env.SERVER_URL}sticker/create/delete`, this.sticker)
        .then(({ data }) => {
          if (data.success) {
            this.$store.dispatch('search/loadSticker', true)
            this.close()
          } else {
            throw new Error('could not delete')
          }
        })
        .catch(() => {
          this.error = true
        })
        .finally(() => {
          this.isLoadingDelete = false
        })
    }
  }
}
</script>
