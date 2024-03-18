import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store";

export default configureStore({
  reducer: {
    user: userReducer
  }
})

