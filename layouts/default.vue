<template>
  <v-app dark>
    <v-content>
      <v-container>
        <FloatBtns />
        <v-row justify="space-between" align-content="space-between">
          <v-col>
            <SearchFilter />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="3">
            <TagList />
          </v-col>
          <v-col cols="12" sm="8" md="9">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SearchFilter from '@/components/SearchFilter'
import TagList from '@/components/TagList'
import FloatBtns from '@/components/FloatBtns'

export default {
  components: {
    SearchFilter,
    TagList,
    FloatBtns
  }
}
</script>
