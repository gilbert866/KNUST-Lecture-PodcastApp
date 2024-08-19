import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
//import Header from "./components/Header";
import PodcastList from "./components/PodcastList";
import SignInSide from "./components/sign_in/SignInSide";

function App() {
  return (
    <PodcastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/podcastlist" element={<PodcastList />} />
        </Routes>
      </Router>
    </PodcastProvider>
  );
}

export default App;
