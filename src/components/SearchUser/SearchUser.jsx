import { 
  Avatar, 
  Card, 
  CardHeader, 
  CircularProgress, 
  Typography,
  InputBase 
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";
import { createChat, getAllChats } from "../../Redux/Message/message.action";
import { debounce } from "lodash";

const SearchUser = ({ onUserSelect }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { message = { chats: [] }, auth = {} } = useSelector((store) => ({
    message: store.message || { chats: [] },
    auth: store.auth || {},
  }));

  // Debounced search function
  const debouncedSearch = React.useMemo(
    () => debounce((query) => {
      if (query.trim()) {
        setLoading(true);
        dispatch(searchUser(query))
          .finally(() => setLoading(false));
      }
    }, 300), // 300ms delay
    [dispatch]
  );

  useEffect(() => {
    // Cancel debounce on cleanup
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchUser = (e) => {
    const value = e.target.value;
    setUsername(value);
    debouncedSearch(value); // Trigger debounced search
  };

  const handleUserClick = async (user) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check for existing chat
      const existingChat = message.chats?.find(chat => 
        chat.users.some(u => u.id === user.id)
      );

      if (existingChat) {
        onUserSelect?.(existingChat);
        return;
      }

      // Create new chat if none exists
      const { payload: newChat } = await dispatch(createChat({ userId: user.id }));
      
      if (!newChat) {
        throw new Error("Failed to create chat");
      }

      // Refresh chats list
      await dispatch(getAllChats());
      onUserSelect?.(newChat);

    } catch (error) {
      console.error("Chat error:", error);
      setError(error.message || "Failed to start chat");
    } finally {
      setLoading(false);
      setUsername("");
    }
  };

  return (
    <div className="relative">
      <div className="py-5">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search user..."
          value={username}
          onChange={handleSearchUser}
          type="text"
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-3 top-8">
            <CircularProgress size={20} />
          </div>
        )}
      </div>

      {error && (
        <Typography color="error" variant="caption" className="block mt-1">
          {error}
        </Typography>
      )}

      {username && auth.searchUser?.length > 0 && (
        <div className="absolute w-full z-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-60 overflow-y-auto">
          {auth.searchUser.map((user) => (
            <Card 
              key={user.id} 
              className="mb-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleUserClick(user)}
            >
              <CardHeader
                avatar={<Avatar src={user.profilePicture} />}
                title={`${user.firstName} ${user.lastName}`}
                subheader={`@${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchUser);