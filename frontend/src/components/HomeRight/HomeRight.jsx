import React, { useState } from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Button, Card, Typography } from "@mui/material";

const popularUsers = [
  { id: 1, name: "Morgan Stanley", username: "morganstanley" },
  { id: 2, name: "JPMorgan Chase", username: "jpmc" },
  { id: 3, name: "Goldman Sachs", username: "gs" },
  { id: 4, name: "Dutch Bank", username: "dutchbank" },
  { id: 5, name: "Tencent", username: "tencent" },
  { id: 6, name: "Mercari", username: "mercari" },
  { id: 7, name: "Microsoft", username: "microsoft" },
  { id: 8, name: "CIVO", username: "civo" },
  { id: 9, name: "HSBC", username: "hsbc" }
];

const HomeRight = () => {
  const [showAll, setShowAll] = useState(false);
  const initialUsersToShow = 4;
  
  const usersToDisplay = showAll ? popularUsers : popularUsers.slice(0, initialUsersToShow);

  return (
    <div className="pr-5 space-y-5" style={{ width: "350px" }}>
      <SearchUser />

      <Card className="p-4" elevation={3}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="subtitle1" fontWeight="medium" color="text.secondary">
            Suggestions for you
          </Typography>
          <Button 
            size="small" 
            sx={{ 
              textTransform: "none", 
              fontSize: "0.75rem",
              color: "text.secondary"
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        </div>
        
        <div 
          className="space-y-3"
          style={{
            maxHeight: showAll ? "600px" : "none",
            overflowY: showAll ? "scroll" : "visible",
            paddingRight: showAll ? "8px" : "0",
            // Hide scrollbar but keep functionality
            scrollbarWidth: "none",  // For Firefox
            "&::-webkit-scrollbar": {  // For Chrome/Safari
              display: "none"
            }
          }}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none"
            }
          }}
        >
          {usersToDisplay.map((user) => (
            <PopularUserCard key={user.id} user={user} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;