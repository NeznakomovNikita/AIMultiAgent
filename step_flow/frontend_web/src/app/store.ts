import { configureStore } from '@reduxjs/toolkit';
// Импортируйте здесь ваши редьюсеры
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // Добавьте здесь ваши редьюсеры
    // counter: counterReducer,
  },
});

// Типизация для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;