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
  USER_UPDATE_PROFILE_PICTURE_REQUEST,
  USER_UPDATE_BACKGROUND_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_SUCCESS,
  USER_UPDATE_BACKGROUND_PICTURE_SUCCESS,
  USER_UPDATE_PROFILE_PICTURE_FAIL,
  USER_UPDATE_BACKGROUND_PICTURE_FAIL,
  SEARCH_USER_SUCCUSS,
  SEARCH_USER_FAILURE,
} from "./auth.action.Type";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUser: [],
  isAuthenticated: false, // Added authentication flag
  lastAction: null, // For debugging
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        lastAction: action.type,
      };

    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(" Auth success, token received");
      return {
        ...state,
        jwt: action.payload,
        isAuthenticated: true, // Immediately set authenticated
        loading: false,
        error: null,
        lastAction: action.type,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        lastAction: action.type,
      };

    case USER_UPDATE_PROFILE_PICTURE_REQUEST:
    case USER_UPDATE_BACKGROUND_PICTURE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_UPDATE_PROFILE_PICTURE_SUCCESS:
    case USER_UPDATE_BACKGROUND_PICTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_UPDATE_PROFILE_PICTURE_FAIL:
    case USER_UPDATE_BACKGROUND_PICTURE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEARCH_USER_SUCCUSS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };

    case SEARCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.response?.data?.message || action.payload.message,
      };

    default:
      return state;
  }
};
