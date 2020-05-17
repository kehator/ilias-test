<template>
  <div id="nav">
    <v-app-bar app dense fixed>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon @click.stop="nav = !nav"/>
    </v-app-bar>
    <v-navigation-drawer app v-model="nav">
      <v-list shaped>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(route, index) in $router.options.routes" :key="index" @click="navigate(route.name)">
            <v-list-item-icon>
              <v-icon v-text="route.meta.icon"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="route.meta.title"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      item: 0,
      nav: false
    }
  },
  computed: {
    pageTitle () {
      return this.$route.meta.title
    }
  },
  methods: {
    navigate (path) {
      this.$router.push({ name: path })
    }
  }
}
</script>
