<template>
  <v-chip
    :color="tag.color ? `${tag.color}` : 'default'"
    :value="tag.id"
    filter
    :small="small"
  >
    {{ tag.name || 'default' }}
    <v-icon v-if="tag.icon" :small="small" class="ml-1">{{ tag.icon }}</v-icon>
  </v-chip>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
