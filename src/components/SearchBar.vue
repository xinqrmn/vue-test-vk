<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../store/users";

interface User {
  id: number;
  name: string;
  photo: string;
}

const searchQuery = ref<string>(""); // Текст поиска
const userStore = useUserStore();

const emit = defineEmits<{
  (e: "select", query: string): void;
}>();

const onInput = () => {
  userStore.mockFetchUsers(searchQuery.value);
  emit("select", searchQuery.value);
};

const addUser = (user: User) => {
  userStore.addUser(user);
  searchQuery.value = "";
  userStore.searchResults = [];
};

const onFocus = () => {
  userStore.getFullUserList();
}
</script>


<template>
  <div class="search-container">
    <input
        v-model="searchQuery"
        type="text"
        placeholder="Найти пользователя..."
        class="search-input"
        @focus="onFocus"
        @input="onInput"
    />
    <ul v-if="userStore.searchResults.length" class="autocomplete-list">
      <li
          v-for="user in userStore.searchResults"
          :key="user.id"
          @click="addUser(user)"
          class="autocomplete-item"
      >
        <img :src="user.photo" alt="Avatar" class="avatar" />
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 80%;
}

.autocomplete-list {
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  color: black;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.autocomplete-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.autocomplete-item:hover {
  background: #f0f4f8;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}


@media (max-width: 768px) {
  .search-input {
    width: 90%;
    font-size: 14px;
  }

  .autocomplete-item {
    font-size: 14px;
  }
}
</style>
