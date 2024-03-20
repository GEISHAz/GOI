import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name : 'auth',
  initialState : {
    money : 500000,
    ready : false,
    point : 0
  },
  reducers : {
    setMoney : (state,action) => {
      state.money = state.money + action.payload
    },
    setReady : (state,action) => {
      state.ready = action.payload
    },
    setPoint: (state, action) => {
      state.point = state.point + action.payload;
    },
  }
})

export const { setUserNickname, setUserProfileImage, setIsLogin, setPreviousUserNickname } = authSlice.actions
export default gameSlice.reducer