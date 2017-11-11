<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="movie">
      <h2>
        {{movie.title}} ({{movie.releaseDate.substr(0, 4)}})
      </h2>
      <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=240'"/>
      <div>
        <h3>Cast</h3>
        <ul>
          <li v-for="cast in movie.cast">
            <img v-if="cast.person.imageUrl" v-bind:src="cast.person.imageUrl + '?w=240'"/>
            <router-link :to="{name: 'person', params: {id: cast.person._id}}">
              {{cast.person.name}}
            </router-link>
             as {{cast.characterName}}
          </li>
        </ul>
      </div>
    </div>
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
