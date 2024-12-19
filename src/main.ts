import {createApp} from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from "./router";
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia()

app.config.performance = true;
app.use(router)
app.use(pinia)
app.mount("#app");


const hash = window.location.hash;

if (hash.includes("access_token")) {
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get("access_token");
    // console.log(token);

    if (token) {
        localStorage.setItem("vk_token", token);
        router.push("/friends");
    }
}