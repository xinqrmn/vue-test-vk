import {createRouter, createWebHistory} from "vue-router";
import UserList from "../components/UserList.vue";
import FriendDetails from "../views/FriendDetails.vue";
import AuthPage from "../views/AuthPage.vue";

const isAuthenticated = localStorage.getItem("vk_token") !== null;

const routes = [
    {
        path: "/",
        name: "Auth",
        component: AuthPage,
    },
    {
        path: "/",
        name: "UserList",
        component: UserList,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/friend/:id",
        name: "FriendDetails",
        component: FriendDetails,
        meta: {
            requiresAuth: true,
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Auth'})
    } else {
        next();
    }
})

export default router;
