import { useDispatch, useSelector } from "react-redux";
import Authentication from "./webPages/Authentication/Authentication";
import HomePages from "./webPages/HomePage/HomePages";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
 
// import { ThemeProvider } from "@mui/material";
// import { darkTheme } from "./themes/DarkTheme";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, [dispatch, jwt]);

  return (
    // <ThemeProvider theme={darkTheme}>
    <Routes>
      <Route
        path="/*"
        element={auth.user ? <HomePages /> : <Authentication />}
      />
    </Routes>
    // </ThemeProvider>
  );
}

export default App;
