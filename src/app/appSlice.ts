import {
  createSlice,
  isFulfilled,
  isPending, isRejected,
  PayloadAction
} from "@reduxjs/toolkit"
import { todolistsThunks } from "../features/todolistsList/model/todolistsSlice"
import { tasksThunks } from "../features/todolistsList/model/tasksSlice"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending/*(todolistsThunks.fetchTodolists)*/,(state) => { // только на одном случае включена
      state.status ='loading'
    })
    builder.addMatcher(isFulfilled,(state) => {
      state.status ='succeeded'
    })
    builder.addMatcher(isRejected,(state,action:any) => {
      state.status ='failed'
      if (action.payload) {
        if(action.type === todolistsThunks.addTodolist.rejected.type
          || action.type === tasksThunks.addTask.rejected.type){
          return
        }
        state.error = action.payload.messages[0]
      } else {
        state.error = action.error.message ? action.error.message : 'Some error occurred'
      }
    })
  },
  selectors: {
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const { selectError, selectStatus, selectIsInitialized } = slice.selectors
export const appPath = slice.reducerPath
export type AppInitialState = ReturnType<typeof slice.getInitialState>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
