<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-progress-linear v-if="isLoading" indeterminate />
      <v-alert v-if="error" type="error">
        {{ error }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  middleware({ route, redirect }) {
    const essentialParams = ['code', 'guild_id', 'permissions']
    if (!essentialParams.every((k) => !!route.query[k])) {
      return redirect('/')
    }
  },

  data() {
    return {
      isLoading: true,
      error: null
    }
  },

  async created() {
    if (process.browser) {
      const { code, guild_id: guildId, permissions } = this.$route.query
      if (Number.parseInt(permissions) !== 1073741824) {
        this.error = 'Please provide the nessesary permissions'
        this.isLoading = false
        return
      }
      try {
        const { data } = await this.$auth.loginWith('discord', {
          data: {
            code,
            guildId
          }
        })
        if (!data.success) {
          throw new Error('could not log you in')
        }
        this.$router.push('/')
      } catch (err) {
        this.error = 'Could not log in'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
