<template>
  <div>
    <template v-if="loggedIn">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="avatarLink" :alt="`${username} avatar`" />
        </v-list-item-avatar>
        <v-list-item-content class="text-left">
          <v-list-item-title v-text="username" />
          <v-list-item-subtitle v-text="guildName" />
        </v-list-item-content>
        <v-list-item-action>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                fab
                elevation="0"
                small
                color="error"
                v-on="on"
                @click="logout"
              >
                <v-icon small>fa-sign-out-alt</v-icon>
              </v-btn>
            </template>
            <span>Logout</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </template>
    <v-btn v-else dark color="#7289DA" :href="loginWithDiscordLink">
      Login <v-icon small>fa-discord</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return (
        this.$auth.loggedIn && this.$store.state.auth.strategy === 'discord'
      )
    },

    loginWithDiscordLink() {
      return `https://discordapp.com/api/oauth2/authorize?client_id=${
        process.env.DISCORD_CLIENT_ID
      }&permissions=1073741824&redirect_uri=${encodeURIComponent(
        process.env.BASE_URL + 'redirect/discord'
      )}&response_type=code&scope=${encodeURIComponent('identify bot guilds')}`
    },

    avatarLink() {
      return `https://cdn.discordapp.com/avatars/${this.$store.state.auth.user.id}/${this.$store.state.auth.user.avatar}.png`
    },

    username() {
      return this.$store.state.auth.user.username
    },
    guildName() {
      return this.$store.state.auth.user.guild.name
    }
  },

  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
