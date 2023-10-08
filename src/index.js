import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// CONTEXT
import { PlayListProvider } from "./context/playlist-context";
import { AuthProvider } from "./context/auth-context";
import { LikeHistoryWatchLaterProvider } from "./context/likeHistoryWatchLater-context";
import { VideoProvider } from "./context/videoContext";
import { FilterProvider } from "./context/filterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <FilterProvider>
          <PlayListProvider>
            <LikeHistoryWatchLaterProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </LikeHistoryWatchLaterProvider>
          </PlayListProvider>
        </FilterProvider>
      </VideoProvider>
    </Router>
  </React.StrictMode>
);
