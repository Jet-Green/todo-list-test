import type { Task } from "~/types/task.interface"

export function useTask() {
  let tasks = useState<Task[]>(() => [])

  let currentTaskToEdit = useState<Task | undefined>()
  let editTaskDialog = useState<boolean>(() => false)

  async function deleteTask(_id: string) {
    try {
      let res = await $fetch<Boolean>("http://localhost:5000/tasks/delete-task", {
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
      let response = await $fetch<Task[]>("http://localhost:5000/tasks/get-all", { method: "GET" })

      tasks.value = response
    } catch (error) {
      console.log("useTask/getAllTasks error", error);
    }
  }

  async function addTask(title: string, notes: string) {
    try {
      let res = await $fetch<Task>("http://localhost:5000/tasks/add-task", {
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

  return {
    // variables
    tasks, currentTaskToEdit, editTaskDialog,
    // functions
    addTask, deleteTask, getAllTasks, openEditDialog
  }
}