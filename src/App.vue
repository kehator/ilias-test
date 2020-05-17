<template>
  <v-app>
    <Nav/>
    <v-content>
      <v-container>
        <v-row justify="center">
          <router-view/>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Nav
  }
}
</script>
