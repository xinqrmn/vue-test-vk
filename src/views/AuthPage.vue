<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Welcome to VK Friend Finder</h1>
      <p>Log in to explore your VK friend list!</p>
      <button @click="authorize">Login with VK</button>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "AuthPage",
  setup() {

    const authorize = () => {
      const clientId = "YOUR_CLIENT_ID"; // Укажите свой VK client_id
      const redirectUri = "http://localhost:5173/friends"; // URI для возврата после авторизации
      const authUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=friends&response_type=token&v=5.131`;
      window.location.href = authUrl;
    };

    return { authorize };
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(120deg, #4c75a3, #ffffff);
  font-family: Arial, sans-serif;
}

.auth-container {
  text-align: center;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button {
  margin-top: 20px;
  background-color: #4c75a3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

button:hover {
  background-color: #395c87;
}
</style>
