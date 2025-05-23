 
// import React, { useRef, useState, useEffect } from "react";
// import {
//   CardMedia,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Button,
// } from "@mui/material";
// import {
//   Favorite,
//   ChatBubble,
//   Share,
//   VolumeOff,
//   VolumeUp,
// } from "@mui/icons-material";
// import { formatDistanceToNow, parseISO } from "date-fns";

// const UserReelCard = ({ reel, isMobile = false, isActive = false }) => {
//   const videoRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Handle play/pause based on hover (desktop) or visibility (mobile)
//   useEffect(() => {
//     if (!videoRef.current) return;

//     const video = videoRef.current;

//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);

//     video.addEventListener('play', handlePlay);
//     video.addEventListener('pause', handlePause);

//     return () => {
//       video.removeEventListener('play', handlePlay);
//       video.removeEventListener('pause', handlePause);
//     };
//   }, []);

//   // Handle autoplay when active (visible) or hovered
//   useEffect(() => {
//     if (!videoRef.current) return;

//     if (isActive) {
//       videoRef.current.currentTime = 0;
//       videoRef.current.play().catch(error => {
//         console.error("Autoplay failed:", error);
//       });
//     } else {
//       videoRef.current.pause();
//     }
//   }, [isActive]);

//   const getPostedTime = () => {
//     if (!reel?.createdAt) return "just now";
//     try {
//       const date = typeof reel.createdAt === "string" 
//         ? parseISO(reel.createdAt) 
//         : reel.createdAt;
//       return formatDistanceToNow(date, { addSuffix: true });
//     } catch {
//       return "just now";
//     }
//   };

//   const getFullName = () => {
//     return reel?.user 
//       ? `${reel.user.firstName || ""} ${reel.user.lastName || ""}`.trim() 
//       : "Unknown User";
//   };

//   const toggleMute = (e) => {
//     e.stopPropagation();
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (!isMobile && videoRef.current) {
//       videoRef.current.play().catch(console.error);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (!isMobile && videoRef.current && !isActive) {
//       videoRef.current.pause();
//     }
//   };

//   const handleTouchStart = () => {
//     if (isMobile && videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play().catch(console.error);
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         backgroundColor: "black",
//       }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//     >
//       {/* Video */}
//       <CardMedia
//         component="video"
//         ref={videoRef}
//         image={reel.video}
//         title={reel.title}
//         muted={isMuted}
//         loop
//         playsInline
//         sx={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           cursor: "pointer",
//         }}
//       />

//       {/* Right Side Action Buttons */}
//       <Box
//         sx={{
//           position: "absolute",
//           right: 12,
//           bottom: isMobile ? 100 : 80,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 2,
//           zIndex: 2,
//         }}
//       >
//         <ActionButton icon={<Favorite />} count={reel.likes || 0} />
//         <ActionButton icon={<ChatBubble />} count={reel.comments || 0} />
//         <ActionButton icon={<Share />} />
//         {!isMobile && (
//           <IconButton onClick={toggleMute} sx={{ color: "white" }}>
//             {isMuted ? <VolumeOff /> : <VolumeUp />}
//           </IconButton>
//         )}
//       </Box>

//       {/* Bottom User Info */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           p: 2,
//           pb: isMobile ? 4 : 3,
//           background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
//           color: "white",
//           zIndex: 1,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//           <Avatar 
//             src={reel.user?.profilePicture} 
//             sx={{ width: 32, height: 32, mr: 1.5 }} 
//           />
//           <Box>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//               {getFullName()}
//             </Typography>
//             {!isMobile && (
//               <Typography variant="caption">@{reel.user?.username || "user"}</Typography>
//             )}
//           </Box>
//           <Button
//             variant={isMobile ? "contained" : "outlined"}
//             size="small"
//             sx={{
//               ml: "auto",
//               color: "white",
//               borderColor: "white",
//               borderRadius: 2,
//               textTransform: "none",
//               px: 2,
//               fontSize: "0.75rem",
//               ...(isMobile ? {
//                 backgroundColor: 'rgba(255,255,255,0.2)',
//               } : {
//                 '&:hover': {
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                 }
//               }),
//             }}
//           >
//             Follow
//           </Button>
//         </Box>
        
//         <Typography variant="body2" sx={{ mb: 0.5 }}>
//           {reel.title}
//         </Typography>
        
//         <Typography variant="caption" sx={{ opacity: 0.8 }}>
//           {getPostedTime()}
//         </Typography>
//       </Box>

//       {/* Play/Pause overlay for mobile */}
//       {isMobile && !isPlaying && (
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "rgba(0,0,0,0.3)",
//             zIndex: 1,
//           }}
//         >
//           <Box
//             sx={{
//               width: 60,
//               height: 60,
//               borderRadius: "50%",
//               backgroundColor: "rgba(255,255,255,0.2)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Typography variant="h4" sx={{ color: "white" }}>
//               ▶
//             </Typography>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// const ActionButton = ({ icon, count, onClick }) => (
//   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//     <IconButton sx={{ color: "white", p: 0 }} onClick={onClick}>
//       {icon}
//     </IconButton>
//     {count !== undefined && (
//       <Typography variant="caption" sx={{ color: "white", mt: 0.5, fontSize: "0.75rem" }}>
//         {count > 1000 ? `${(count/1000).toFixed(1)}k` : count}
//       </Typography>
//     )}
//   </Box>
// );

// export default UserReelCard;

import React, { useRef, useState } from "react";
import {
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import {
  Favorite,
  ChatBubble,
  Share,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { formatDistanceToNow, parseISO } from "date-fns";

const UserReelCard = ({ reel, isMobile = false }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Handle play/pause based on hover state
  React.useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered && !isMobile) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(error => {
        console.error("Autoplay failed:", error);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isHovered, isMobile]);

  const getPostedTime = () => {
    if (!reel?.createdAt) return "just now";
    try {
      const date = typeof reel.createdAt === "string" 
        ? parseISO(reel.createdAt) 
        : reel.createdAt;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "just now";
    }
  };

  const getFullName = () => {
    return reel?.user 
      ? `${reel.user.firstName || ""} ${reel.user.lastName || ""}`.trim() 
      : "Unknown User";
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    if (isMobile && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onTouchStart={isMobile ? handleTouchStart : undefined}
    >
      {/* Video */}
      <CardMedia
        component="video"
        ref={videoRef}
        image={reel.video}
        title={reel.title}
        muted={isMuted}
        loop
        playsInline
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      {/* Right Side Action Buttons */}
      <Box
        sx={{
          position: "absolute",
          right: 12,
          bottom: isMobile ? 100 : 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          zIndex: 2,
        }}
      >
        <ActionButton icon={<Favorite />} count={reel.likes || 0} />
        <ActionButton icon={<ChatBubble />} count={reel.comments || 0} />
        <ActionButton icon={<Share />} />
        {!isMobile && (
          <IconButton onClick={toggleMute} sx={{ color: "white" }}>
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        )}
      </Box>

      {/* Bottom User Info */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          pb: isMobile ? 4 : 3,
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          color: "white",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar 
            src={reel.user?.profilePicture} 
            sx={{ width: 32, height: 32, mr: 1.5 }} 
          />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {getFullName()}
            </Typography>
            {!isMobile && (
              <Typography variant="caption">@{reel.user?.username || "user"}</Typography>
            )}
          </Box>
          <Button
            variant={isMobile ? "contained" : "outlined"}
            size="small"
            sx={{
              ml: "auto",
              color: "white",
              borderColor: "white",
              borderRadius: 2,
              textTransform: "none",
              px: 2,
              fontSize: "0.75rem",
              ...(isMobile ? {
                backgroundColor: 'rgba(255,255,255,0.2)',
              } : {
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }),
            }}
          >
            Follow
          </Button>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {reel.title}
        </Typography>
        
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {getPostedTime()}
        </Typography>
      </Box>

      {/* Play/Pause overlay for mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1,
            opacity: videoRef.current?.paused ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              ▶
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const ActionButton = ({ icon, count, onClick }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <IconButton sx={{ color: "white", p: 0 }} onClick={onClick}>
      {icon}
    </IconButton>
    {count !== undefined && (
      <Typography variant="caption" sx={{ color: "white", mt: 0.5, fontSize: "0.75rem" }}>
        {count > 1000 ? `${(count/1000).toFixed(1)}k` : count}
      </Typography>
    )}
  </Box>
);

export default UserReelCard;