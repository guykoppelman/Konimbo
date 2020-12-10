<template>
  <div id="app">
      <div><img src="./assets/konimbo.png"></div>
      <!-- <div style="margin-top:50px"><router-link to="/email">Send email...</router-link></div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
