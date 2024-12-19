<script lang="ts" setup>
import AuthButton from '../components/AuthButton.vue'
import router from "../router";

const authorize = () => {
  // const clientId = "52867464";
  // const redirectUri = "https://vue-test-vk.netlify.app";
  // const authUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=friends&response_type=token&v=5.131`;
  // window.location.href = authUrl;

  router.push('/friends');
};

</script>

<template>
  <div class="card">
    <h1>Добро пожаловать в VK Friend Finder</h1>
    <p>Войдите, чтобы увидеть список друзей ВКонтакте!</p>
    <AuthButton @click="authorize"></AuthButton>
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

@media (max-width: 768px) {
  .card {
    padding: 16px;
    font-size: 14px;
  }

  h1 {
    font-size: 18px;
  }
}
</style>
