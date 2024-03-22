import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
  name : 'channel',
  initialState : {
    channelId: null,
  },
  reducers : {
    setChannelId : (state,action) => {
      state.channelId = action.payload
    },
  }  
})

export const { setChannelId } = channelSlice.actions
export default channelSlice.reducer