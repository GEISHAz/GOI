import { createSlice } from '@reduxjs/toolkit';

export const accessSlice = createSlice({
  name : 'access',
  initialState : {
    accessToken: null,
    // refreshToken: null,
  },
  reducers : {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    // setRefreshToken: (state, action) => {
    //   state.refreshToken = action.payload;
    // },
  }  
})

export const { setAccessToken } = accessSlice.actions
export default accessSlice.reducer