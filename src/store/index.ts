import { configureStore } from '@reduxjs/toolkit';
import rickAndMortyReducer from './slices/rickAndMortySlice'
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    rickAndMorty: rickAndMortyReducer,
    user:userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;