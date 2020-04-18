<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" />
    </template>
    <v-card>
      <v-card-title>
        Add Tag
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-alert v-model="error" type="error">
              could not create tag
            </v-alert>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="tag.name" label="Name" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="tag.icon" label="Icon" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-color-picker v-model="tag.color" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-card flat>
              <v-card-title>Preview</v-card-title>
              <v-card-text>
                <v-chip-group column multiple>
                  <tag :tag="tag" />
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="isLoading" text @click="close"> cancel</v-btn>
        <v-btn :loading="isLoading" color="primary" @click="createTag"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Tag from './Tag'

const defaultTag = () => ({
  name: '',
  color: '',
  icon: ''
})

export default {
  components: {
    Tag
  },

  data() {
    return {
      dialog: false,
      tag: {
        name: '',
        color: '',
        icon: ''
      },
      error: false,
      isLoading: false
    }
  },

  methods: {
    close() {
      this.dialog = false
      this.tag = defaultTag()
    },

    createTag() {
      const { name, color, icon } = this.tag

      if (name) {
        this.isLoading = true
        this.$axios
          .post(`${process.env.SERVER_URL}tag/create`, {
            name,
            color,
            icon
          })
          .then(({ data }) => {
            if (data.success) {
              this.$store.dispatch('cache/getTags', true)
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
      }
    }
  }
}
</script>
