import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
 

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon/>,
    path: "/",
  },
  {
    title: "Reels",
    icon: <ExploreIcon/>,
    path: "/reels",
  },
  {
    title: "Create Reels",
    icon: <ControlPointIcon/>,
    path: "/create-reels",
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon/>,
    path: "/",
  },
  {
    title: "Message",
    icon: <MessageIcon/>,
    path: "/",
  },
  {
    title: "Games",
    icon: <VideogameAssetIcon/>,
    path: "/games",
  },
  {
    title: "Communities",
    icon: <GroupIcon/>,
    path: "/",
  },
  {
    title: "Profile",
    icon: <AccountCircleIcon/>,
    path: "profile",
  }

]