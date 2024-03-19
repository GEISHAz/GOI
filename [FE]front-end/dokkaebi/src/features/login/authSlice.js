import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name : 'auth',
  initialState : {
    userNickname : null,
    userProfileImage : null,
    previousUserNickname: null,
    isLogin: false,
  },
  reducers : {
    setUserNickname : (state,action) => {
      state.userNickname = action.payload
    },
    setUserProfileImage : (state,action) => {
      state.userProfileImage = action.payload
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setPreviousUserNickname: (state, action) => {
      state.previousUserNickname = action.payload;
    },
  }  
})

export const { setUserNickname, setUserProfileImage, setIsLogin, setPreviousUserNickname } = authSlice.actions
export default authSlice.reducer