<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="person" class="person">
      <div>
        <img v-if="person.image" :src="imageUrlFor(person.image).width(480)"/>
      </div>
      <div>
        <h1>{{person.name}}</h1>
        <h2>Related movies</h2>
        <ul v-if="person.actedIn" class="list">
          <li v-for="movie in person.actedIn" :key="movie._id">
            <router-link :to="{name: 'movie', params: {id: movie._id}}">
              <img v-if="movie.poster" :src="imageUrlFor(movie.poster).ignoreImageParams().width(240)"/>
              <div>
                {{movie.title}} ({{movie.releaseDate.substr(0, 4)}})
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "person" && _id == $id] {
  _id,
  name,
  image,
  "actedIn": *[_type == "movie" && references(^._id)] {
    _id,
    title,
    releaseDate,
    poster
  }
}[0]
`;

export default {
  props: {
    id: {
      type: String
    }
  },
  name: "Person",
  data() {
    return {
      loading: true,
      person: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.person = null;
      this.loading = true;
      sanity.fetch(query, { id: this.id }).then(
        person => {
          this.loading = false;
          this.person = person;
        },
        error => {
          this.error = error;
        }
      );
    }
  }
};
</script>

<style scoped>
.person {
  margin: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 4fr;
}

.person .title {
  font-size: 10vw;
  line-height: 1em;
  margin: 0;
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
  width: 20vw;
  max-width: 20rem;
  height: auto;
  float: left;
  margin-right: 0.5rem;
}

.link {
  cursor: pointer;
}

.person .list {
  grid-template-columns: repeat(auto-fit, minmax(100px, 180px));
}
</style>
