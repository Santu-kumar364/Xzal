import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

 
import axios from "axios";

export const createReelAction = createAsyncThunk(
  "reel/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/reels", payload); // Use api instance which has baseURL configured
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);


// Get All Reels
export const getAllReelsAction = createAsyncThunk(
  'reels/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/reels");
      return data;
    } catch (error) {
      // Return a plain object with error details instead of the full error
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch reels",
        status: error.response?.status
      });
    }
  }
);

// Get User Reels
export const getUserReelsAction = createAsyncThunk(
  'reels/getUserReels',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/reels/user/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user reels");
    }
  }
);

// Delete Reel
export const deleteReelAction = createAsyncThunk(
  'reels/delete',
  async (reelId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/reels/${reelId}`);
      return reelId; // Return the ID for filtering in reducer
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete reel");
    }
  }
);