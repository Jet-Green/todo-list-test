import type { Task } from "~/types/task.interface"

export function useTask() {
  let tasks = useState<Task[]>(() => [])

  let currentTaskToEdit = useState<Task | undefined>()
  let editTaskDialog = useState<boolean>(() => false)

  async function deleteTask(_id: string) {
    // TODO: сделать запрос на бэкенд: DELETE /tasks/delete-task
    // const config = useRuntimeConfig()
    // let res = await $fetch<Boolean>(config.public.apiUrl + "tasks/delete-task", {
    //   method: "POST",
    //   body: { _id }
    // })

    // Имитация успешного ответа от сервера
    const res = true

    if (res) {
      tasks.value = tasks.value.filter(task => task._id !== _id)
    }
  }

  async function getAllTasks() {
    // TODO: сделать запрос на бэкенд: GET /tasks/get-all
    // const config = useRuntimeConfig()
    // let response = await $fetch<Task[]>(config.public.apiUrl + "tasks/get-all", { method: "GET" })
    // tasks.value = response

    // Имитация ответа от сервера (пустой массив или демо-данные)
    tasks.value = [
      {
        _id: "1",
        title: "Пример задачи",
        notes: "Описание задачи",
        deadline: "2025-12-20T10:00:00Z",
      }
    ]
  }

  async function addTask(title: string, notes: string, deadline: string) {
    // TODO: сделать запрос на бэкенд: POST /tasks/add-task
    // const config = useRuntimeConfig()
    // let res = await $fetch<Task>(config.public.apiUrl + "tasks/add-task", {
    //   method: "POST",
    //   body: { title, notes, deadline }
    // })

    // Имитация ответа от сервера с новым ID
    const newTask: Task = {
      _id: String(Date.now()), // временный ID
      title,
      notes,
      deadline,
    }

    tasks.value.push(newTask)
  }

  function openEditDialog(_id: string) {
    const task = tasks.value.find(t => t._id === _id)
    if (task) {
      currentTaskToEdit.value = { ...task }
      editTaskDialog.value = true
    }
  }

  async function editTask() {
    if (!currentTaskToEdit.value) return

    // TODO: сделать запрос на бэкенд: POST /tasks/edit-task
    // const config = useRuntimeConfig()
    // let res = await $fetch<Task>(config.public.apiUrl + "tasks/edit-task", {
    //   method: "POST",
    //   body: currentTaskToEdit.value
    // })

    // Имитация обновления задачи
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i] !== undefined && tasks.value[i]?._id == currentTaskToEdit.value._id) {
        tasks.value[i].deadline = currentTaskToEdit.value.deadline
        tasks.value[i].notes = currentTaskToEdit.value.notes
        tasks.value[i].title = currentTaskToEdit.value.title
        break
      }
    }
  }


  return {
    // variables
    tasks,
    currentTaskToEdit,
    editTaskDialog,
    // functions
    addTask,
    deleteTask,
    getAllTasks,
    openEditDialog,
    editTask
  }
}