import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../store'; // Assuming you have a root store

interface AuthState {
  user: any | null; // Replace 'any' with your User interface
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null, // Could be stored in localStorage and hydrated
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => { // Replace 'any'
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // localStorage.setItem('token', action.payload.token); // Example for persistence
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state) => { // You might want to auto-login or just indicate success
      state.isLoading = false;
      // Optionally, set isAuthenticated to true and store user/token if API returns them
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      // localStorage.removeItem('token'); // Example for persistence
    },
    // TODO: Add reducers for token refresh, loading user from token, etc.
  },
  // Extra reducers for handling async thunks or API calls from authApi can be added here
  // using builder.addMatcher or builder.addCase
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

// Selectors
// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
// export const selectUser = (state: RootState) => state.auth.user;
// export const selectAuthToken = (state: RootState) => state.auth.token;
// export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
// export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;