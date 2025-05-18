import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  // Другие поля пользователя, если нужны
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess(state) { // Можно добавить user и token, если API их возвращает сразу
      state.isLoading = false;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  // Сюда можно будет добавить extraReducers для обработки async thunks,
  // если мы будем использовать createAsyncThunk для запросов к API.
  // Например:
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //     })
  //     .addCase(loginUser.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.error.message || 'Failed to login';
  //     });
  // }
});

export const { 
  loginStart, loginSuccess, loginFailure, 
  registerStart, registerSuccess, registerFailure,
  logout 
} = authSlice.actions;

export default authSlice.reducer;