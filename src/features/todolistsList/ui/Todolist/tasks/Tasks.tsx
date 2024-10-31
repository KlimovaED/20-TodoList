import React from "react"
import { Task } from "./Task/Task"
import { TodolistDomainType } from "../../../model/todolistsSlice"
import { TaskType } from "../../../api/taskApiType"
import { useSelector } from "react-redux"
import { selectFilterTask } from "../../../model/tasksSlice"
import { AppRootStateType } from "../../../../../app/store"

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = ({ todolist }: Props) => {
  const tasksForTodolist = useSelector<AppRootStateType, TaskType[]>((state) =>
    selectFilterTask(state, todolist.id, todolist.filter),
  )

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  )
}
