<template>
  <div id="nav">
    <v-app-bar app dense fixed>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon @click.stop="nav = !nav"/>
    </v-app-bar>
    <v-navigation-drawer app v-model="nav">
      <v-list shaped>
        <v-list-item color="primary" :class="{'v-list-item--active':route.path === $route.path}" v-for="(route, index) in $router.options.routes" :key="index" @click="navigate(route)">
          <v-list-item-icon>
            <v-icon v-text="route.meta.icon"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="route.meta.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nav: false
    }
  },
  computed: {
    pageTitle () {
      return this.$route.meta.title
    }
  },
  methods: {
    navigate (route) {
      if (this.$route.name !== route.name) this.$router.push({ name: route.name })
    }
  }
}
</script>
