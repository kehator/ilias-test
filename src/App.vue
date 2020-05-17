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
    <Footer/>
  </v-app>
</template>
<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Nav, Footer
  }
}
</script>
