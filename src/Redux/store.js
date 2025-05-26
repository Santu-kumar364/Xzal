 



// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./Auth/auth.reducer";
// import { postReducer } from "./Post/post.reducer";
// import { reelReducer } from "./Reel/reel.reducer";
// import { messageReducer } from "./Message/message.reducer";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     post: postReducer,
//     reel: reelReducer,
//     message: messageReducer
//   },
// });


import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { reelReducer } from "./Reel/reel.reducer";
import { messageReducer } from "./Message/message.reducer";

// 1. Import required dependencies
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// 2. Create persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['message'], // only persist the message reducer
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, messageReducer);

// 4. Configure store with middleware
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    reel: reelReducer,
    message: persistedReducer, // use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Create persistor
export const persistor = persistStore(store);