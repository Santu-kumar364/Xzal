import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { reelReducer } from "./Reel/reel.reducer";
 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    reel: reelReducer
     
  },
});

 