import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import { useDispatch, useSelector } from "react-redux";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/SearchUser/SearchUser";
import "./Message.css";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { UploadToCloudinary } from "../../Utils/UploadToCloudinary";

const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await UploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };
 
  const handleCreateMessage = async (value, e) => {
    if (!value.trim() && !selectedImage) return;

    try {
      const messageData = {
        chatId: currentChat?.id,
        content: value,
        image: selectedImage,
      };

      await dispatch(createMessage(messageData));

      if (e?.target) e.target.value = "";
      setSelectedImage("");
      
      // Refresh messages after sending
      if (currentChat) {
        const updatedChat = message.chats.find(c => c.id === currentChat.id);
        if (updatedChat) {
          setMessages(updatedChat.messages || []);
        }
      }

      setTimeout(() => {
        const container = document.querySelector(".messages-container");
        if (container) container.scrollTop = container.scrollHeight;
      }, 100);

    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  useEffect(() => {
    if (currentChat) {
      // Find the current chat in the chats array to get updated messages
      const chat = message.chats?.find(chat => chat.id === currentChat.id);
      if (chat) {
        setMessages(chat.messages || []);
      }
    }
  }, [message.chats, currentChat]);

  // Auto-select the chat with Ajeet Gupta if it exists
  useEffect(() => {
    if (message.chats && !currentChat) {
      const ajeetChat = message.chats.find(chat => 
        chat.users.some(user => 
          user.firstName === "Ajeet" && user.lastName === "Gupta"
        )
      );
      if (ajeetChat) {
        setCurrentChat(ajeetChat);
        setMessages(ajeetChat.messages || []);
      }
    }
  }, [message.chats, currentChat]);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message?.chats?.map((item) => (
                    <UserChatCard
                      key={item.id}
                      chat={item}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages || []);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-1 p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src={
                    auth.user?.id === currentChat.users[0]?.id
                      ? currentChat.users[1]?.profilePicture
                      : currentChat.users[0]?.profilePicture
                  } />
                  <p>
                    {auth.user?.id === currentChat.users[0]?.id
                      ? `${currentChat.users[1]?.firstName} ${currentChat.users[1]?.lastName}`
                      : `${currentChat.users[0]?.firstName} ${currentChat.users[0]?.lastName}`}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div className="messages-container hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                {messages.map((item) => (
                  <ChatMessage key={item.id} item={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-1">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2 "
                    src={selectedImage}
                    alt=""
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value, e);
                      }
                    }}
                    className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                    placeholder="Type message..."
                    type="text"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    className="hidden"
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <AddPhotoAlternateIcon />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "12rem" }} />
              <p className="text-xl font-semibold">No Chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;