import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "../../model/tasksSlice"
import { TodolistDomainType } from "../../model/todolistsSlice"
import { FilterTasksButtons } from "./filterTasksButton/FilterTasksButtons"
import { Tasks } from "./tasks/Tasks"
import { TodolistTitle } from "./todolistTitle/TodolistTitle"

type Props = {
  todolist: TodolistDomainType
}

export const Todolist = (props: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id))
  }, [])

  const addTask = (title: string) => {
 return    dispatch(tasksThunks.addTask({ title, todolistId: props.todolist.id }))
  }

  return (
    <>
      <TodolistTitle todolist={props.todolist} />
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <Tasks todolist={props.todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </>
  )
}
