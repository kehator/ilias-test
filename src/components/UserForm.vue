<template>
  <div class="form">
    <v-row justify="center">
      <v-col cols="10" sm="12" md="6">
        <div class="avatar d-flex justify-center">
          <v-img v-if="myAvatar" max-width="300" :src="myAvatar.src"/>
          <v-img v-else-if="userAvatar" max-width="300" :src="userAvatar"/>
          <v-img v-else max-width="300" src="@/assets/avatar-placeholder.png"/>
        </div>
      </v-col>
      <v-col cols="10" sm="12" md="6">
        <v-form ref="userForm" @submit.prevent.stop>
          <v-text-field
            v-model="imie"
            :rules="rules.imie"
            label="Imię"
            required/>
          <v-text-field
            v-model="nazwisko"
            :rules="rules.nazwisko"
            label="Nazwisko"
            required/>
          <v-file-input
            @change="updateAvatar($event)"
            prepend-icon="mdi-image"
            accept="image/png, image/jpeg"
            label="Avatar"
            :rules="rules.avatar"
            required/>
          <v-btn block class="mt-4" @click="submit">{{action}} Stażystę</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    action: {
      default: 'Dodaj',
      type: String
    },
    reset: {
      default: false,
      type: Boolean
    },
    firstName: {
      default: '',
      type: String
    },
    lastName: {
      default: '',
      type: String
    },
    avatar: {
      default: null,
      type: String
    }
  },
  data () {
    return {
      myAvatar: null,
      imie: this.firstName,
      nazwisko: this.lastName,
      userAvatar: this.avatar,
      rules: {
        imie: [
          v => !!v || 'Imię jest wymagane',
          v => v.length > 2 || 'Imię musi zawierać conajmniej 3 znaki'
        ],
        nazwisko: [
          v => !!v || 'Nazwisko jest wymagane',
          v => v.length > 2 || 'Nazwisko musi zawierać conajmniej 3 znaki'
        ],
        avatar: [
          v => this.requiredAvatar(v),
          v => !v || v.size < 512000 || 'Maksymalny rozmiar pliku to 0.5MB!'
        ]
      }
    }
  },
  created () {
    Event.$on('resetForm', () => this.resetForm())
  },
  methods: {
    resetForm () {
      if (this.action !== 'Dodaj') return
      this.$refs.userForm.reset()
      this.imie = this.firstName
      this.nazwisko = this.lastName
    },
    submit () {
      if (this.$refs.userForm.validate()) {
        const data = {
          imie: this.imie,
          nazwisko: this.nazwisko,
          avatar: this.userAvatar
        }
        if (this.myAvatar) data.avatar = this.myAvatar.file
        this.$emit('send', data)
      }
    },
    updateAvatar (file) {
      if (!file) {
        this.myAvatar = null
        return
      }
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.myAvatar = {
          file: file,
          src: reader.result
        }
      }, false)
      reader.readAsDataURL(file)
    },
    requiredAvatar (avatar) {
      if (this.action === 'Dodaj') return !!avatar || 'Avatar jest wymagany'
      return true
    }
  }
}
</script>
