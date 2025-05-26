import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  USER_UPDATE_BACKGROUND_PICTURE_FAIL,
  USER_UPDATE_BACKGROUND_PICTURE_SUCCESS,
  USER_UPDATE_BACKGROUND_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_SUCCESS,
  USER_UPDATE_PROFILE_PICTURE_FAIL,
  SEARCH_USER_SUCCUSS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_FAILURE,
} from "./auth.action.Type";
import axios from "axios";
import { api, API_BASE_URL } from "../../config/Api";

export const loginUserAction = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${API_BASE_URL}auth/signin`, loginData);

    if (data.token || data.jwt) {
      localStorage.setItem("jwt", data.token || data.jwt);
    }

    console.log("Login success:", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token || data.jwt });
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

 
export const registerUserAction = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const { data } = await axios.post(
      `${API_BASE_URL}auth/signup`,
      registerData.data
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    console.log("Register success:", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });
    const { data } = await axios.get(`${API_BASE_URL}api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    console.log("profile_ _ _ _ ", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("_ _ _ _ _ _", error);
    dispatch({type: GET_PROFILE_FAILURE, payload: error});
  }
};

 

export const updateProfileAction = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const { data } = await api.put(`${API_BASE_URL}api/users`, reqData);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    return { success: true };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: errorMsg });
    return { success: false, error: errorMsg };
  }
};
 

 

export const updateProfilePicture = (imageUrl) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_PICTURE_REQUEST });
    
    const { data } = await axios.put(
      `${API_BASE_URL}api/users/profile/picture`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );

    dispatch({
      type: USER_UPDATE_PROFILE_PICTURE_SUCCESS,
      payload: data,
    });
    return data; // Return the updated user data
  } catch (error) {
    console.error("Profile picture update error:", error);
    dispatch({
      type: USER_UPDATE_PROFILE_PICTURE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const updateBackgroundPicture = (imageUrl) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_BACKGROUND_PICTURE_REQUEST });
    
    const { data } = await axios.put(
      `${API_BASE_URL}api/users/profile/background`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }
    );

    dispatch({
      type: USER_UPDATE_BACKGROUND_PICTURE_SUCCESS,
      payload: data,
    });
    return data; // Return the updated user data
  } catch (error) {
    console.error("Background picture update error:", error.response?.data || error);
    dispatch({
      type: USER_UPDATE_BACKGROUND_PICTURE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

 

 
export const searchUser = (query) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_USER_REQUEST });
    const { data } = await api.get(`api/users/search?query=${query}`);
    dispatch({ type: SEARCH_USER_SUCCUSS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.log("Search error:", errorMessage);
    dispatch({
      type: SEARCH_USER_FAILURE, 
      payload: errorMessage // Store only the error message string
    });
  }
};