import type { Task } from "~/types/task.interface"

export function useTask() {
  let tasks = useState<Task[]>(() => [])


  function addTask(task: Task) {
    tasks.value.push(task)
  }

  function deleteTask(id: number) {
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i]?.id == id) {
        tasks.value.splice(i, 1)
        break;
      }
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

  return {
    // variables
    tasks,
    // functions
    addTask, deleteTask, getAllTasks,
  }
}