<template>
  <div class="movie">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="movie__header">
      <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=240'"/>
      {{movie.releaseDate.substr(0, 4)}}
      <h1>
        {{movie.title}}
      </h1>
    </div>
    <h2>Cast</h2>
    <ul class="list">
      <li v-for="cast in movie.cast">
        <router-link :to="{name: 'person', params: {id: cast.person._id}}">
          <img v-if="cast.person.imageUrl" v-bind:src="cast.person.imageUrl + '?w=240'"/>
          <div>
            {{cast.person.name}} as {{cast.characterName}}
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import sanity from '../sanity'

const query = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  releaseDate,
  "posterUrl": poster.asset->url,
  "cast": castMembers[] {
    _key,
    characterName,
    "person": person-> {
      _id,
      name,
      "imageUrl": image.asset->url
    }
  }
}[0]
`

export default {
  props: {
    id: {
      type: String
    }
  },
  name: 'Movie',
  data () {
    return {
      loading: true,
      movie: null
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
      this.error = this.movie = null
      this.loading = true
      sanity.fetch(query, {id: this.id}).then(movie => {
        this.loading = false
        this.movie = movie
      }, error => {
        this.error = error
      })
    }
  }
}
</script>
