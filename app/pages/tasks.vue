<script setup lang="ts">
const taskStore = useTask()
const router = useRouter()

let { tasks, editTaskDialog, currentTaskToEdit } = taskStore



let form = ref({
  title: "",
  notes: ""
})

let date = ref()
let time = ref()

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

let loading = ref<boolean>(false)

async function submitEdit() {
  loading.value = true

  await taskStore.editTask()

  editTaskDialog.value = false;
  loading.value = false;
}

async function addTask() {
  if (!date.value || !time.value) {
    alert("Введите дату и время")
    return;
  }

  let dateObj = new Date(date.value)

  // 11:55
  let [hours, minutes] = time.value.split(":")

  dateObj.setHours(hours)
  dateObj.setMinutes(minutes)

  let toSend = {
    title: form.value.title,
    notes: form.value.notes,
    deadline: dateObj.toISOString()
  }

  let res = await taskStore.addTask(toSend.title, toSend.notes, toSend.deadline)

  clearForm()
}

await taskStore.getAllTasks();
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="router.push('/')" prepend-icon="mdi-chevron-left">назад</v-btn>
      </v-col>

      <v-col cols="12">
        <v-text-field v-model="form.title" label="Название задачи" variant="outlined"></v-text-field>
        <v-textarea v-model="form.notes" label="Заметки к задаче" variant="outlined"></v-textarea>

        <v-row>
          <v-col cols="6">
            <v-date-picker height="300px" v-model="date"></v-date-picker>
          </v-col>
          <v-col cols="6">
            <v-time-picker v-model="time"></v-time-picker>
          </v-col>
        </v-row>

        <v-btn @click="addTask">добавить</v-btn>

      </v-col>

      <v-col cols="12" md="6" lg="4" v-for="task of tasks" :key="task._id">
        <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask" />
      </v-col>
    </v-row>

    <v-dialog v-model="editTaskDialog">
      <v-card v-if="currentTaskToEdit">
        <v-card-text>
          <v-text-field v-model="currentTaskToEdit.title" label="Название задачи" variant="outlined"></v-text-field>
          <v-textarea v-model="currentTaskToEdit.notes" label="Заметки к задаче" variant="outlined"></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="submitEdit" :loading="loading">отправить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>