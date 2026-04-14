import { Avatar, Button, CardHeader } from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";

const PopularUserCard = ({ user }) => {
  return (
    <CardHeader
      avatar={
        <Avatar 
          sx={{ 
            bgcolor: red[500], 
            width: 40, 
            height: 40,
            fontSize: "1rem"
          }} 
          aria-label="user-avatar"
        >
          {user?.name?.charAt(0) || "U"}
        </Avatar>
      }
      action={
        <Button 
          size="small" 
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            fontSize: "0.75rem",
            padding: "4px 12px"
          }}
        >
          Follow
        </Button>
      }
      title={user?.name || "Unknown User"}
      subheader={`@${user?.username || "user"}`}
      sx={{
        "& .MuiCardHeader-content": {
          overflow: "hidden"
        }
      }}
    />
  );
};

export default PopularUserCard;