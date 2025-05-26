import React from 'react'

 

import React from 'react';
import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';

const Games = () => {
  // Sample image data - replace with your actual image sources
  const images = [
    {
      id: 1,
      title: 'Image 1',
      src: 'https://cdn.pixabay.com/photo/2019/04/12/08/44/pacman-4121590_1280.png',
      alt: 'First image'
    },
    {
      id: 2,
      title: 'Image 2',
      src: 'https://cdn.pixabay.com/photo/2016/10/05/15/22/king-1716907_1280.jpg',
      alt: 'Second image'
    },
    {
      id: 3,
      title: 'Image 3',
      src: 'https://cdn.pixabay.com/photo/2015/10/23/15/14/roulette-1003120_1280.jpg',
      alt: 'Third image'
    },
    {
      id: 4,
      title: 'Image 4',
      src: 'https://cdn.pixabay.com/photo/2014/04/05/11/40/chess-316658_1280.jpg',
      alt: 'Fourth image'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={3} key={image.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={image.src}
                alt={image.alt}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div">
                  {image.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Games;