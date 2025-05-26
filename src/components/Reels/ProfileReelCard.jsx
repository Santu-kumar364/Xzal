import React, { useRef, useState, useEffect } from "react";
import { Box, CardMedia, IconButton } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const ProfileReelCard = ({ reel, isMobile = false }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Toggle fullscreen
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Set initial mute state and container dimensions
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

  // Handle play/pause based on hover state (desktop)
  useEffect(() => {
    if (!videoRef.current || isMobile) return;

    if (isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
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
    if (!reel.video || containerSize.width === 0 || containerSize.height === 0) {
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

      {/* Fullscreen toggle button - Bottom Right */}
      <IconButton
        onClick={toggleFullscreen}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 2,
          '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }
        }}
        size="small"
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>

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
            ▶
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfileReelCard;