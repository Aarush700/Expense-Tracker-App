import { createRouter, createWebHistory } from 'vue-router';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import Profile from './components/Profile.vue';
import Contact from './components/Contact.vue';
import Income from './components/Income.vue';
import Expenses from './components/Expenses.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { name: 'Login', path: '/login', component: Login },
  { name: 'SignUp', path: '/signup', component: SignUp },
  { name: 'Dashboard', path: '/dashboard', component: Dashboard },
  { name: 'Profile', path: '/profile', component: Profile },
  { name: 'Contact', path: '/contact', component: Contact },
  { name: 'Income', path: '/income', component: Income },
  { name: 'Expense', path: '/expenses', component: Expenses }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;