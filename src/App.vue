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

<style scoped>
#app {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 3.5rem 0 0;
}

footer {
  padding: 5rem 1rem;
  text-align: center;
  font-size: 1rem;
}

footer img {
  display: inline-block;
  height: 1em;
  width: auto;
}

nav {
  position: fixed;
  display: flex;
  align-items: stretch;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 1em;
  font-size: 1rem;
}

nav a {
  flex-grow: 1;
  color: #fff;
  text-decoration: none;
  text-align: center;
}
</style>

<style>
/* Global styles */
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.list {
  display: block;
  margin: 0;
  padding: 0;
  clear: both;
}

.list > li {
  display: block;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: stretch;
}

.list a {
  text-decoration: none;
  display: block;
  flex-grow: 1;
  color: #333;
  padding: 0.5rem;
}

.list a:hover {
  background-color: #eee;
}

.list a:active {
  color: white;
  background-color: black;
}

.list h3 {
  margin: 0;
  padding: 0;
}

.list img {
  display: block;
  height: auto;
  width: 3em;
  margin-right: 0.5rem;
  float: left;

}
</style>
