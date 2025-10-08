<script setup lang="ts">
const taskStore = useTask()
const router = useRouter()

let tasks = taskStore.tasks

let form = ref({
  title: "",
  notes: ""
})

function deleteTask(id: number) {
  taskStore.deleteTask(id)
}

function clearForm() {
  form.value.title = ""
  form.value.notes = ""
}

function addTask() {
  let toSend = {
    title: form.value.title,
    notes: form.value.notes,
    id: Date.now()
  }

  taskStore.addTask(toSend)

  clearForm()
}

await taskStore.getAllTasks();
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="router.push('/')">назад</v-btn>
      </v-col>

      <v-col cols="12">
        <v-text-field v-model="form.title" label="Название задачи" variant="outlined"></v-text-field>
        <v-textarea v-model="form.notes" label="Заметки к задаче" variant="outlined"></v-textarea>

        <v-btn @click="addTask">добавить</v-btn>
      </v-col>

      {{ form }}

      <v-col cols="4" v-for="task of tasks" :key="task.id">
        <TaskCard :task="task" @delete-task="deleteTask" />
      </v-col>
    </v-row>
  </v-container>
</template>