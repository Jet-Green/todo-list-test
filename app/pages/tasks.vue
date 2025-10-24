<script setup lang="ts">
const taskStore = useTask()
const router = useRouter()

let { tasks, editTaskDialog, currentTaskToEdit } = taskStore



let form = ref({
  title: "",
  notes: ""
})

function deleteTask(_id: string) {
  taskStore.deleteTask(_id)
}
function editTask(_id: string) {
  taskStore.openEditDialog(_id)
}

function clearForm() {
  form.value.title = ""
  form.value.notes = ""
}

async function addTask() {
  let toSend = {
    title: form.value.title,
    notes: form.value.notes,
  }

  let res = await taskStore.addTask(toSend.title, toSend.notes)

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

      <v-col cols="4" v-for="task of tasks" :key="task._id">
        <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask" />
      </v-col>
    </v-row>

    <v-dialog v-model="editTaskDialog">
      <v-card v-if="currentTaskToEdit">
        <v-text-field v-model="currentTaskToEdit.title" label="Название задачи" variant="outlined"></v-text-field>
        <v-textarea v-model="currentTaskToEdit.notes" label="Заметки к задаче" variant="outlined"></v-textarea>

        <v-btn @click="">отправить</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>