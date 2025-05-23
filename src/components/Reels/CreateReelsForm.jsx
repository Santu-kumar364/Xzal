import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, CircularProgress, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UploadToCloudinary } from "../../Utils/UploadToCloudinary";
import { createReelAction } from "../../Redux/Reel/reel.action";

const CreateReelsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError("Video file size should be less than 50MB");
        return;
      }
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  // In your CreateReelsForm.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setError("Please select a video file");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Uploading video...");
      const videoUrl = await UploadToCloudinary(videoFile, "reels");
      console.log("Video uploaded to:", videoUrl);

      const actionResult = await dispatch(
        createReelAction({ title, video: videoUrl })
      );
      console.log("Reel created:", actionResult);

      onClose?.(); // Close modal if provided
    } catch (err) {
      console.error("Error posting reel:", err);
      setError("Failed to post reel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-reels-form">
      <h2>Create New Reel</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Reel Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          ref={fileInputRef}
          style={{ display: "none" }}
          required
        />

        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          onClick={() => fileInputRef.current.click()}
          fullWidth
          sx={{ mb: 2 }}
        >
          Upload Video
        </Button>

        {previewUrl && (
          <div className="video-preview">
            <video
              src={previewUrl}
              controls
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Post Reel"}
        </Button>
      </form>
    </div>
  );
};

export default CreateReelsForm;

