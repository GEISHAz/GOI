import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
  name : 'room',
  initialState : {
    roomTitle : null,
    roomPassword : null,
    roomYears : null,
    roomNum: null,
    userCnt: null,
  },
  reducers : {
    setRoomTitle : (state,action) => {
      state.roomTitle = action.payload
    },
    setRoomPassword : (state,action) => {
      state.roomPassword = action.payload
    },
    setRoomYears: (state, action) => {
      state.roomYears = action.payload;
    },
    setRoomNum: (state, action) => {
      state.roomNum = action.payload;
    },
    setUserCnt: (state, action) => {
      state.userCnt = action.payload;
    },
  }  
})

export const { setRoomTitle, setRoomPassword, setRoomYears, setRoomNum, setUserCnt } = roomSlice.actions
export default roomSlice.reducer