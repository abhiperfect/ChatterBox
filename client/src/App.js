import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { Suspense, lazy, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.js";
import { CssBaseline } from "@mui/material";
import { LayoutLoader } from "./components/layout/Loaders";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";
import { server } from "./constants/config.jsx";
import { SocketProvider } from "./socket";

import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Groups from "./pages/Groups.jsx";
import { useUserContext } from "./context/UserContext.js";
import axios from "axios";
import { useComponentContext } from "./context/UserContext.js";

function App() {
  const { userDetails, setUserDetails } = useUserContext();
  const { loader, setLoader } = useComponentContext();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true }) //withCredentials: true, pass cookies to server
      .then(({ data }) => {
        //using this server check cookie
        setUserDetails(data.user); //  and user remain logged in
        setLoader(false);
      })
      .catch((err) => {
        setUserDetails();
      });
  }, [setUserDetails, setLoader]);

  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route
              element={
                <SocketProvider>
                  <ProtectRoute user={userDetails} />
                </SocketProvider>
              }
            >
              <Route path="/" element={<Chat />} />
              <Route path="/home" element={<Home />} />
              <Route path="/groups" element={<Groups />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectRoute user={!userDetails} redirect="/">
                  <Login />
                </ProtectRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
