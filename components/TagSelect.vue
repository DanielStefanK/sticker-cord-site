<template>
  <v-autocomplete
    v-model="selectedTags"
    label="Tags"
    multiple
    :items="availableTags"
    item-text="name"
    item-value="id"
    :loading="$fetchState.pending"
  >
    <template v-slot:selection="{ item }">
      <tag :tag="item" />
    </template>
    <template v-slot:item="{ attrs, on, item }">
      <v-list-item v-bind="attrs" v-on="on">
        <tag :tag="item" />
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import Tag from './Tag'

export default {
  components: {
    Tag
  },
  props: {
    value: {
      type: Array,
      default: undefined
    }
  },
  async fetch() {
    await this.$store.dispatch('cache/getTags')
  },

  computed: {
    selectedTags: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    },

    availableTags() {
      return this.$store.state.cache.tags
    }
  }
}
</script>
