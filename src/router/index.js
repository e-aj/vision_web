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
  },
  {
    path:"/MapPage",
    name:'MapPage',
    component:() => import ('@views/MapPage')
  },
  {
    path:"/HotPage",
    name:'HotPage',
    component:() => import ('@views/HotPage')
  },
  {
    path:"/RankPage",
    name:'RankPage',
    component:() => import ('@views/RankPage')
  },
  {
    path:"/StockPage",
    name:'StockPage',
    component:() => import ('@views/StockPage')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
