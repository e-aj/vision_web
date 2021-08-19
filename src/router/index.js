import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:'/SellerPage',
    name:'SellerPage',
    component: ()=> import ('@views/SellerPage')
  },
  {
    path:"/TrendPage",
    name:'TrendPage',
    component:() => import ('@views/TrendPage')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
