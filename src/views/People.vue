<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul class="list">
      <li v-for="person in people" class="list__item" :key="person._id">
        <router-link :to="{name: 'person', params: {id: person._id}}">
          <img v-if="person.image" :src="imageUrlFor( person.image ).width(240)"/>
          <h3>{{person.name}}</h3>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "person"] {
  _id,
  name,
  image
}[0...50]
`;

export default {
  name: "People",
  data() {
    return {
      loading: true,
      people: []
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
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        people => {
          this.loading = false;
          this.people = people;
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
.list {
  margin: 1rem;
}
</style>
