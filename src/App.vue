<template>
  <div id="app">
    <Header />
    <Grid />
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Header from './components/Header.vue'
  import Grid from './components/Grid.vue'

  export default {
    name: 'app',
    components: {
      Header,
      Grid
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 10px;
  }

  body {
    background-color: #eee;
  }
</style>
