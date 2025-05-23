// import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import { thunk } from "redux-thunk";   
// import { authReducer } from "./Auth/auth.reducer";
// import { postReducer } from "./Post/post.reducer";
// import { reelReducer } from "./Reel/reel.reducer";

// const rootReducers = combineReducers({
//   auth: authReducer,
//   post: postReducer,
//   reel: reelReducer
// });

// export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));




// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { reelReducer } from "./Reel/reel.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    reel: reelReducer,
  },
});
