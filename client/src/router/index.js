import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Members from '../pages/Members.vue';
import Employees from '../pages/Employees.vue';
import Attractions from '../pages/Attractions.vue';
import Locations from '../pages/Locations.vue';
import Reservations from '../pages/Reservations.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/members', name: 'Members', component: Members },
  { path: '/employees', name: 'Employees', component: Employees},
  { path: '/attractions', name: 'Attractions', component: Attractions},
  { path: '/locations', name: 'Locations', component: Locations},
  { path: '/reservations', name: 'Reservations', component: Reservations},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;