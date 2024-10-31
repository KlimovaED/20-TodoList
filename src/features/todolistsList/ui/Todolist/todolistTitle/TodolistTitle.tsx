import React from "react"
import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import {
  TodolistDomainType,
  todolistsThunks
} from "../../../model/todolistsSlice"
import { useAppDispatch } from "common/hooks"



type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({todolist}:Props) => {
  const dispatch = useAppDispatch()

  const removeTodolist = () => {
    dispatch(todolistsThunks.removeTodolist(todolist.id))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id:todolist.id, title }))
  }
  return (
    <h3>
      <EditableSpan value={todolist.title}
                    onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodolist}
                  disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  )
}

