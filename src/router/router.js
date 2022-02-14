import {createRouter, createWebHistory} from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Info from "../views/Info.vue";
import Register from "../views/Register.vue";

const routes = [
    // { path: "/", redirect: "/index" },
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/main',
        name: 'Main',
        component: Main
    },
    {
        path: '/info',
        name: 'Info',
        component: Info
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
