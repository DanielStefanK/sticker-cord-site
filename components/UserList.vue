<template>
  <v-data-table
    dense
    :headers="headers"
    :page.sync="page"
    :server-items-length="count"
    :loading="isLoading"
    :items="users"
    :footer-props="{ 'items-per-page-options': [20] }"
    :items-per-page="20"
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        dense
        label="Username"
        @keyup.enter="loadUser"
      />
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>
          {{ item.username }} <span v-if="item.id == $auth.user.id">(you)</span>
        </td>
        <td>
          <v-btn
            small
            text
            fab
            color="error"
            :disabled="item.id == $auth.user.id || isLoadingDelete"
            @click="deleteUser(item.id)"
          >
            <v-icon small> fa-trash</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      page: 1,
      isLoading: false,
      error: false,
      count: null,
      search: '',
      isLoadingDelete: false,
      headers: [
        {
          text: 'Username',
          value: 'username',
          sortable: false
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false
        }
      ]
    }
  },

  watch: {
    page() {
      this.loadUser()
    }
  },

  created() {
    this.loadUser()
  },

  methods: {
    loadUser() {
      this.isLoading = true
      this.$axios
        .post(`${process.env.SERVER_URL}user/load/all`, {
          page: this.page,
          term: this.search
        })
        .then(({ data }) => {
          if (data.success) {
            this.users = data.data.users
            this.count = data.data.count
          } else {
            throw new Error('could not delete')
          }
        })
        .catch(() => {
          this.error = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    deleteUser(id) {
      this.isLoadingDelete = true
      this.$axios
        .post(`${process.env.SERVER_URL}user/delete`, {
          id
        })
        .then(({ data }) => {
          if (data.success) {
            this.loadUser()
          } else {
            throw new Error('could not delete')
          }
        })
        .catch(() => {
          this.error = true
        })
        .finally(() => {
          this.isLoadingDelete = false
        })
    }
  }
}
</script>
