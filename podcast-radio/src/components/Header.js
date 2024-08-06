// src/components/Header.js
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>LectureCast</Logo>
      <Nav>
        <NavItem to="/" exact activeClassName="active">
          Home
        </NavItem>
        <NavItem to="/about" activeClassName="active">
          About
        </NavItem>
        <NavItem to="/contact" activeClassName="active">
          Contact
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Logo = styled.h1`
  color: white;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavItem = styled(NavLink)`
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &.active {
    font-weight: bold;
  }
`;

export default Header;
