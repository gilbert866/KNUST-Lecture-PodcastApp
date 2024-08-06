// src/pages/About.js
import React from 'react';
import styled from 'styled-components';

const About = () => {
    return (
        <AboutContainer>
            <Title>About Us</Title>
            <Description>
                My Radio App is dedicated to bringing you the best music from around the world. We curate the finest
                playlists and radio stations to ensure that you always have something great to listen to.
            </Description>
        </AboutContainer>
    );
};

const AboutContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default About;
