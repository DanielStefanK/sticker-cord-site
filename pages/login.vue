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
      username: '',
      password: ''
    }
  },

  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
