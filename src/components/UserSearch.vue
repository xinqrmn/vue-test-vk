<template>
  <div>
    <input
        type="text"
        v-model="query"
        placeholder="Search users"
        @input="searchUsers"
    />
    <ul v-if="users.length">
      <li
          v-for="user in users"
          :key="user.id"
          @click="addUser(user)"
      >
        {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>

    <h2>Selected Users</h2>
    <ul>
      <li
          v-for="user in selectedUsers"
          :key="user.id"
          @click="removeUser(user.id)"
      >
        {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";

export default {
  name: "UserSearch",
  setup() {
    const query = ref("");
    const users = ref([]);
    const selectedUsers = ref([]);

    const searchUsers = async () => {
      if (query.value.length < 3) return;
      const { data } = await axios.get(
          `https://api.vk.com/method/users.search`,
          {
            params: {
              q: query.value,
              count: 5,
              access_token: "YOUR_ACCESS_TOKEN",
              v: "5.131",
            },
          }
      );
      users.value = data.response.items;
    };

    const addUser = (user: any) => {
      if (!selectedUsers.value.find((u) => u.id === user.id)) {
        selectedUsers.value.push(user);
      }
    };

    const removeUser = (userId: number) => {
      selectedUsers.value = selectedUsers.value.filter(
          (user) => user.id !== userId
      );
    };

    return { query, users, searchUsers, addUser, selectedUsers, removeUser };
  },
};
</script>
