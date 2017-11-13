<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="person" class="person">
      <div class="person__header">
        <img v-if="person.imageUrl" v-bind:src="person.imageUrl + '?w=480'"/>
        <h1>{{person.name}}</h1>
      </div>
      <h2>Acted in</h2>
      <ul v-if="person.actedIn" class="list">
        <li v-for="movie in person.actedIn">
          <router-link :to="{name: 'movie', params: {id: movie._id}}">
            <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=240'"/>
            <div>
              {{movie.title}} ({{movie.releaseDate.substr(0, 4)}})
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import sanity from '../sanity'

const query = `*[_type == "person" && _id == $id] {
  _id,
  name,
  "imageUrl": image.asset->url,
  "actedIn": *[_type == "movie" && references(^._id) && (^._id in castMembers[].person._ref)] {
    _id,
    title,
    releaseDate,
    "posterUrl": poster.asset->url
  }
}[0]
`

export default {
  props: {
    id: {
      type: String
    }
  },
  name: 'Person',
  data () {
    return {
      loading: true,
      person: null
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
      this.error = this.person = null
      this.loading = true
      sanity.fetch(query, {id: this.id}).then(person => {
        this.loading = false
        this.person = person
      }, error => {
        this.error = error
      })
    }
  }
}
</script>

<style scoped>
.person > h2 {
  margin: 2rem 0 0 0;
  padding: 0 0.5rem;
  border-bottom: 1px solid #ccc;
}

.person .list img {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  object-fit: cover;
}

.person .list {
  line-height: 2rem;
}

.person__header {
  clear: both;
  overflow: hidden;
  padding: 0.5rem;
}

.person__header > h1 {
  font-size: 3rem;
  line-height: 1em;
  margin: 1rem 0 0 0;
  padding: 0;
}

.person__header > img {
  display: block;
  width: 33vw;
  max-width: 20rem;
  height: auto;
  float: left;
  margin-right: 0.5rem;
}
</style>
