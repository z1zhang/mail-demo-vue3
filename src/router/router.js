import {createRouter, createWebHistory} from "vue-router";
import Register from "../views/Register.vue";

const routes = [
    // { path: "/", redirect: "/index" },
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/B',
        name: 'B',
        component: () =>
            import ('../views/B.vue')
    }
]

const router = createRouter({
    //history模式：createWebHistory , hash模式：createWebHashHistory
    history: createWebHistory(),
    routes
})
export default router;
