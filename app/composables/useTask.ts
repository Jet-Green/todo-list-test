import type { Task } from "~/types/task.interface"

export function useTask() {
  let tasks = useState<Task[]>(() => [])

  let currentTaskToEdit = useState<Task | undefined>()
  let editTaskDialog = useState<boolean>(() => false)

  async function deleteTask(_id: string) {
    try {
      const config = useRuntimeConfig()

      let res = await $fetch<Boolean>(config.apiUrl + "tasks/delete-task", {
        method: "POST",
        body: { _id }
      })
      if (res) {
        for (let i = 0; i < tasks.value.length; i++) {
          if (tasks.value[i]?._id == _id) {
            tasks.value.splice(i, 1)
            break;
          }
        }
      }
    } catch (error) {
      console.log("useTask/addTask error", error)
    }
  }

  async function getAllTasks() {
    try {
      const config = useRuntimeConfig()

      let response = await $fetch<Task[]>(config.apiUrl + "tasks/get-all", { method: "GET" })

      tasks.value = response
    } catch (error) {
      console.log("useTask/getAllTasks error", error);
    }
  }

  async function addTask(title: string, notes: string) {
    try {
      const config = useRuntimeConfig()

      let res = await $fetch<Task>(config.apiUrl + "tasks/add-task", {
        method: "POST",
        body: { "title": title, "notes": notes }
      })

      if (res._id) {
        tasks.value.push(res)
      }
    } catch (error) {
      console.log("useTask/addTask error", error)
    }
  }

  function openEditDialog(_id: string) {
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i]?._id == _id) {
        currentTaskToEdit.value = tasks.value[i];
        editTaskDialog.value = true;
        return;
      }
    }
  }

  async function editTask() {
    try {
      if (!currentTaskToEdit.value) {
        return;
      }

      const config = useRuntimeConfig()

      let res = await $fetch<Task>(config.apiUrl + "tasks/edit-task", {
        method: "POST",
        body: currentTaskToEdit.value
        /*
        {_id
        title
        notes}
        */
      })

      if (res._id) {
        for (let i = 0; i < tasks.value.length; i++) {
          if (tasks.value[i]?._id == res._id) {
            tasks.value[i] = res
          }
        }
      }
    } catch (error) {
      console.log("useTask/editTask error", error)
    }
  }

  return {
    // variables
    tasks, currentTaskToEdit, editTaskDialog,
    // functions
    addTask, deleteTask, getAllTasks, openEditDialog, editTask
  }
}