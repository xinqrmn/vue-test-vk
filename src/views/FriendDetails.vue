<template>
  <div>
    <h2>{{ friend.first_name }} {{ friend.last_name }}</h2>
    <h3>Wall Posts</h3>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.text }}
      </li>
    </ul>
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "FriendDetails",
  setup() {
    const route = useRoute();
    const friend = ref({});
    const posts = ref([]);

    const fetchFriendData = async () => {
      const friendId = route.params.id;
      const { data: friendData } = await axios.get(
          `https://api.vk.com/method/users.get`,
          {
            params: {
              user_ids: friendId,
              fields: "first_name,last_name",
              access_token: "YOUR_ACCESS_TOKEN",
              v: "5.131",
            },
          }
      );
      friend.value = friendData.response[0];

      const { data: wallData } = await axios.get(
          `https://api.vk.com/method/wall.get`,
          {
            params: {
              owner_id: friendId,
              count: 10,
              access_token: "YOUR_ACCESS_TOKEN",
              v: "5.131",
            },
          }
      );
      posts.value = wallData.response.items;
    };

    onMounted(fetchFriendData);

    return { friend, posts };
  },
};
</script>
