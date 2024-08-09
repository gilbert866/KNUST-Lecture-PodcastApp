// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import styled from "@emotion/styled";
import logo from "../assets/favicon.png"; // Make sure to have your logo image in the assets folder

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
      <Toolbar>
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
          <Typography variant="h6" component="div">
            Lecture Cast
          </Typography>
        </LogoContainer>
        <UserProfile>
          <Typography variant="body1" component="span">
            Profile
          </Typography>
          <Avatar alt="User Avatar" src="https://via.placeholder.com/40" />
        </UserProfile>
      </Toolbar>
    </AppBar>
  );
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
