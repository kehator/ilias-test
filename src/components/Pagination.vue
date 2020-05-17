<template>
  <ul class="mt-6 v-pagination theme--light">
    <li>
      <v-btn
        icon
        link
        @click="prev"
        :class="['v-pagination__navigation', {'v-pagination__navigation--disabled':page===1}]">
        <v-icon>mdi-menu-left</v-icon>
      </v-btn>
    </li>
    <li v-for="index in total" :key="index">
      <v-btn class="pa-0"
             min-width="36"
             @click="goTo(index)"
             :class="['v-pagination__item', {'v-pagination__item--active':page === index}, {primary:page === index}]">
        {{index}}
      </v-btn>
    </li>
    <li>
      <v-btn
        icon
        link
        @click="next"
        :class="['v-pagination__navigation', {'v-pagination__navigation--disabled':page===total}]">
        <v-icon>mdi-menu-right</v-icon>
      </v-btn>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    page: {
      required: true,
      type: Number
    },
    total: {
      required: true,
      type: Number
    },
    query: {
      required: true,
      type: String
    }
  },
  methods: {
    next () {
      let page = this.page + 1
      if (this.page === this.total) page = this.total
      this.goTo(page)
    },
    prev () {
      let page = this.page - 1
      if (this.page === 1) page = 1
      this.goTo(page)
    },
    goTo (page) {
      this.$router.push({ query: { [this.query]: page } })
      this.$emit('getUsers')
    }
  }
}
</script>
