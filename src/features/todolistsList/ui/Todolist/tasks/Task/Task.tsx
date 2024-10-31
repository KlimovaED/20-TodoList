import React, { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { TaskType } from "../../../../api/taskApiType"
import { tasksThunks } from "../../../../model/tasksSlice"
import { useAppDispatch } from "../../../../../../common/hooks"
import s from './task.module.css'

type Props = {
  task: TaskType
  todolistId: string
}

export const Task= ({ task,todolistId}: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ taskId: task.id, todolistId: todolistId }))
  }

  const updateTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(
      tasksThunks.updateTask({ taskId:task.id, domainModel: { status: status }, todolistId: todolistId }),
    )
  }

  const updateTaskTitleHandler = (newValue: string) => {
    dispatch(
      tasksThunks.updateTask({ taskId: task.id, domainModel: { title: newValue }, todolistId: todolistId }),
    )
  }

  const isTaskCompleted = task.status === TaskStatuses.Completed

  return (
    <div key={task.id} className={isTaskCompleted ? s.isDone : ""}>
      <Checkbox  checked={isTaskCompleted} color="primary" onChange={updateTaskStatusHandler} />
      <EditableSpan value={task.title} onChange={updateTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
