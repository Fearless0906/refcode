import { authState, ResetPasswordConfirm, Signup, User } from "@/types/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "@/services/authService";

const loadInitialState = (): authState => {
  return {
    user: null,
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
    success: false,
  };
};

const initialState: authState = loadInitialState();

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      dispatch(start());
      const response = await authService.login({ email, password });
      dispatch(success({ token: response.access }));

      // fetch user
      const user = await authService.getUser(response.access);
      dispatch(
        setUser({
          ...user,
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          avatar: user.avatar || "",
        })
      );

      return response.access;
    } catch (error: any) {
      const message = error.response?.data?.detail || "login failed";
      dispatch(failure(message));
      throw new Error(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: Signup, { dispatch }) => {
    try {
      dispatch(start());
      const response = await authService.signup({
        ...data,
      });
      dispatch(signupSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.detail || "Signup failed";
      dispatch(failure(message));
      throw new Error(message);
    }
  }
);

export const activateAccount = createAsyncThunk(
  "auth/activate",
  async (
    { uid, token }: { uid: string; token: string },
    { dispatch, rejectWithValue }
  ) => {
    // Only require token to be present (uid can be empty for activation codes)
    if (!token) {
      return rejectWithValue(
        "Invalid activation link. Missing activation token."
      );
    }

    try {
      dispatch(start());
      const response = await authService.activate({ uid, token });
      dispatch(activateSuccess());
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data ||
        "Activation failed";
      dispatch(activationFailure(message));
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(start());
      await authService.resetPassword({ email });
      dispatch(resetPasswordSuccess());
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Failed to send reset password email!";
      dispatch(failure(message));
      return rejectWithValue(message);
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (data: ResetPasswordConfirm, { dispatch, rejectWithValue }) => {
    try {
      dispatch(start());
      await authService.resetPasswordConfirm(data);
      dispatch(resetPasswordSuccess());
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Failed to reset password!";
      dispatch(failure(message));
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    failure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    signupSuccess: (state) => {
      state.loading = false;
    },
    activateSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    activationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
  },
});

export const {
  start,
  success,
  failure,
  logout,
  setUser,
  signupSuccess,
  activateSuccess,
  activationFailure,
  resetPasswordSuccess,
} = authSlice.actions;
export default authSlice.reducer;
