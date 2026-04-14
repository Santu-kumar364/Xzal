import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, TextField, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UploadToCloudinary } from "../../Utils/UploadToCloudinary";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  updateBackgroundPicture,
  updateProfileAction,
  updateProfilePicture,
} from "../../Redux/Auth/auth.action";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: 3,
  overflow: "scroll-y",
  p: 4,
};

export default function UpdateProfile({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploadType, setUploadType] = useState(""); // 'profile' or 'background'

  const profileInputRef = useRef(null);
  const profileCameraInputRef = useRef(null);
  const backgroundInputRef = useRef(null);
  const backgroundCameraInputRef = useRef(null);

  const handleMenuOpen = (event, type) => {
    setUploadType(type);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleImageUpload = async (file, type) => {
    if (!file) return;

    setIsLoading(true);
    try {
      const result = await UploadToCloudinary(file, "image");
      console.log("Full Cloudinary response:", result); // Debug log

      // Handle different response structures
      let imageUrl;
      if (typeof result === "string") {
        // If response is a direct URL string
        imageUrl = result;
      } else if (result?.url) {
        // If response has url property
        imageUrl = result.url;
      } else if (result?.secure_url) {
        // If response has secure_url property
        imageUrl = result.secure_url;
      } else if (result?.data?.url) {
        // If response is nested in data property
        imageUrl = result.data.url;
      } else {
        throw new Error("Invalid response format from Cloudinary");
      }

      console.log("Extracted image URL:", imageUrl); // Debug log

      if (type === "profile") {
        dispatch(updateProfilePicture(imageUrl));
        setSelectedProfileImage(imageUrl);
      } else {
        dispatch(updateBackgroundPicture(imageUrl));
        setSelectedBackgroundImage(imageUrl);
      }
    } catch (error) {
      console.error(`${type} upload failed:`, error);
      alert(`${type} upload failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file, type);
    e.target.value = ""; // Reset input to allow selecting same file again
  };

  const triggerFileInput = (ref) => {
    ref.current.click();
  };

  const formik = useFormik({
    initialValues: {
      firstName: auth.user?.firstName || "",
      lastName: auth.user?.lastName || "",
      // Not included profilePhoto & backgroundPhoto here, so that it uploads images to Cloudinary as soon as they're selected (via handleImageUpload).
      // If you move them into formik, they will only update when the form is submitted.
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
      handleClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <p className="text-xl font-semibold">Edit Profile</p>
            </div>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>

          <div className="mt-4 relative">
            {/* Background Image Section */}
            <div className="h-[15rem] relative">
              <img
                className="h-full w-full object-cover"
                src={
                  selectedBackgroundImage ||
                  auth.user?.backgroundPicture ||
                  "https://cdn.pixabay.com/photo/2016/08/14/18/27/sailing-boat-1593613_1280.jpg"
                }
                alt="Background"
              />
              <div className="absolute bottom-2 right-2">
                <IconButton
                  onClick={(e) => handleMenuOpen(e, "background")}
                  sx={{
                    color: "black",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                  }}
                >
                  <CameraAltIcon />
                </IconButton>
              </div>
              {/* Hidden file inputs */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "background")}
                style={{ display: "none" }}
                ref={backgroundInputRef}
              />
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileChange(e, "background")}
                style={{ display: "none" }}
                ref={backgroundCameraInputRef}
              />
            </div>

            {/* Profile Image Section */}
            <div className="pl-5 relative">
              <div
                className="relative"
                style={{ width: "10rem", height: "10rem" }}
              >
                <Avatar
                  className="transform -translate-y-24 border-4 border-white"
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    selectedProfileImage ||
                    auth.user?.profilePicture ||
                    "https://media.licdn.com/dms/image/..."
                  }
                />
                <div className="absolute top-5 right-2">
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, "profile")}
                    sx={{
                      color: "black",
                      backgroundColor: "rgba(255,255,255,0.7)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                    }}
                  >
                    <CameraAltIcon />
                  </IconButton>
                </div>
                {/* Hidden file inputs */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profile")}
                  style={{ display: "none" }}
                  ref={profileInputRef}
                />
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={(e) => handleFileChange(e, "profile")}
                  style={{ display: "none" }}
                  ref={profileCameraInputRef}
                />
              </div>

              {/* Form Fields */}
              <div className="space-y-5 mt-4">
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Upload Options Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              uploadType === "profile"
                ? triggerFileInput(profileInputRef)
                : triggerFileInput(backgroundInputRef);
              handleMenuClose();
            }}
          >
            Choose from Gallery
          </MenuItem>
          <MenuItem
            onClick={() => {
              uploadType === "profile"
                ? triggerFileInput(profileCameraInputRef)
                : triggerFileInput(backgroundCameraInputRef);
              handleMenuClose();
            }}
          >
            Take Photo
          </MenuItem>
        </Menu>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
}
