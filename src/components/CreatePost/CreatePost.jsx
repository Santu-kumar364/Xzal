import React, { useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Typography,
  Chip
} from "@mui/material";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CloseIcon from "@mui/icons-material/Close";
import { UploadToCloudinary } from "../../Utils/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/Post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 500 },
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  outline: "none",
  overflowY: "auto",
};

const CreatePost = ({ open, handleClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const handleSelectImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError("Image size must be less than 10MB");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await UploadToCloudinary(file, "image", (progress) => {
        setUploadProgress(Math.round(progress));
      });
      setSelectedImage(imageUrl);
      formik.setFieldValue("image", imageUrl);
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleSelectVideo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('video.*')) {
      setError("Please select a video file (MP4, MOV, etc.)");
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError("Video size must be less than 50MB");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const videoUrl = await UploadToCloudinary(file, "video", (progress) => {
        setUploadProgress(Math.round(progress));
      });
      setSelectedVideo(videoUrl);
      formik.setFieldValue("video", videoUrl);
    } catch (err) {
      setError(err.message || "Failed to upload video");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveMedia = (type) => {
    if (type === "image") {
      setSelectedImage(null);
      formik.setFieldValue("image", "");
    } else {
      setSelectedVideo(null);
      formik.setFieldValue("video", "");
    }
  };

  const formik = useFormik({
    initialValues: {
      captions: "",
      image: "",
      video: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (!values.captions && !values.image && !values.video) {
        setError("Please add a caption or media");
        return;
      }

      dispatch(createPostAction(values));
      resetForm();
      setSelectedImage(null);
      setSelectedVideo(null);
      handleClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={!isLoading ? handleClose : undefined}
      aria-labelledby="create-post-modal"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Create Post
          </Typography>
          <IconButton 
            onClick={handleClose} 
            disabled={isLoading}
            sx={{ visibility: isLoading ? 'hidden' : 'visible' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar 
              src={auth.user?.profilePicture} 
              alt={auth.user?.firstName}
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography fontWeight="bold">
                {auth.user?.firstName} {auth.user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{auth.user?.firstName?.toLowerCase()}_{auth.user?.lastName?.toLowerCase()}
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="What's on your mind?"
            name="captions"
            value={formik.values.captions}
            onChange={formik.handleChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                p: 1,
              },
            }}
          />

          {error && (
            <Typography color="error" variant="body2" mb={2}>
              {error}
            </Typography>
          )}

          <Box display="flex" gap={2} mb={3}>
            <Box textAlign="center">
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectImage}
                style={{ display: "none" }}
                id="image-input"
                disabled={isLoading}
              />
              <label htmlFor="image-input">
                <IconButton 
                  color="primary" 
                  component="span"
                  disabled={isLoading || Boolean(selectedVideo)}
                >
                  <AddPhotoAlternateIcon />
                </IconButton>
              </label>
              <Typography variant="caption">Image</Typography>
            </Box>

            <Box textAlign="center">
              <input
                type="file"
                accept="video/*"
                onChange={handleSelectVideo}
                style={{ display: "none" }}
                id="video-input"
                disabled={isLoading}
              />
              <label htmlFor="video-input">
                <IconButton 
                  color="primary" 
                  component="span"
                  disabled={isLoading || Boolean(selectedImage)}
                >
                  <VideoCallIcon />
                </IconButton>
              </label>
              <Typography variant="caption">Video</Typography>
            </Box>
          </Box>

          {selectedImage && (
            <Box position="relative" mb={3}>
              <img 
                src={selectedImage} 
                alt="Selected" 
                style={{ 
                  width: '100%', 
                  maxHeight: 300, 
                  objectFit: 'contain',
                  borderRadius: 8 
                }} 
              />
              <Chip
                label="Remove"
                onClick={() => handleRemoveMedia("image")}
                onDelete={() => handleRemoveMedia("image")}
                color="error"
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
              />
            </Box>
          )}

          {selectedVideo && (
            <Box position="relative" mb={3}>
              <video 
                controls 
                src={selectedVideo} 
                style={{ 
                  width: '100%', 
                  maxHeight: 300, 
                  borderRadius: 8 
                }}
              />
              <Chip
                label="Remove"
                onClick={() => handleRemoveMedia("video")}
                onDelete={() => handleRemoveMedia("video")}
                color="error"
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
              />
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading || (!formik.values.captions && !selectedImage && !selectedVideo)}
              sx={{ borderRadius: 6, px: 3 }}
            >
              Post
            </Button>
          </Box>
        </form>

        <Backdrop
          sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
          open={isLoading}
        >
          <Box textAlign="center">
            <CircularProgress color="inherit" />
            {uploadProgress > 0 && (
              <Typography mt={2}>
                Uploading: {uploadProgress}%
              </Typography>
            )}
          </Box>
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreatePost;