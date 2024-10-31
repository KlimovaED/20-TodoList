import { TaskPriorities, TaskStatuses } from "../../../common/enums"


export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type AddTaskArgType = {
  title: string
  todolistId: string
}

export type UpdateTaskArgType = {
  taskId: string
  domainModel: Partial<UpdateTaskModelType>
  todolistId: string
}

export type RemoveTaskArgType = {
  todolistId: string
  taskId: string
}



export type TasksStateType = {
  [key: string]: Array<TaskType>
}
