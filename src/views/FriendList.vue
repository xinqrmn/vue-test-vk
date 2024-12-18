<template>
  <div class="friend-list">
    <h1>Your Friends</h1>
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Search friends by name"
    />
    <ul>
      <li v-for="friend in filteredFriends" :key="friend.id">
        {{ friend.first_name }} {{ friend.last_name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {ref, computed, onMounted} from "vue";
import axios from "axios";

interface Friend {
  id: number;
  first_name: string;
  last_name: string;
}

export default {
  name: "FriendList",
  setup() {
    const friends = ref<Friend[]>([]);
    const searchQuery = ref("");

    const fetchFriends = async () => {
      const token = localStorage.getItem("vk_token");
      if (!token) return;

      try {
        const {data} = await axios.get(
            `https://api.vk.com/method/friends.get`,
            {
              params: {
                access_token: token,
                fields: "first_name,last_name",
                v: "5.131",
              },
            }
        );
        friends.value = data.response.items;
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const filteredFriends = computed(() =>
        friends.value.filter((friend) => {
          const fullName = `${friend.first_name} ${friend.last_name}`.toLowerCase();
          return fullName.includes(searchQuery.value.toLowerCase());
        })
    );

    onMounted(fetchFriends);

    return {friends, searchQuery, filteredFriends};
  },
};
</script>


<style scoped>
.friend-list {
  padding: 20px;
  font-family: Arial, sans-serif;
}

input {
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
