import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Pais from '@/views/Pais.vue'
import Ciudad from '@/views/Ciudad.vue'
import Destino from '@/views/Destino.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pais/:nombrePais',
    name: 'Pais',
    component: Pais
  },
  {
    path: '/pais/:nombrePais/:nombreCiudad',
    name: 'Ciudad',
    component: Ciudad
  },
  {
    path: '/pais/:nombrePais/:nombreCiudad/:nombreDestino',
    name: 'Destino',
    component: Destino
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router