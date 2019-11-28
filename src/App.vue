<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from './components/home'
export default {
  name: 'App',
  components: {
  	Home
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100%;
  height:100%;
  background:url("../static/images/01.png") no-repeat center center /cover;
  padding-top:43px;
}
</style>
