import { AppDispatch, AppRootStateType } from "app/store"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { appActions } from "app/appSlice"
import { BaseResponse } from "common/types"

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  /*dispatch(appActions.setAppStatus({ status: "loading" }))*/// addMatches
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } /*finally {
    dispatch(appActions.setAppStatus({ status: "idle" }))
  }*/
}
