<script setup lang="ts">
import type { Task } from '~/types/task.interface';
/*
id: Date.now()
title: string
notes: string
*/
let tasks = ref<Task[]>([
  {
    id: 123771,
    title: "Помыть кошку",
    notes: "Не забыть постричь ей ногти",
  },
  {
    id: 123123,
    title: "Помыть собаку",
    notes: "Не забыть постричь ей ногти",
  },
  {
    id: 345344,
    title: "Помыть пол",
    notes: "С моющим средством",
  },
])

function deleteTask(id: number) {
  console.log(id);

  for (let i = 0; i < tasks.value.length; i++) {
    if (tasks.value[i]?.id == id) {
      tasks.value.splice(i, 1)
      break;
    }
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="task of tasks" :key="task.id">
        <TaskCard :task="task" @delete-task="deleteTask" />
      </v-col>
    </v-row>
  </v-container>
</template>