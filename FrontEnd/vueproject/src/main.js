import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import BookComponent from './components/BookComponent.vue'
import LandingPage from './components/LandingPage.vue'

const routes = [
    {
        path: '/',
        component: LandingPage,
    },
    {
        path: '/books/:id/',
        name: BookComponent,
        component: BookComponent,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp(App)
app.use(router)
app.mount('#app')
