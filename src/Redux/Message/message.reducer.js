import * as actionType from "./message.actionType";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
 newMessage: null
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_MESSAGE_REQUEST:
    case actionType.CREATE_CHAT_REQUEST:
    case actionType.GET_ALL_CHATS_REQUEST:
      return { ...state, loading: true, error: null };

    case actionType.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        newMessage: action.payload, // Store the new message
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? {
                ...chat,
                messages: [...(chat.messages || []), action.payload],
              }
            : chat
        ),
        loading: false,
      };

    case actionType.GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        loading: false,
      };

    case actionType.CREATE_CHAT_SUCCESS:
      // Prevent duplicate chats
      const chatExists = state.chats.some(
        (chat) => chat.id === action.payload.id
      );
      return {
        ...state,
        loading: false,
        chats: chatExists ? state.chats : [action.payload, ...state.chats],
      };

    case actionType.GET_ALL_CHATS_SUCCESS:
      return { ...state, loading: false, chats: action.payload };

    case actionType.CREATE_MESSAGE_FAILURE:
    case actionType.CREATE_CHAT_FAILURE:
    case actionType.GET_ALL_CHATS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
