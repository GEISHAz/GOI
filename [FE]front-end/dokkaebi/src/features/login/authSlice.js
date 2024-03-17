import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name : 'auth',
  initialState : {
    userNickname : null,
    userProfileImage : null,
  },
  reducers : {
    setUserNickname : (state,action) => {
      state.userNickname = action.payload
    },
    setUserProfileImage : (state,action) => {
      state.userProfileImage = action.payload
    },
  }  
})

export const { setUserNickname, setUserProfileImage } = authSlice.actions
export default authSlice.reducer