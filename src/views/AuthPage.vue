<script lang="ts">

export default {
  name: "AuthPage",
  setup() {
    console.log("AuthPage loaded!")

    const authorize = () => {
      const clientId = "YOUR_CLIENT_ID"; // Укажите свой VK client_id
      const redirectUri = "http://localhost:5173/friends"; // URI для возврата после авторизации
      const authUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=friends&response_type=token&v=5.131`;
      window.location.href = authUrl;
    };

    return {authorize};
  },
};
</script>

<template>
  <div class="card">
    <h1>Добро пожаловать в VK Friend Finder</h1>
    <p>Войдите, чтобы увидеть список друзей ВКонтакте!</p>
    <button class="btn">Войти через VK</button>
  </div>
</template>

<style scoped>
.card {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: black;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  width: 100%;
}

.btn {
  background-color: #0067c0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0055a5;
}

.card {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
