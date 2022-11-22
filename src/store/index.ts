import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app-splice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const {
  setAllGenders,
  setAllSeries,
  setCurrentUser,
  setToken,
  setLoading,
  setUserId,
  setLogout,
  setContainerLoader,
  setNotificationCount,
  setNotificationReset,
  setNotificationData,
} = appSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
