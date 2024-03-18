import {createSlice} from "@reduxjs/toolkit";
import {request} from "@/utils/request";
import {setToken as _setToken,getToken} from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken('token_key') || ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      //localStorage存
      _setToken(action.payload)
    }
  }
})

const {setToken} = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
  }
}

export {setToken, fetchLogin}

export default userReducer