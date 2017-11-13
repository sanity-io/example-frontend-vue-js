<template>
  <div class="person">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="person__header">
      <img v-if="person.imageUrl" v-bind:src="person.imageUrl + '?w=240'"/>
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
