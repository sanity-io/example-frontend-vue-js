<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul class="list">
      <li v-for="movie in movies" class="list__item">
        <router-link :to="{name: 'movie', params: {id: movie._id}}">
          <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=100'"/>
          <div>
            <div>{{movie.releaseDate.substr(0, 4)}}</div>
            <h3>{{movie.title}}</h3>
            <span v-if="movie.director" class="movies-list__directed-by">
              Directed by {{movie.director}}
            </span>
          </div>
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
