<template>
  <div id="app">
    <nav>
      <router-link to="/movies">
        Movies
      </router-link>
      <router-link to="/people">
        People
      </router-link>
    </nav>
    <router-view />
    <div class="hearts">
      <img class="logo" src="./assets/sanity-logo.svg"/>
      +
      <img class="logo" src="./assets/vue-logo.png"/>
      =
      💖
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.hearts {
  font-size: 4em;
}
.logo {
  height: 40px;
}
</style>
