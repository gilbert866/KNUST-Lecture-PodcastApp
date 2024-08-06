// src/pages/Home.js
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fetchAudioFiles } from "../services/audioService";
import logo from "../assets/favicon.jpeg"; // Adjust the path based on your project structure

const Home = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [playingFileId, setPlayingFileId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAudioFiles = async () => {
      const files = await fetchAudioFiles();
      console.log("Fetched audio files:", files); // Debug log
      setAudioFiles(files);
    };
    getAudioFiles();
  }, []);

  const constructAudioUrl = (relativeUrl) => {
    return `http://localhost:5000${relativeUrl}`;
  };

  const handlePlayPause = (file) => {
    if (playingFileId === file.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingFileId(file.id);
      setIsPlaying(true);
      audioRef.current.src = constructAudioUrl(file.audio_url);
      audioRef.current.play();
    }
  };
  const filteredAudioFiles = audioFiles.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <HomeContainer>
      <HeroSection>
        <Logo src={logo} alt="Logo" />
        <HeroText>Welcome To Lecture Podcast</HeroText>
        <HeroSubText>All your Lecture Audios in One Place</HeroSubText>
      </HeroSection>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search for a Lecture Audio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      <Content>
        {filteredAudioFiles.length > 0 ? (
          <AudioList>
            {filteredAudioFiles.map((file) => (
              <AudioItem
                key={file.id}
                as={motion.div}
                animate={{
                  scale:
                    playingFileId === file.id && isPlaying ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <AudioTitle>{file.title}</AudioTitle>
                <AudioContainer>
                  <audio ref={audioRef} />
                  <PlayButton onClick={() => handlePlayPause(file)}>
                    {playingFileId === file.id && isPlaying ? "❚❚" : "▶"}
                  </PlayButton>
                </AudioContainer>
              </AudioItem>
            ))}
          </AudioList>
        ) : (
          <NoAudioMessage>No audio files available</NoAudioMessage>
        )}{" "}
      </Content>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding: 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;
const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

const HeroText = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const HeroSubText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AudioList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 800px; /* Increased max-width */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AudioItem = styled(motion.div)`
  width: 200px; /* Increased width */
  height: 200px; /* Increased height */
  margin: 15px; /* Increased margin */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  position: relative;
  transition: transform 0.3s;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }
`;

const AudioTitle = styled.h3`
  margin: 10px 0;
  font-size: 1.2rem; /* Increased font size */
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
`;

const AudioContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PlayButton = styled.button`
  width: 50px; /* Increased size */
  height: 50px; /* Increased size */
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  font-size: 2rem; /* Increased font size */
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NoAudioMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default Home;
