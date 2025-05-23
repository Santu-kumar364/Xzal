import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

const initialState = {
  posts: [], // All posts
  currentPost: null, // Single post (for create/update operations)
  loading: false,
  error: null,
  comments: [],
  newComment: [],
  like: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle all request actions
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LIKE_POST_REQUEST:
      return {
        ...state,
        likeOperation: {
          ...state.likeOperation,
          loading: true,
          error: null,
        },
      };

    // Handle success cases
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentPost: action.payload,
        posts: [action.payload, ...state.posts],
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
        comments: action.payload.comments,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, liked: action.payload.liked }
            : post
        ),
        loading: false,
        error: null,
      };

    // Handle failure cases
    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LIKE_POST_FAILURE:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) => item.id === action.payload),
        loading: false,
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: action.payload,
        // comments:[action.payload, ...state.comments],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
