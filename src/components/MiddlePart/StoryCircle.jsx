import React from "react";
import { Avatar } from '@mui/material';

const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{width: "5rem", height: "5rem"}}
          src="https://i.pinimg.com/236x/43/78/4b/43784b022ff90677e79e8277e3edea84.jpg"
        >
         
        </Avatar>
        <p className="text-sm">Say hii</p>
      </div>
    </div>
  );
};

export default StoryCircle;
