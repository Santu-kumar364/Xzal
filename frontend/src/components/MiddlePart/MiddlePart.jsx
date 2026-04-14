import React, { useEffect } from "react";
import { Avatar, Card, IconButton } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import PhotoIcon from "@mui/icons-material/Photo";
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "../Post/PostCard";
import CreatePost from "../CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";

const stories = [11, 2, 5, 6, 9];
 

const MiddlePart = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post);
  console.log("post store", posts);

  const [openCreatePostModel, setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = ()=> setOpenCreatePostModal(false);

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log("open post modal......", openCreatePostModel);
  };

  useEffect(() => {
    dispatch(getAllPostAction());
  },[posts.newComment, dispatch]);

  return (
    <div className="px-20 ">
      <section className="py-5 flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{
              width: "5rem",
              height: "5rem"
            }}
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p className="text-sm">New</p>
        </div>
        {stories.map((item) => (
          <StoryCircle />
        ))}
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handleOpenCreatePostModal}
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border"
            type="text" placeholder="Create new post"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <PhotoIcon />
            </IconButton>
            <span>media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>video</span>
          </div>
           <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>
            <span>Write Article</span>
          </div>

        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {posts.map((item) => (<PostCard item={item}/>))}

      </div>
      <div>
        <CreatePost open={openCreatePostModel} handleClose={handleCloseCreatePostModal} />
      </div>

    </div>
  );
};

export default MiddlePart;

 

