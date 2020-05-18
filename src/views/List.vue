<template>
  <div class="list">
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Avatar</th>
          <th class="text-left">Name</th>
          <th class="text-left">Edit</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>
            <v-img max-width="128" :src="user.avatar"/>
          </td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>
            <v-btn :to="{ name: 'Edit', query: { id: user.id} }" fab icon color="accent">
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <Pagination :page="page" :total="total_pages" query="page" @getUsers="getUsers"/>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      users: null,
      total_pages: 1
    }
  },
  created () {
    this.$store.dispatch('setOverlay', true)
    this.getUsers()
  },
  computed: {
    page () {
      if (this.$route.query && this.$route.query.page) return parseInt(this.$route.query.page)
      return 1
    }
  },
  methods: {
    getUsers () {
      let page = ''
      if (this.page !== 1) page = `?page=${this.page}`
      this.$http.get('https://reqres.in/api/users' + page).then(response => {
        this.users = response.data.data
        this.total_pages = response.data.total_pages
        setTimeout(() => {
          this.$store.dispatch('setOverlay', false)
        }, 1000)
      }).catch(() => {
        this.$router.push({ name: 'Home' })
      })
    }
  }
}
</script>
