<script setup lang="ts">
const router = useRouter();

function goToTasks() {
  router.push("/tasks")
}
</script>
<template>
  <v-btn @click="goToTasks">к моим задачам</v-btn>
</template>