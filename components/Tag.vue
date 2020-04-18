<template>
  <v-chip
    :color="tag.color ? `${tag.color}` : 'default'"
    :value="tag.id"
    filter
  >
    {{ tag.name || 'default' }}
    <v-icon v-if="tag.icon" class="ml-1">{{ tag.icon }}</v-icon>
  </v-chip>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>
