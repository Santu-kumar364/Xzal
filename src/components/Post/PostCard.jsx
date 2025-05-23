// import { red } from "@mui/material/colors";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import React, { useState } from "react";
// import {
//   CardHeader,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Typography,
//   Avatar,
//   Card,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShareIcon from "@mui/icons-material/Share";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import { use } from "react";
// import { createCommentAction, likePostAction } from "../../Redux/Post/post.action";
// import { useDispatch, useSelector } from "react-redux";
// import { isLikedByOther } from "../../Utils/isLikedByOther";

// const PostCard = ({ item }) => {
//   const user = item.user || {};
//   const [displayComments, setDisplayComments] = useState(false);

//   const dispatch = useDispatch();
//   const {post, auth} = useSelector(store => store);

//   const handleDisplayComments = () => setDisplayComments(!displayComments);

//   const handleCreateComment = (comment) => {
//     const reqData = {
//       postId: item.id,
//       data: {
//         comment: comment,
//       },
//     };
//     dispatch(createCommentAction(reqData));
//   };

//   const handleLikes = () =>  {
//     dispatch(likePostAction(item.id))
//   }

//   // console.log("is like ", isLikedByOther(auth.user.id, item))

//   return (
//     <Card className="">
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             {user.firstName?.[0]}
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={item.user.firstName + " " + item.user.lastName}
//         subheader={
//           "@" +
//           item.user.firstName.toLowerCase() +
//           "_" +
//           item.user.lastName.toLowerCase()
//         }
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={item.image}
//         alt="Lovely Nature"
//       />
//       <CardContent>
//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {item.captions}
//         </Typography>
//       </CardContent>

//       <CardActions className="flex justify-between">
//         <div>
//           <IconButton onClick={handleLikes}>
//             {isLikedByOther(auth.user.id, item) ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon />}
//           </IconButton>
//           <IconButton>{<ShareIcon />}</IconButton>
//           <IconButton onClick={handleDisplayComments}>
//             {<ChatBubbleIcon />}
//           </IconButton>
//         </div>
//         <div>
//           <IconButton>
//             {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
//           </IconButton>
//         </div>
//       </CardActions>
//       {displayComments && (
//         <section>
//           <div className="flex items-center space-x-5 mx-3 my-5">
//             <Avatar sx={{}} />
//             <input
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleCreateComment(e.target.value);
//                   console.log("key pressed");
//                 }
//               }}
//               className="w-full outline-none bg-transparent border border=[#3b4054] rounded-full px-5 py-2"
//               type="text"
//               placeholder="write your comment...."
//             />
//           </div>
//           <Divider />
//           <div className="mx-3 space-y-2 my-5 text-xs ">
//             {item.comments?.filter((e) => e.comment && e.comment.trim() !== "").map((e)=> <div className="flex items-center space-x-5">
//               <Avatar
//                 sx={{ height: "2rem", weight: "2rem", fontSize: ".8rem" }}
//               >
//                 {e.user.firstName[0]}
//               </Avatar>
//               <p>{e.comment}</p>
//             </div>)}
//           </div>
//         </section>
//       )}
//     </Card>
//   );
// };

// export default PostCard;

import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Card,
  IconButton,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { use } from "react";
import {
  createCommentAction,
  likePostAction,
} from "../../Redux/Post/post.action";
import { useDispatch, useSelector } from "react-redux";
import { isLikedByOther } from "../../Utils/isLikedByOther";

const PostCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const user = item.user || {};
  const [displayComments, setDisplayComments] = useState(false);

  const dispatch = useDispatch();
  const { post, auth } = useSelector((store) => store);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDisplayComments = () => setDisplayComments(!displayComments);

  const handleCreateComment = (comment) => {
    const reqData = {
      postId: item.id,
      data: {
        comment: comment,
      },
    };
    dispatch(createCommentAction(reqData));
  };

  const handleLikes = () => {
    dispatch(likePostAction(item.id));
  };

  // console.log("is like ", isLikedByOther(auth.user.id, item))
  const mediaType = item.video ? "video" : item.image ? "image" : null;

  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar
            src={user.profilePicture}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {user.firstName?.[0]}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Save Post</MenuItem>
              {auth.user?.id === user.id && (
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              )}
            </Menu>
          </>
        }
        title={item.user.firstName + " " + item.user.lastName}
        subheader={
          "@" +
          item.user.firstName.toLowerCase() +
          "_" +
          item.user.lastName.toLowerCase()
        }
      />
      {mediaType === 'image' && (
        <CardMedia
          component="img"
          height="auto"
          image={item.image}
          alt="Post image"
          sx={{ maxHeight: 500, objectFit: "contain" }}
        />
      )}
      
      {mediaType === 'video' && (
        <CardMedia
          component="video"
          height="auto"
          src={item.video}
          controls
          sx={{ maxHeight: 500, objectFit: "contain" }}
        />
      )}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.captions}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between">
        <div>
          <IconButton onClick={handleLikes}>
            {isLikedByOther(auth.user.id, item) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton>{<ShareIcon />}</IconButton>
          <IconButton onClick={handleDisplayComments}>
            {<ChatBubbleIcon />}
          </IconButton>
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      {displayComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                  console.log("key pressed");
                }
              }}
              className="w-full outline-none bg-transparent border border=[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="write your comment...."
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs ">
            {item.comments
              ?.filter((e) => e.comment && e.comment.trim() !== "")
              .map((e) => (
                <div className="flex items-center space-x-5">
                  <Avatar
                    sx={{ height: "2rem", weight: "2rem", fontSize: ".8rem" }}
                  >
                    {e.user.firstName[0]}
                  </Avatar>
                  <p>{e.comment}</p>
                </div>
              ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
