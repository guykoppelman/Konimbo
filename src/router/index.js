import Vue from 'vue'
import Router from 'vue-router'
import ItemDetail from '@/components/ItemDetail'
import home from '@/components/home'
import email from '@/components/email'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/details/:id', //:images',
      name: 'ItemDetail',
      component: ItemDetail
      // ,
      // props(route) {
      //   const images = route.params.images || '';

      //   return {
      //       images: images === '' ? [] : images.split(',')
      //   }
      //}
    },
    {
      path:'/email',
      name: 'email',
      component: email
    }
  ]
})
