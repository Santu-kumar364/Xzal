import React from "react";
import { Avatar } from '@mui/material';

const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{width: "5rem", height: "5rem"}}
          src="https://media.licdn.com/dms/image/v2/D4D03AQFgdh63qTRMVw/profile-displayphoto-shrink_400_400/B4DZO7K3HnGoAg-/0/1734012007450?e=1753315200&v=beta&t=VNaM9foFqcckw6tvoez0ZV270hqbDjlchLEXRyHP_Yc"
        >
         
        </Avatar>
        <p className="text-sm">Temp img</p>
      </div>
    </div>
  );
};

export default StoryCircle;
