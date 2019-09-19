<template>
  <div id="app">
    <h1 class="title">Слаг заведения</h1>
    <input type="text" class="search" v-model="searchStr">
    <button type="button" class="btn" @click="searchPlace">Обновить</button>
    <schedule :items='schedules' />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import schedule from './components/Schedule'

export default {
  name: 'app',
  components: {
    schedule
  },
  data() {
    return {
      searchStr: ''
    }
  },
  computed: {
    isValidForm() {
      return this.searchStr.length > 0
    },
    schedules() {
      const schedules = this.$store.state.place ? this.$store.state.place.schedules : null
      return schedules
    }
  },
  methods: {
    ...mapActions(['getPlace']),
    searchPlace() {
      if(this.isValidForm) {
        this.getPlace(this.searchStr)
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rubik&display=swap&subset=cyrillic');
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Rubik', sans-serif;
  background: #E5E5E5;
}
#app {
  padding: 44px 41px;
}
.title {
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 5px;
}
.btn {
  width: 260px;
  height: 50px;
  background: #EE514A;
  border: none;
  border-radius: 3px;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
}
.btn:hover {
  cursor: pointer;
}
.search {
  display: block;
  width: 300px;
  height: 30px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 3px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
}
</style>
