<template>
  <v-app>
    <Nav/>
    <v-content>
      <v-overlay :opacity="1" :value="overlay" :z-index="9999" absolute color="accent">
        <v-progress-circular indeterminate size="64"/>
      </v-overlay>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <router-view/>
          </v-col>
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
  },
  created () {
    this.setupRouter()
  },
  computed: {
    overlay () {
      return this.$store.state.overlay
    }
  },
  methods: {
    setupRouter () {
      this.$router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.overlay)) this.$store.dispatch('setOverlay', true)
        return next()
      })
    }
  }
}
</script>
