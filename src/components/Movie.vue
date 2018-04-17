<template>
  <div class="movie">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="movie">
      <div class="movie__header">
        <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=240'" />
        {{movie.releaseDate.substr(0, 4)}}
        <h1>
          {{movie.title}}
        </h1>
      </div>
      <h2>Cast</h2>
      <ul class="list">
        <li v-for="cast in movie.cast" v-bind:key="cast._id">
          <router-link :to="{name: 'person', params: {id: cast.person._id}}">
            <img v-if="cast.person.imageUrl" v-bind:src="cast.person.imageUrl + '?w=480'" />
            <div>
              {{cast.person.name}} as {{cast.characterName}}
            </div>
          </router-link>
        </li>
      </ul>
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

<style scoped>
.movie > h2 {
  margin: 2rem 0 0 0;
  padding: 0 0.5rem;
  border-bottom: 1px solid #ccc;
}

.movie .list img {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  object-fit: cover;
}

.movie__header {
  clear: both;
  overflow: hidden;
  padding: 0.5rem;
}

.movie__header > h1 {
  font-size: 3rem;
  line-height: 1em;
  margin: 1rem 0 0 0;
  padding: 0;
}

.movie__header > img {
  display: block;
  width: 33vw;
  max-width: 20rem;
  height: auto;
  float: left;
  margin-right: 0.5rem;
}

.movie .list {
  line-height: 2rem;
}
</style>
