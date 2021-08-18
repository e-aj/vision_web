import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    page:'SellerPage',
    name:'SellerPage',
    component: ()=> import ('@views/SellerPage')

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
