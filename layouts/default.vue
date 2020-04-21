<template>
  <v-app>
    <v-content>
      <v-container>
        <float-btns />
        <v-row align="start" dense>
          <v-col order="2" order-sm="1" cols="12" sm="9">
            <search-filter />
          </v-col>
          <v-col class="text-center" order="1" order-sm="2" cols="12" sm="3">
            <discord-info />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="3">
            <tag-list />
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
import DiscordInfo from '@/components/DiscordInfo'

export default {
  components: {
    SearchFilter,
    TagList,
    FloatBtns,
    DiscordInfo
  }
}
</script>
