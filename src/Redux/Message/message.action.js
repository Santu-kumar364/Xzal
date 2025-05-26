
import { api } from "../../config/Api";
import * as actionType from "./message.actionType";

// message.action.js
export const createMessage = (data) => async (dispatch) => {
  try {
    const response = await api.post('/api/messages', data);
    dispatch({ 
      type: actionType.CREATE_MESSAGE_SUCCESS, 
      payload: response.data 
    });
    return response.data; // Make sure this returns the full message
  } catch (error) {
    dispatch({ type: actionType.CREATE_MESSAGE_FAILURE, payload: error.message });
    throw error;
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_CHAT_REQUEST });
  try {
    // First check for existing chats
    const { data: existingChats } = await api.get('/api/message/chat/{chatId}');
    const existingChat = existingChats.find(c => 
      c.users.some(u => u.id === chat.userId)
    );

    if (existingChat) {
      dispatch({ 
        type: actionType.CREATE_CHAT_SUCCESS, 
        payload: existingChat 
      });
      return { payload: existingChat };
    }

    // Create new chat if none exists
    const { data } = await api.post('/api/chats', { userId: chat.userId });
    dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
    return { payload: data };

  } catch (error) {
    const errorData = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status
    };
    dispatch({ type: actionType.CREATE_CHAT_FAILURE, payload: errorData });
    throw errorData;
  }
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: actionType.GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await api.get('/api/chats');
    dispatch({ type: actionType.GET_ALL_CHATS_SUCCESS, payload: data });
    return { payload: data };
  } catch (error) {
    const errorData = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status
    };
    dispatch({ type: actionType.GET_ALL_CHATS_FAILURE, payload: errorData });
    throw errorData;
  }
};