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

const posts = [];
const reels = [];
const saved = [];
const reposts = [];

const MyProfile = () => {
  const { auth } = useSelector((store) => store);
  const { id } = useParams();
  const [value, setValue] = React.useState("post");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="h-full w-full rounded-md"
            src={auth.user?.backgroundPicture}
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src={auth.user?.profilePicture }
          />
          {true ? (
            <Button onClick={handleOpen} sx={{ borderRadius: "20px" }} variant="contained">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="contained">
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p>
              {" "}
              @
              {auth.user?.firstName.toLowerCase() +
                "_" +
                auth.user?.lastName.toLowerCase()}
            </p>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>35 post</span>
            <span>45 followers</span>
            <span>5 followings</span>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet, cnihil facere praesentium, aliquid{" "}
            </p>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab
                  key={item.value}
                  value={item.value}
                  label={item.name}
                  wrapped
                />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" && (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard item={item}/>
                  </div>
                ))}
              </div>
            )}

            {value === "reels" && (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((item) => (
                  <UserReelCard />
                ))}
              </div>
            )}

            {value === "saved" && (
              <div className="space-y-5 w-[70%] my-10">
                {saved.map((item) => (
                  <div className="border border-slate-100">
                    <PostCard />
                  </div>
                ))}
              </div>
            )}

            {value === "repost" && (
              <div className="space-y-5 w-[70%] my-10">
                {reposts.map((item) => (
                  <div className="border border-slate-100">
                    <PostCard />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <section>
        <UpdateProfile open = {open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default MyProfile;
