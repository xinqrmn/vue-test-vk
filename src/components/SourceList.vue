<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface User {
  id: number;
  name: string;
  photo: string;
}

const props = defineProps<{
  users: User[];
}>();

const emit = defineEmits<{
  (e: "remove", id: number): void;
}>();

const removeUser = (id: number) => emit("remove", id);
</script>

<template>
  <div class="source">
    <h2>Исходный список</h2>
    <ul v-if="props.users.length" class="source-list">
      <li v-for="user in props.users" :key="user.id" class="source-item">
        <div class="user-info">
          <img :src="user.photo" alt="Avatar" class="avatar"/>
          <div>
            <p class="user-name">{{ user.name }}</p>
          </div>
        </div>
        <button @click="removeUser(user.id)" class="remove-btn">Удалить</button>
      </li>
    </ul>
    <p v-else>Список пуст...</p>
  </div>
</template>

<style scoped>
h2 {
  font-family: "Segoe UI", sans-serif;
  color: #333;
  margin-bottom: 10px;
}

.source p {
  color: black;
}

.source-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.source-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 16px;
  color: #333;
}

.remove-btn {
  background-color: #e81123;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c50f1f;
}

@media (max-width: 768px) {


  .avatar {
    width: 30px;
    height: 30px;
  }

  .user-name {
    font-size: 14px;
  }

  .remove-btn {
    margin-top: 8px;
  }
}
</style>
