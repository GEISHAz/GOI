import { createSlice } from '@reduxjs/toolkit';

export const addFriendSlice = createSlice({
  name : 'addFriend',
  initialState : {
    alarmId: null,
  },
  reducers : {
    setAlarmId : (state,action) => {
      state.alarmId = action.payload
    },
  }  
})

export const { setAlarmId } = addFriendSlice.actions
export default addFriendSlice.reducer