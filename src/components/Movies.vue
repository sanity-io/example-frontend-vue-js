<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul>
      <li v-for="movie in movies">
        <router-link :to="{name: 'movie', params: {id: movie._id}}">
          {{movie.title}}
          <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=100'"/>
          ({{movie.releaseDate.substr(0, 4)}})
          <span v-if="movie.director">
            Directed by {{movie.director}}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import sanity from '../sanity'

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  "director": crewMembers[job == "Director"][0].person->name,
  "posterUrl": poster.asset->url
}[0...50]`

export default {
  name: 'Movies',
  data () {
    return {
      loading: true,
      movies: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      sanity.fetch(query).then(movies => {
        this.loading = false
        this.movies = movies
      }, error => {
        this.error = error
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
