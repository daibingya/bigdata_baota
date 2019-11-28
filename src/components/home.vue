<template>
  <div class="home">
    <headers></headers>
    <router-view></router-view>
  </div>
</template>

<script>
import Headers from './headers'
export default{
  name: 'home',
  components: {
    Headers
  }
}
</script>

<style>
html,body{
  width:100%;
  height:100%;
}
.bottom_contes{
  width:100%;
  height:820px;
  padding:29px 32px 18px;
  box-sizing:border-box;
}
.home{
  min-width:1658px;
  width:1658px;
  height:888px;
  background-color:#00071C;
  margin:auto;
  border:2px solid #012760;
  border-top:0;
}
</style>
