import React, { useRef, useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Avatar,
  Box,
  Button,
  CardMedia,
} from "@mui/material";
import { Favorite, ChatBubble, Share } from "@mui/icons-material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useSelector } from "react-redux";

const ReelCard = ({ reel, isMobile = false }) => {
  const { auth } = useSelector((store) => store);
  const username = `${auth.user?.firstName?.toLowerCase()}_${auth.user?.lastName?.toLowerCase()}`;
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }

    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!videoRef.current || isMobile) return;

    if (isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Autoplay failed:", error);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isHovered, isMobile]);

  const handleClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const getPostedTime = () => {
    if (!reel?.createdAt) return "just now";
    try {
      const date =
        typeof reel.createdAt === "string"
          ? parseISO(reel.createdAt)
          : reel.createdAt;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "just now";
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
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const getVideoStyle = () => {
    if (
      !reel.video ||
      containerSize.width === 0 ||
      containerSize.height === 0
    ) {
      return {};
    }

    const videoRatio = 9 / 16;
    const containerRatio = containerSize.width / containerSize.height;

    if (containerRatio > videoRatio) {
      return { width: "auto", height: "100%", maxWidth: "none" };
    } else {
      return { width: "100%", height: "auto", maxHeight: "none" };
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onClick={handleClick}
      onTouchStart={isMobile ? handleTouchStart : undefined}
    >
      {/* Video Media */}
      {reel.video ? (
        <CardMedia
          component="video"
          ref={videoRef}
          image={reel.video}
          title={reel.title}
          muted={isMuted}
          loop
          playsInline
          sx={{
            ...getVideoStyle(),
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "grey.800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          No video available
        </Box>
      )}

      {/* Right Side Action Buttons */}
      <Box
        sx={{
          position: "absolute",
          right: 12,
          bottom: isMobile ? 120 : 100, // Increased bottom spacing
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
      </Box>

      {/* Bottom User Info */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          pb: isMobile ? 4 : 1,
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
            {!isMobile && (
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                @{username}
              </Typography>
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
              ...(isMobile
                ? {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }
                : {
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
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
            opacity: !isPlaying ? 1 : 0,
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
      <Typography
        variant="caption"
        sx={{ color: "white", mt: 0.5, fontSize: "0.75rem" }}
      >
        {count > 1000 ? `${(count / 1000).toFixed(1)}k` : count}
      </Typography>
    )}
  </Box>
);

export default ReelCard;