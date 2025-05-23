import React, { useEffect } from 'react';
import { Box, CircularProgress, Alert, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction } from '../../Redux/Reel/reel.action';
import UserReelCard from './UserReelCard';

const Reels = () => {
  const dispatch = useDispatch();
  const { reels, loading, error } = useSelector(state => state.reel);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(getAllReelsAction());
  }, [dispatch]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box sx={{
      width: '100%',
      height: isMobile ? '100vh' : 'auto',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...(isMobile ? {
        position: 'fixed',
        top: 0,
        left: 0
      } : {
        maxWidth: '100%',
        pb: 4
      })
    }}>
      {reels.map((reel) => (
        <Box key={reel.id} sx={{
          width: '100%',
          height: isMobile ? '100vh' : 'calc(100vh - 120px)',
          position: 'relative',
          borderRadius: isMobile ? 0 : 2,
          overflow: 'hidden',
          mb: isMobile ? 0 : 2
        }}>
          <UserReelCard reel={reel} isMobile={isMobile} />
        </Box>
      ))}
    </Box>
  );
};

export default Reels;