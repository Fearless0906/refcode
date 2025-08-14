import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import snippetReducer from "@/slices/snippetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snippet: snippetReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
