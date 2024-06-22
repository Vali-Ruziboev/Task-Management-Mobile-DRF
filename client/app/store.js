import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import taskReducer from "../features/task/taskSlice";
import taskModalReducer from "../features/modal/taskModalSlice";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../services/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    taskModal: taskModalReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
