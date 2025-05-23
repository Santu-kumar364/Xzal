import { Grid } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import MiddlePart from "../../components/MiddlePart/MiddlePart";
import Reels from "../../components/Reels/Reels";
import CreateReelsForm from "../../components/Reels/CreateReelsForm";
import MyProfile from "../MyProfile/MyProfile";
import Sidebar from "../../components/Sidebar/Sidebar";
import HomeRight from "../../components/HomeRight/HomeRight";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message/Message";
import { Games } from "@mui/icons-material";

const HomePages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store);

 

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        {/* Left Sidebar */}
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        {/* Main Content Area */}
        <Grid item lg={location.pathname === "/"? 6:9} xs={12} className="px-5 flex justify-center">
          <Routes>
            <Route index element={<MiddlePart />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<MyProfile />} />
            <Route path="/message" element={<Message/>} />
            <Route path="/games" element={<Games/>} />
          </Routes>
        </Grid>

        {location.pathname==="/" && <Grid item lg={3} className="relative">
          <div className="sticky top-0 w-full">
            <HomeRight />
          </div>

        </Grid>}
      </Grid>
    </div>
  );
};

export default HomePages;

 