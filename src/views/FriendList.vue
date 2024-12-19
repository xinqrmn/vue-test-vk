<script lang="ts" setup>
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";
import SearchBar from "../components/SearchBar.vue";
import SourceList from "../components/SourceList.vue";

interface User {
  id: number;
  name: string;
  photo: string;
  gender: string;
  age: number;
  friendCount: number;
}

const userStore = useUserStore();
const { sourceList, friends } = storeToRefs(userStore);

const removeUser = (id: number) => userStore.removeUser(id);
const buildFriendList = () => userStore.buildFriendList();
</script>

<template>
  <div class="card">
    <h1>Добавьте друзей</h1>
    <SearchBar @select="userStore.mockFetchUsers" />
    <SourceList :users="sourceList" @remove="removeUser" />

    <button class="btn" @click="buildFriendList">Построить</button>

    <ul v-if="friends.length" class="friend-list">
      <li v-for="friend in friends" :key="friend.id">
        <div class="friend-card">
          <div class="friend-card__name">
          <img :src="friend.photo" alt="Avatar" class="avatar" />
          <p>{{ friend.name }}</p>
          </div>
          <ul>
            <li>Пол: {{ friend.gender }}</li>
            <li>Возраст: {{ friend.age }} лет</li>
            <li>Друзей: {{ friend.friendCount }}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  animation: fadeIn 0.6s ease-out;
}

h1 {
  font-family: "Segoe UI", sans-serif;
  color: #333;
}

.btn {
  background-color: #0078d4;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #005499;
}

.friend-list {
  list-style: none;
  padding: 0;
}

.friend-card {
  display: flex;
  align-items: center;
  background: white;
  color: black;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.friend-card__name {
  width: 30%;
  display: flex;
  align-items: center;
}

.friend-card ul {
  display: flex;
  list-style: none;
  width: 70%;
  justify-content: space-between;
  align-items: center;
}

.friend-card li {
  width: 20%;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

  .friend-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .friend-card__name {
    margin-bottom: 10px;
    width: 100%;
  }

  .friend-card ul {
    gap: 8px;
    width: 100%;
    padding: 0;
  }

  .friend-card li {
    width: auto;
    font-size: 14px;
  }

  .avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
