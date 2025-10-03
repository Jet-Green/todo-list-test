import type { Task } from "~/types/task.interface"

export function useTask() {
  let tasks = useState<Task[]>(() => [
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

  return {
    // variables
    tasks,
    // functions
    addTask, deleteTask,
  }
}