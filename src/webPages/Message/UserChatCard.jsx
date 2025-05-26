
import { Avatar, Card, CardHeader, IconButton, Typography } from "@mui/material";
import React, { memo } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const UserChatCard = memo(({ chat, onClick }) => {
  const currentUserId = useSelector((store) => store.auth.user?.id);
  
  // Safely get the other user's details
  const otherUser = chat.users?.find(user => user.id !== currentUserId) || chat.users?.[0];
  
  // Get last message preview
  const lastMessage = chat.messages?.length > 0 
    ? chat.messages[chat.messages.length - 1]?.content 
    : "No messages yet";
    
  // Truncate long messages
  const truncatedMessage = lastMessage?.length > 25 
    ? `${lastMessage.substring(0, 25)}...` 
    : lastMessage;

  return (
    <Card 
      sx={{ 
        mb: 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5'
        }
      }}
      onClick={onClick}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)"
            }}
            src={otherUser?.profilePicture}
            alt={`${otherUser?.firstName} ${otherUser?.lastName}`}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" fontWeight="bold">
            {`${otherUser?.firstName} ${otherUser?.lastName}`}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {truncatedMessage}
          </Typography>
        }
      />
    </Card>
  );
});

UserChatCard.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
      })
    ).isRequired,
    messages: PropTypes.array,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserChatCard;