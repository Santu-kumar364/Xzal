import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const MyProfile = () => {
  const { auth, post, reel } = useSelector((store) => store);
  const { id } = useParams();
  const [value, setValue] = useState("post");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Filter content by the current user
  const userPosts = post.posts.filter((item) => item.user.id === auth.user?.id);
  const userReels = reel.reels.filter((item) => item.user.id === auth.user?.id);
  const userSaved = [];  
  const userReposts = [];  

  // Counters for profile stats
  const postCount = userPosts.length;
  const reelCount = userReels.length;
  const followerCount = auth.user?.followers?.length || 0;
  const followingCount = auth.user?.following?.length || 0;

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        {/* Profile Header */}
        <div className="h-[15rem]">
          <img
            className="h-full w-full rounded-md object-cover"
            src={auth.user?.backgroundPicture || "/default-banner.jpg"}
            alt="Profile banner"
          />
        </div>
        
        {/* Profile Info */}
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24 border-4 border-white"
            sx={{ width: "10rem", height: "10rem" }}
            src={auth.user?.profilePicture || "/default-avatar.jpg"}
            alt={`${auth.user?.firstName} ${auth.user?.lastName}`}
          />
          {true ? ( // Replace with actual condition if needed
            <Button
              onClick={handleOpen}
              sx={{ borderRadius: "20px" }}
              variant="contained"
            >
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="contained">
              Follow
            </Button>
          )}
        </div>
        
        {/* Profile Details */}
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p className="text-gray-400">
              @{auth.user?.firstName?.toLowerCase() +
                "_" +
                auth.user?.lastName?.toLowerCase()}
            </p>
          </div>
          
          <div className="flex gap-5 items-center py-3">
            <span><strong>{postCount + reelCount}</strong> posts</span>
            <span><strong>{followerCount}</strong> followers</span>
            <span><strong>{followingCount}</strong> following</span>
          </div>

          {auth.user?.bio && (
            <div className="py-2">
              <p className="text-gray-800">{auth.user.bio}</p>
            </div>
          )}
        </div>
        
        {/* Content Tabs */}
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="profile content tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabs.map((item) => (
                <Tab
                  key={item.value}
                  value={item.value}
                  label={`${item.name} ${
                    item.value === "post" ? postCount :
                    item.value === "reels" ? reelCount :
                    item.value === "saved" ? userSaved.length :
                    userReposts.length
                  }`}
                />
              ))}
            </Tabs>
          </Box>
          
          {/* Content Display */}
          <div className="flex justify-center">
            {value === "post" && (
              <div className="space-y-5 w-[70%] my-10">
                {userPosts.length > 0 ? (
                  userPosts.map((item) => (
                    <div className="border border-slate-100 rounded-md shadow-sm" key={item.id}>
                      <PostCard item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No posts yet</p>
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      Create your first post
                    </Button>
                  </div>
                )}
              </div>
            )}

            {value === "reels" && (
              <div className="w-full px-4 my-10">
                {userReels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userReels.map((reel) => (
                      <div key={reel.id} className="aspect-[9/16]">
                        <UserReelCard reel={reel} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No reels yet</p>
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      Create your first reel
                    </Button>
                  </div>
                )}
              </div>
            )}

            {value === "saved" && (
              <div className="space-y-5 w-[70%] my-10">
                {userSaved.length > 0 ? (
                  userSaved.map((item) => (
                    <div className="border border-slate-100 rounded-md shadow-sm" key={item.id}>
                      <PostCard item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No saved posts yet</p>
                  </div>
                )}
              </div>
            )}

            {value === "repost" && (
              <div className="space-y-5 w-[70%] my-10">
                {userReposts.length > 0 ? (
                  userReposts.map((item) => (
                    <div className="border border-slate-100 rounded-md shadow-sm" key={item.id}>
                      <PostCard item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No reposts yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      <section>
        <UpdateProfile open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default MyProfile;