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
    <footer>
      <a href="http://sanity.io">
        <img class="logo" src="./assets/sanity-logo.svg"/>
      </a>
      +
      <a href="https://vuejs.org">
        <img class="logo" src="./assets/vue-logo.svg"/>
      </a>
      =
      💖
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
