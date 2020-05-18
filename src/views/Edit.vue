<template>
  <div class="edit">
    <InfoBox v-if="submit" :state="submit" :status="status" :message="message"/>
    <v-form v-if="!ready" ref="searchForm" @submit.prevent.stop>
      <v-row justify="center">
        <v-col cols="8" md="6">
          <v-text-field type="number" v-model="id" label="ID" required :rules="idRules" validate-on-blur/>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8" md="6" class="d-flex justify-end">
          <v-btn color="accent" @click="search">Szukaj</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <UserForm v-else :first-name="imie" :last-name="nazwisko" :avatar="avatar" action="Edytuj" @send="user => update(user)"/>
  </div>
</template>
<script>
import UserForm from '../components/UserForm'
import InfoBox from '../components/InfoBox'
export default {
  components: { UserForm, InfoBox },
  data () {
    return {
      imie: '',
      nazwisko: '',
      avatar: null,
      id: null,
      ready: false,
      submit: false,
      status: false,
      message: '',
      messages: {
        success: 'Stażysta został zaktualizowany',
        noChanges: 'Nie dokonano żadnych zmian',
        error: 'Wystąpił problem z aktualizacją stażysty, spróbuj ponownie za chwilę'
      },
      idRules: [
        v => !!v || 'Numer ID jest wymagany'
      ]
    }
  },
  created () {
    this.$store.dispatch('setOverlay', true)
    if (this.$route.query && this.$route.query.id) {
      this.id = this.$route.query.id
      this.search()
    }
    Event.$on('resetForm', () => this.setInfo('', false, false))
  },
  mounted () {
    if (!this.$route.query.id) this.$store.dispatch('setOverlay', false)
  },
  methods: {
    update (user) {
      if (user) {
        if (this.imie !== user.imie || this.nazwisko !== user.nazwisko || this.avatar !== user.avatar) {
          this.$http.patch('https://reqres.in/api/users/' + user.id).then(response => {
            console.log(response)
            this.setUser(user.imie, user.nazwisko, user.avatar)
            this.setInfo(this.messages.success, 'success', true)
          }).catch(error => {
            console.log(error)
            this.setInfo(this.messages.error, 'error', true)
          })
        } else {
          this.setInfo(this.messages.noChanges, 'warning', true)
        }
      }
    },
    setInfo (message, status, submit) {
      this.message = message
      this.status = status
      this.submit = submit
    },
    setUser (imie, nazwisko, avatar) {
      this.imie = imie
      this.nazwisko = nazwisko
      this.avatar = avatar
    },
    search () {
      const id = parseInt(this.id)
      if (id) {
        const user = this.$http.get('https://reqres.in/api/users/' + id).then(response => response.data.data).catch(() => {
          this.$router.push({ name: 'Home' })
        })
        user.then(data => {
          if (data) {
            this.setUser(data.first_name, data.last_name, data.avatar)
            this.ready = true
            setTimeout(() => {
              this.$store.dispatch('setOverlay', false)
            }, 500)
          } else {
            this.$router.push({ name: 'List' })
          }
        })
      }
    }
  }
}
</script>
