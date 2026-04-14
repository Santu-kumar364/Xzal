// reel.reducer.js
import { createReducer } from '@reduxjs/toolkit';
import {
  createReelAction,
  getAllReelsAction,
  getUserReelsAction,
  deleteReelAction
} from './reel.action';

const initialState = {
  reels: [],
  userReels: [],
  loading: false,
  error: null,
  createReelLoading: false,
  deleteReelLoading: false,
};

export const reelReducer = createReducer(initialState, (builder) => {
  builder
    // Create Reel
    .addCase(createReelAction.pending, (state) => {
      state.createReelLoading = true;
      state.error = null;
    })
    .addCase(createReelAction.fulfilled, (state, action) => {
      state.reels.unshift(action.payload);
      state.createReelLoading = false;
    })
    .addCase(createReelAction.rejected, (state, action) => {
      state.createReelLoading = false;
      state.error = action.payload;
    })
    
    // Get All Reels
    .addCase(getAllReelsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllReelsAction.fulfilled, (state, action) => {
      state.reels = action.payload;
      state.loading = false;
    })
    .addCase(getAllReelsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    // Get User Reels
    .addCase(getUserReelsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUserReelsAction.fulfilled, (state, action) => {
      state.userReels = action.payload;
      state.loading = false;
    })
    .addCase(getUserReelsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    // Delete Reel
    .addCase(deleteReelAction.pending, (state) => {
      state.deleteReelLoading = true;
      state.error = null;
    })
    .addCase(deleteReelAction.fulfilled, (state, action) => {
      state.reels = state.reels.filter(reel => reel.id !== action.payload);
      state.userReels = state.userReels.filter(reel => reel.id !== action.payload);
      state.deleteReelLoading = false;
    })
    .addCase(deleteReelAction.rejected, (state, action) => {
      state.deleteReelLoading = false;
      state.error = action.payload;
    });
});



