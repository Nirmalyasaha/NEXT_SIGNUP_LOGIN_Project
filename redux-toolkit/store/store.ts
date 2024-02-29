import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import rootReducer from "../slices/rootReducer";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";

import persistStore from "redux-persist/lib/persistStore";



const persistConfig={
  key:"persistConfig",
  storage,
  version:1
  

}
const _combined = combineReducers(rootReducer); 

const persistedReducer=persistReducer(
  persistConfig,
  _combined
)as unknown as typeof _combined;



//Middlewares

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  ],
  devTools: process.env.NODE_ENV === "development"
});


export const persiststore=persistStore(store)




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
