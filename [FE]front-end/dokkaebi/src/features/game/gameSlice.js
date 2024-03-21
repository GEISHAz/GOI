import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name : 'game',
  initialState : {
    money : 500000,
    point : 0,
    ready : false,
    stockInfos : [],
  },
  reducers : {
    setMoney : (state,action) => {
      state.money = action.payload
    },
    setIncreaseMoney : (state,action) => {
      state.money = state.money + action.payload
    },
    setDecreaseMoney : (state,action) => {
      state.money = state.money - action.payload
    },
    setIncreasePoint: (state, action) => {
      state.point = state.point + action.payload;
    },setDecreasePoint: (state, action) => {
      state.point = state.point - action.payload;
    },
    setReady : (state,action) => {
      state.ready = action.payload
    },
    setAddStockInfos : (state,action) => {
      const newItem = action.payload;
      state.stockInfos.push({
        company: newItem.compamy,
        turn: newItem.turn,
        title: newItem.title,
      });
    },
    setRemoveStockInfos(state, action) {
      state.stockInfos = []
    },
  }
})

export const {
  setMoney,
  setIncreaseMoney,
  setDecreaseMoney,
  setIncreasePoint,
  setDecreasePoint,
  setReady,
  setAddStockInfos,
  setRemoveStockInfos
} = gameSlice.actions;

export default gameSlice.reducer;