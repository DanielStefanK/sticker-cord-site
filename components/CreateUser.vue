<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" />
    </template>
    <v-card>
      <v-card-title>
        Create New User
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="user.username" label="Username" />
        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
        />
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text :disabled="isLoading" @click="close">
          cancel
        </v-btn>
        <v-btn color="primary" :loading="isLoading" @click="submit">
          create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
      confirmPassword: '',
      error: false
    }
  },

  methods: {
    close() {
      this.dialog = false
      this.user = {
        username: '',
        password: ''
      }
      this.confirmPassword = ''
    },

    submit() {
      if (this.confirmPassword !== this.user.password) {
        return
      }

      this.isLoading = true
      this.$axios
        .post(`${process.env.SERVER_URL}user/create`, this.user)
        .then(({ data }) => {
          if (data.success) {
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
</script>
