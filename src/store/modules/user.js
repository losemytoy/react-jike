import {createSlice} from "@reduxjs/toolkit";
import {setToken as _setToken, getToken, removeToken} from "@/utils";
import {getProfileAPI, loginAPI} from "@/apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      //localStorage存
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

const {setToken, setUserInfo, clearUserInfo} = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}

export {setToken, fetchLogin, fetchUserInfo, clearUserInfo}

export default userReducer