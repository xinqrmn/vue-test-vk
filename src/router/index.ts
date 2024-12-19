import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import FriendList from "../views/FriendList.vue";

const routes = [
    {
        path: "/",
        name: "Auth",
        component: AuthPage,
    },
    {
        path: "/friends",
        name: "FriendList",
        component: FriendList,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
