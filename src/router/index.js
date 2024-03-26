// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Courses from '../views/Courses.vue'
import CourseDetails from '../views/CourseDetails.vue'
import LessonView from '../components/LessonView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/course/:id',
    name: 'CourseDetails',
    component: CourseDetails
  },
  {
    path: '/lesson/:id',
    name: 'LessonView',
    component: LessonView
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard
  }
    ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
