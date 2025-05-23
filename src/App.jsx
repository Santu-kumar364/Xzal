// import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
// import Authentication from "./webPages/Authentication/Authentication";
// import HomePages from "./webPages/HomePage/HomePages";
// import Message from "./webPages/Message/Message";
// import { Route, Routes } from "react-router-dom";
// import { useEffect } from "react";
// import { getProfileAction } from "./Redux/Auth/auth.action";
// import { ThemeProvider } from "@mui/material";
// import { darkTheme } from "./themes/DarkTheme";

// function App() {
//   const { auth } = useSelector((store) => store);
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     dispatch(getProfileAction(jwt));
//   }, [dispatch, jwt]);

//   return (
//      <ThemeProvider theme={darkTheme}>
//       <Routes>
//         {/* <Route path="/*" element={<Authentication />} /> */}
//         <Route
//           path="/*"
//           element={auth.user ? <HomePages /> : <Authentication />}
//         />
//         <Route path="/message" element={<Message />} />
//       </Routes>
//       <ThemeProvider/>
    
   
//   );
// }

// export default App;



import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Authentication from "./webPages/Authentication/Authentication";
import HomePages from "./webPages/HomePage/HomePages";
import Message from "./webPages/Message/Message";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./themes/DarkTheme";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, [dispatch, jwt]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePages /> : <Authentication />}
        />
        <Route path="/message" element={<Message />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;



