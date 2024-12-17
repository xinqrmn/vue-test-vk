<template>
  <div>
    <h1>VK User Search</h1>
    <UserSearch @usersUpdated="updateUsers"/>
    <FriendList :selectedUsers="selectedUsers"/>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import UserSearch from "../components/UserSearch.vue";
  import FriendList from '../views/FriendList.vue';
  const selectedUsers = ref([]);

  const updateUsers = (users: any) => {
    selectedUsers.value = users;
  };

  const addUser = (user: any) => {
    if (!selectedUsers.value.find((u) => u.id === user.id)) {
      selectedUsers.value.push(user);
      emit("usersUpdated", selectedUsers.value);
    }
  };
  const removeUser = (userId: number) => {
    selectedUsers.value = selectedUsers.value.filter(
        (user) => user.id !== userId
    );
    emit("usersUpdated", selectedUsers.value);
  };

</script>
