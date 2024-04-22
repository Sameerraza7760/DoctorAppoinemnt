// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const authPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["user"],
};
const rootReducer = {
  user: persistReducer(authPersistConfig, userReducer),
};
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
