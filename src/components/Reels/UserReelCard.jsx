import React from 'react';
import waterfallVideo from './waterfallVideo.mp4';

const UserReelCard = () => {
  return (
    <div className='w-[15rem] h-[25rem] px-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200'>
      <video 
        className='h-full w-full'
        controls
      >
        <source src={waterfallVideo} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default UserReelCard;