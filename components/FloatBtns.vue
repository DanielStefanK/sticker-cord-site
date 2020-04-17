<template>
  <v-row dense class="v-btn--floating">
    <template v-if="loggedIn">
      <v-col>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" nuxt to="/admin" fab dark bottom v-on="on">
              <v-icon>fa-tools</v-icon>
            </v-btn>
          </template>
          <span>Admin Page</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn color="error" fab dark bottom @click="logout" v-on="on">
              <v-icon>fa-sign-out-alt</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </v-col>
    </template>
    <v-col>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn color="success" fab dark bottom @click="goTop" v-on="on">
            <v-icon>fa-arrow-up</v-icon>
          </v-btn>
        </template>
        <span>Go to top</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<style scoped>
/* This is for documentation purposes and will not be needed in your application */
.v-btn--floating {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    }
  },

  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({
        path: '/'
      })
    },

    goTop() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
