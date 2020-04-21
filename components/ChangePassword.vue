<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" />
    </template>
    <v-card>
      <v-card-title>
        Change Password
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="oldPassword"
          label="Current Password"
          type="password"
        />
        <v-text-field
          v-model="newPassword"
          label="New Password"
          type="password"
        />
        <v-text-field
          v-model="confirmPassword"
          label="Confirm New Password"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text :disabled="isLoading" @click="close">
          cancel
        </v-btn>
        <v-btn color="primary" :loading="isLoading" @click="submit">
          Change
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
      oldPassword: '',
      newPassword: '',
      isLoading: false,
      confirmPassword: '',
      error: false
    }
  },

  methods: {
    close() {
      this.dialog = false
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },

    submit() {
      if (this.confirmPassword !== this.newPassword) {
        return
      }

      this.isLoading = true
      this.$axios
        .post(`${process.env.SERVER_URL}auth/changepassword`, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        .then(({ data }) => {
          if (data.success) {
            this.close()
          } else {
            throw new Error('could not change pass')
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
