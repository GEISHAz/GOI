import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
  name : 'room',
  initialState : {
    roomTitle : null,
    roomPassword : null,
    roomYears : null,
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
  }  
})

export const { setRoomTitle, setRoomPassword, setRoomYears } = roomSlice.actions
export default roomSlice.reducer