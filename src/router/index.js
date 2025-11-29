import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import DetailView from '../views/DetailView.vue'


const routes = [
  { path: '/', name: 'List', component: ListView },
  { path: '/shipment/:id', name: 'Detail', component: DetailView, props: true },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router