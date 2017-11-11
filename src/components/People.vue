<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul>
      <li v-for="person in people">
        <router-link :to="{name: 'person', params: {id: person._id}}">
          <img v-if="person.imageUrl" v-bind:src="person.imageUrl + '?w=240'"/>
          <h2>{{person.name}}</h2>
        </router-link>
        <h3>Movies</h3>
        <ul v-if="person.movies">
          <li v-for="movie in person.movies">
            <div>
              <router-link :to="{name: 'movie', params: {id: movie._id}}">
                {{movie.title}}
              </router-link>
            </div>
          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>

<script>
import sanity from '../sanity'

const query = `*[_type == "person"] {
  _id,
  name,
  "imageUrl": image.asset->url,
  "people": *[_type == "movie" && references(^._id)] {
    _id,
    title
  }
}[0...50]
`

export default {
  name: 'People',
  data () {
    return {
      loading: true,
      people: []
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
      sanity.fetch(query).then(people => {
        this.loading = false
        this.people = people
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
</style>
