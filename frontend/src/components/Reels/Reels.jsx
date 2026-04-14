 

import React, { useEffect, useState, useRef } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction } from '../../Redux/Reel/reel.action';
import ReelCard from './ReelCard';

const Reels = () => {
  const dispatch = useDispatch();
  const { reels, loading, error } = useSelector(state => state.reel);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(getAllReelsAction());
  }, [dispatch]);

  // Handle keyboard navigation for desktop
  useEffect(() => {
    if (!containerRef.current) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && currentIndex < reels.length - 1) {
        e.preventDefault();
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex(currentIndex - 1);
      }
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 5) return; // Ignore small wheel movements
      
      if (e.deltaY > 0 && currentIndex < reels.length - 1) {
        e.preventDefault();
        setCurrentIndex(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    containerRef.current.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentIndex, reels.length]);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY.current - touchEndY;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance && currentIndex < reels.length - 1) {
      // Swipe up - next reel
      setCurrentIndex(currentIndex + 1);
    } else if (swipeDistance < -minSwipeDistance && currentIndex > 0) {
      // Swipe down - previous reel
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  if (reels.length === 0) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>No reels available</Typography>
    </Box>
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <ReelCard 
          reel={reels[currentIndex]} 
          isMobile={false} 
          key={currentIndex}
        />
      </Box>

      {/* Navigation indicators for desktop */}
      {currentIndex > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          ↑
        </Box>
      )}

      {currentIndex < reels.length - 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          ↓
        </Box>
      )}

      {/* Index indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '4px',
          padding: '4px 8px',
          zIndex: 10
        }}
      >
        {currentIndex + 1} / {reels.length}
      </Box>
    </Box>
  );
};

export default Reels;