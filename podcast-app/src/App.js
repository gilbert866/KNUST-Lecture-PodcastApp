import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import Header from "./components/Header";
import PodcastList from "./components/PodcastList";

function App() {
    return (
        <PodcastProvider>
            <Router>
                <Header />
                <div style={{ paddingTop: "60px", padding: "20px" }}>
                    <Routes>
                        <Route path="/" element={<PodcastList />} />
                    </Routes>
                </div>
            </Router>
        </PodcastProvider>
    );
}

export default App;
