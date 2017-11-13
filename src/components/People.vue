<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul class="list">
      <li v-for="person in people" class="list__item">
        <router-link :to="{name: 'person', params: {id: person._id}}">
          <img v-if="person.imageUrl" v-bind:src="person.imageUrl + '?w=240'"/>
          <h3>{{person.name}}</h3>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import sanity from '../sanity'

const query = `*[_type == "person"] {
  _id,
  name,
  "imageUrl": image.asset->url
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

<style scoped>

</style>
