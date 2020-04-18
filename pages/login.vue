<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <form @submit.prevent="userLogin">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field v-model="username" outlined label="Username" />
            <v-text-field
              v-model="password"
              outlined
              label="Password"
              :type="type"
            />
            <v-alert v-model="error" type="error">
              Could not log you in
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" type="submit">
              Login
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'login',
  middleware: 'loggedOut',
  data() {
    return {
      type: 'password',
      error: false,
      username: '',
      password: ''
    }
  },

  methods: {
    async userLogin() {
      if (this.username && this.password) {
        this.error = false
        try {
          const { data } = await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
          if (!data.success) {
            throw new Error('could not log you in')
          }
        } catch (err) {
          this.error = true
        }
      }
    }
  }
}
</script>
