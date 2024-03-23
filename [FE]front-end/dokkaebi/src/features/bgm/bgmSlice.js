import { createSlice } from '@reduxjs/toolkit';

export const bgmSlice = createSlice({
  name: 'bgm',
  initialState: {
    isPlaying: false,
  },
  reducers: {
    togglePlay: (state, action) => {
      // action.payload가 undefined가 아니면 명시적으로 상태를 설정, 그렇지 않으면 상태를 토글
      state.isPlaying = action.payload !== undefined ? action.payload : !state.isPlaying;
    },
}
});

export const { togglePlay } = bgmSlice.actions;
export default bgmSlice.reducer;