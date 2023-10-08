import React from "react";
import Header from "./shared/Header";
import Sidebar from "./shared/Sidebar";
import RecommendedVid from "./video/pages/RecommendedVid";
import Authenticate from "./pages/Authenticate";
import PlayList from "./pages/PlayList";
import WatchLater from "./pages/WatchLater";
import History from "./pages/History";
import LikedOne from "./pages/LikedOne";
import VideoPage from "./video/pages/VideoPage";
// import PrivateRoute from "./private/PrivateRoute";
import PlayListVideoList from "./pages/PlayListVideoList";
import { useAuthContext } from "./context/auth-context";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayListModal from "./shared/PlayListModal";
import "./style.css";
import { isAuthenticated } from "./utils/authrelated";
function App() {
  const { authPage } = useAuthContext();
  let location = useLocation();

  return (
    <div className="App">
      <Header />
      <Sidebar />
      <PlayListModal />
      <main className={`main-content ${authPage && "main-content-slide-off"}`}>
        <Routes>
          <Route path="/" element={<RecommendedVid />} />
          <Route path="/:videoid" element={<VideoPage />} />
          <Route
            path="/playlist"
            element={
              isAuthenticated() ? (
                <PlayList />
              ) : (
                <Navigate
                  state={{ from: location.pathname }}
                  replace
                  to="/authenticate"
                />
              )
            }
          />
          <Route
            path="/watchlater"
            element={
              isAuthenticated() ? (
                <WatchLater />
              ) : (
                <Navigate
                  state={{ from: location.pathname }}
                  replace
                  to="/authenticate"
                />
              )
            }
          />
          <Route
            path="/history"
            element={
              isAuthenticated() ? (
                <History />
              ) : (
                <Navigate
                  state={{ from: location.pathname }}
                  replace
                  to="/authenticate"
                />
              )
            }
          />
          <Route
            path="/likedone"
            element={
              isAuthenticated() ? (
                <LikedOne />
              ) : (
                <Navigate
                  state={{ from: location.pathname }}
                  replace
                  to="/authenticate"
                />
              )
            }
          />
          <Route
            path="/playlist/:name/:id"
            element={
              isAuthenticated() ? (
                <PlayListVideoList />
              ) : (
                <Navigate
                  state={{ from: location.pathname }}
                  replace
                  to="/authenticate"
                />
              )
            }
          />
          <Route path="/authenticate" element={<Authenticate />} />
        </Routes>
      </main>
      <ToastContainer autoClose={3000} position="bottom-right" />
    </div>
  );
}

export default App;
