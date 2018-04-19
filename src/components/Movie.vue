<template>
  <div class="movie">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="movie">
      <div class="header">
        <img v-if="movie.posterUrl" v-bind:src="movie.posterUrl + '?w=240'" />
        {{movie.releaseDate.substr(0, 4)}}
        <h1>
          {{movie.title}}
        </h1>
        <div v-html="overviewHtml" class="overview" />
      </div>
      <h2>Cast</h2>
      <ul class="list">
        <li v-for="cast in movie.cast" v-bind:key="cast._key">
          <router-link :to="{name: 'person', params: {id: cast.person._id}}" >
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
import blocksToHtml from '@sanity/block-content-to-html'

const query = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  overview,
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

      const serializers = {
        types: {
          summaries: props => {
            const h = blocksToHtml.h

            if (!props.node.summaries) {
              return false
            }

            const summariesArray = props.node.summaries.map(summary => {
              return (
                h('div', null, [
                  h('p', null, summary.summary),
                  h('span', null, '—'),
                  h('a', {href: summary.url}, summary.author)
                ])
              )
            })

            return (
              h('div', [
                h('h1', null, props.node.caption),
                h('div', null, summariesArray)
              ])
            )
          }
        }
      }

      sanity.fetch(query, {id: this.id}).then(movie => {
        this.loading = false
        this.movie = movie
        this.overviewHtml = blocksToHtml({
          blocks: movie.overview,
          serializers: serializers,
          dataset: sanity.clientConfig.dataset,
          projectId: sanity.clientConfig.projectId
        })
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

.header {
  clear: both;
  overflow: hidden;
  padding: 0.5rem;
}

.header > h1 {
  font-size: 3rem;
  line-height: 1em;
  margin: 1rem 0 0 0;
  padding: 0;
}

.header > img {
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

.overview :global(figure) {
  margin: 0;
  padding: 0;
}

.overview :global(img) {
  max-width: 100%;
}
</style>
