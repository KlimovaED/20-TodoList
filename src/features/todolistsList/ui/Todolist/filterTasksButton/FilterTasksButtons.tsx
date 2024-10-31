import React from "react"
import { Button } from "@mui/material"
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions
} from "../../../model/todolistsSlice"
import { useDispatch } from "react-redux"

type Props = {
  todolist: TodolistDomainType
}


export const FilterTasksButtons = ({todolist}:Props) => {
  const dispatch = useDispatch()

  const changeTodolistFilterHandler = (filter:FilterValuesType)=>{
    dispatch(todolistsActions.changeTodolistFilter({ id:todolist.id, filter: filter }))
  }

  return (
    <>
      <Button variant={todolist.filter === "all" ? "outlined" : "text"}
              onClick={()=>changeTodolistFilterHandler("all")}
              color={"inherit"}>All</Button>

      <Button variant={todolist.filter === "active" ? "outlined" : "text"}
              onClick={()=>changeTodolistFilterHandler("active")}
              color={"primary"}>Active</Button>

      <Button variant={todolist.filter === "completed" ? "outlined" : "text"}
              onClick={()=>changeTodolistFilterHandler("completed")}
              color={"secondary"}>Completed</Button>
    </>
  )
}

