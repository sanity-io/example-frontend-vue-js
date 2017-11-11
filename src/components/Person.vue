<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="person">
      <img v-if="person.imageUrl" v-bind:src="person.imageUrl + '?w=240'"/>
      <h2>{{person.name}}</h2>
      <div>
        <h3>Acted in</h3>
        <ul v-if="person.actedIn">
          <li v-for="movie in person.actedIn">
            <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=240'"/>
            <router-link :to="{name: 'movie', params: {id: movie._id}}">
              {{movie.title}} ({{movie.releaseDate.substr(0, 4)}})
            </router-link>
          </li>
        </ul>
      </div>
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
