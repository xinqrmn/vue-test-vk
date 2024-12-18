import {createApp} from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from "./router";

const app = createApp(App)
app.mount('#app')
app.use(router)

const hash = window.location.hash;

if (hash.includes("access_token")) {
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get("access_token");
    if (token) {
        localStorage.setItem("vk_token", token); // Сохраняем токен
        router.push("/friends"); // Перенаправляем на страницу друзей
    }
}