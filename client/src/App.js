import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.js";
import { CssBaseline } from "@mui/material";
import { LayoutLoader } from "./components/layout/Loaders";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";
import { server } from "./constants/config.jsx";

import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Groups from "./pages/Groups.jsx";
import { useUserContext } from "./context/UserContext.js";

function App() {
  const { userDetails } = useUserContext();
  return (
    <>
      <CssBaseline />
      {/* <div onContextMenu={(e) => e.preventDefault()}> */}
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route
              element={
                // <SocketProvider>
                <ProtectRoute user={userDetails} />
                // </SocketProvider>
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
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
      {/* </div> */}
    </>
  );
}

export default App;
