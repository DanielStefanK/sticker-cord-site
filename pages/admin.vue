<template>
  <v-row>
    <v-col>
      <add-tag-dialog>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Create Tag</v-btn>
        </template>
      </add-tag-dialog>
    </v-col>
    <v-col>
      <create-sticker>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Create Sticker</v-btn>
        </template>
      </create-sticker>
    </v-col>
    <v-col>
      <change-password>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">change password</v-btn>
        </template>
      </change-password>
    </v-col>
    <v-col v-if="$auth.user.isAdmin">
      <create-user>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Create User</v-btn>
        </template>
      </create-user>
    </v-col>
    <v-col v-if="$auth.user.isAdmin" cols="12">
      <user-list />
    </v-col>
  </v-row>
</template>
<script>
import AddTagDialog from '@/components/AddTagDialog'
import CreateSticker from '@/components/CreateSticker'
import CreateUser from '@/components/CreateUser'
import UserList from '@/components/UserList'
import ChangePassword from '@/components/ChangePassword'

export default {
  middleware: 'isAdmin',

  components: {
    AddTagDialog,
    CreateSticker,
    CreateUser,
    UserList,
    ChangePassword
  }
}
</script>
