<template>
  <v-dialog v-model="currentState" persistent max-width="500">
    <v-card>
      <v-card-title class="headline d-flex justify-center pt-6">
        <v-btn icon large outlined :color="currentStatus">
          <v-icon v-if="currentStatus === 'success'">mdi-account-check</v-icon>
          <v-icon v-else-if="currentStatus === 'error'">mdi-alert-octagon</v-icon>
          <v-icon v-else>mdi-account-alert-outline</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="text-center">{{msg}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="currentStatus" text @click="close">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    status: {
      type: String,
      default: 'success'
    },
    state: {
      type: Boolean,
      default: true
    },
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentState: this.state,
      currentStatus: this.status,
      msg: this.message
    }
  },
  methods: {
    close () {
      this.msg = ''
      this.currentStatus = ''
      this.currentState = false
      Event.$emit('resetForm')
    }
  }
}
</script>
