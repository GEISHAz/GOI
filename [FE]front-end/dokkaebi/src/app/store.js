import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/login/authSlice.js';
import bgmReducer from '../features/bgm/bgmSlice.js';
import channelReducer from '../features/channel/channelSlice.js';
import gameReducer from '../features/game/gameSlice.js';
import addFriendReducer from '../features/addFriend/addFriendSlice.js'
import roomReducer from '../features/square/roomSlice.js'

const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['auth', 'game', 'room', 'channel', 'bgm', 'addFriend']
};

const rootReducer = combineReducers({
  auth : authReducer,
  // access : accessReducer
  game: gameReducer,
  room: roomReducer,
  channel: channelReducer,
  bgm: bgmReducer,
  addFriend: addFriendReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // 비직렬화 가능한 값 경고를 무시하고 싶은 액션 타입 지정할 수 있음
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});


export const persistor = persistStore(store);