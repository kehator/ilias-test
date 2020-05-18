<template>
  <div class="add">
    <UserForm @send="user => add(user)"/>
    <InfoBox v-if="submit" :state="submit" :status="status" :message="message"/>
  </div>
</template>
<script>
import UserForm from '../components/UserForm'
import InfoBox from '../components/InfoBox'
export default {
  components: { UserForm, InfoBox },
  data () {
    return {
      submit: false,
      status: '',
      message: '',
      messages: {
        success: 'Użytkownik został dodany',
        error: 'Nie dodano nowego użytkownika, spróbuj ponownie za chwilę'
      }
    }
  },
  methods: {
    add (user) {
      if (user) {
        this.$http.post('https://reqres.in/api/users', user).then(response => {
          console.log(response)
          this.message = this.messages.success
          this.status = 'success'
          this.submit = true
        }).catch(error => {
          console.log(error)
          this.message = this.messages.error
          this.status = 'error'
          this.submit = true
        })
      }
    }
  }
}
</script>
