import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: () => import('../view/home')
    },
    {
        path: '/guardians/:id/urgencies',
        name: 'Urgencies',
        component: () => import('../view/Urgencies')
    }
]

const router = new VueRouter({
    model: 'history',
    base:process.env.BASE_URL,
    routes
})

export default router
