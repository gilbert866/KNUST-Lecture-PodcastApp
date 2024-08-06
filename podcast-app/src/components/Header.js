// src/components/Header.js
import React, { useContext } from "react";
import logo from "../assets/image/logo.png"; // Make sure this path is correct
import { Button } from "primereact/button";
import { PodcastContext } from "../context/PodcastContext";
import "../App.css"; // Ensure you have this CSS file for custom styles

const Header = () => {
    const { setAddDialog } = useContext(PodcastContext);

    return (
        <div className="header">
            <div className="header-logo">
                <img src={logo} alt="logo" className="logo" />
                <h2>KNUST Podcast Management System</h2>
            </div>
            <Button
                icon="pi pi-plus"
                className="p-button-rounded p-button-success"
                onClick={() => setAddDialog(true)}
            />
        </div>
    );
};

export default Header;
