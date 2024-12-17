<template>
  <div class="auth-page">
    <h1>Welcome to VK Friend Finder</h1>
    <button @click="authorize">Login with VK</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  name: "AuthPage",
  setup() {
    const router = useRouter();

    const authorize = () => {
      // Перенаправление на OAuth-страницу VK
      const clientId = "YOUR_CLIENT_ID"; // Укажите свой client_id VK
      const redirectUri = "http://localhost:5173/friends"; // После авторизации
      window.location.href = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=friends&response_type=token&v=5.131`;
    };

    return { authorize };
  },
};
</script>

<style>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(120deg, #4c75a3, #ffffff);
  color: #fff;
  font-family: Arial, sans-serif;
}

button {
  background-color: #4c75a3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #395c87;
}
</style>
