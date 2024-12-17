<template>
  <div>
    <h2>Friends List</h2>
    <ul>
      <li
          v-for="friend in sortedFriends"
          :key="friend.id"
          :style="{ backgroundColor: getHighlight(friend) }"
      >
        {{ friend.first_name }} {{ friend.last_name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import axios from "axios";

export default {
  name: "FriendList",
  props: {
    selectedUsers: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const friends = ref([]);

    const fetchFriends = async () => {
      const allFriends = [];
      for (const user of props.selectedUsers) {
        const { data } = await axios.get(
            `https://api.vk.com/method/friends.get`,
            {
              params: {
                user_id: user.id,
                fields: "first_name,last_name",
                access_token: "YOUR_ACCESS_TOKEN",
                v: "5.131",
              },
            }
        );
        allFriends.push(...data.response.items);
      }
      friends.value = allFriends;
    };

    const sortedFriends = computed(() =>
        friends.value.sort((a, b) => a.last_name.localeCompare(b.last_name))
    );

    const getHighlight = (friend: any) => {
      const count = friends.value.filter((f) => f.id === friend.id).length;
      return count > 1 ? "lightblue" : "white";
    };

    fetchFriends();

    return { sortedFriends, getHighlight };
  },
};
</script>
