<template>
  <v-row>
    <v-col>
      <add-tag-dialog>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Create Tag</v-btn>
        </template>
      </add-tag-dialog>
    </v-col>
  </v-row>
</template>
<script>
import AddTagDialog from '@/components/AddTagDialog'

export default {
  middleware: 'auth',

  components: {
    AddTagDialog
  }
}
</script>
