import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import Movie from '@/components/Movie'
import People from '@/components/People'
import Person from '@/components/Person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Movies
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/people',
      name: 'people',
      component: People
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: Movie,
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '/people/:id',
      name: 'person',
      component: Person,
      props: (route) => ({ id: route.params.id })
    }
  ]
})
