import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import myTable from '@/components/myTable'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tabletest',
      name: 'myTable',
      component: myTable
    }
  ]
})

export default router
