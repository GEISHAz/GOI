import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/login/authSlice.js';
// import accessReducer from '../features/login/accessSlice.js';
import gameReducer from '../features/game/gameSlice.js';

const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['auth', 'game']
};

const rootReducer = combineReducers({
  auth : authReducer,
  // access : accessReducer
  game: gameReducer,
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