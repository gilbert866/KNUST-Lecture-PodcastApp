// src/pages/Home.js
import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  TextField,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Card,
  Slider,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Home as HomeIcon,
  Search as SearchIcon,
  Shuffle,
  Loop,
  Repeat,
  RepeatOne,
} from "@mui/icons-material"; //import { Sidebar } from "primereact/sidebar";
import { fetchAudioFiles } from "../services/audioService";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import image from "../assets/image1.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1DB954", // Spotify green
    },
    secondary: {
      main: "#191414", // Spotify black
    },
    background: {
      default: "#121212", // Dark background
    },
    text: {
      primary: "#FFFFFF", // White text
      secondary: "#B3B3B3", // Muted text
    },
  },
});

const Home = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [playingFileId, setPlayingFileId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loopMode, setLoopMode] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const getAudioFiles = async () => {
      const files = await fetchAudioFiles();
      setAudioFiles(files);
    };
    getAudioFiles();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", updateProgress);
      }
    };
  }, [playingFileId]);

  const constructAudioUrl = (relativeUrl) =>
    `http://localhost:5000${relativeUrl}`;

  const handlePlayPause = (file) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playingFileId === file.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch((error) => {
          console.error("Play request was interrupted:", error);
        });
        setIsPlaying(true);
      }
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }

      audio.src = constructAudioUrl(file.audio_url);
      audio.play().catch((error) => {
        console.error("Play request was interrupted:", error);
      });

      setPlayingFileId(file.id);
      setIsPlaying(true);

      setRecentlyPlayed((prev) => {
        const updatedList = [
          file,
          ...prev.filter((item) => item.id !== file.id),
        ];
        return updatedList.slice(0, 8);
      });
    }
  };

  const handleShuffle = () => {
    const randomFile =
      audioFiles[Math.floor(Math.random() * audioFiles.length)];
    handlePlayPause(randomFile);
  };

  const handleLoop = () => {
    if (loopMode === "none") {
      setLoopMode("single");
    } else if (loopMode === "single") {
      setLoopMode("all");
    } else {
      setLoopMode("none");
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loopMode === "single";
    }
  }, [loopMode]);

  const handleNext = () => {
    const currentIndex = audioFiles.findIndex(
      (file) => file.id === playingFileId,
    );
    const nextIndex = (currentIndex + 1) % audioFiles.length;
    handlePlayPause(audioFiles[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = audioFiles.findIndex(
      (file) => file.id === playingFileId,
    );
    const previousIndex =
      (currentIndex - 1 + audioFiles.length) % audioFiles.length;
    handlePlayPause(audioFiles[previousIndex]);
  };

  const handleAudioEnded = () => {
    if (loopMode === "all") {
      const currentIndex = audioFiles.findIndex(
        (file) => file.id === playingFileId,
      );
      const nextIndex = (currentIndex + 1) % audioFiles.length;
      handlePlayPause(audioFiles[nextIndex]);
    }
  };

  const filteredAudioFiles = audioFiles.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedAudioFiles = filteredAudioFiles.reduce((groups, file) => {
    if (!groups[file.title]) {
      groups[file.title] = [];
    }
    groups[file.title].push(file);
    return groups;
  }, {});

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const newTime = (event.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <SidebarContainer>
          <StaticSidebar>
            <SidebarIconButton color="inherit">
              <HomeIcon />
            </SidebarIconButton>
            <SidebarIconButton color="inherit">
              <SearchIcon />
            </SidebarIconButton>
          </StaticSidebar>
        </SidebarContainer>
        <MainContent>
          <RecentlyPlayedContainer>
            <Typography variant="h6" color="textPrimary">
              Recently Played
            </Typography>
            <RecentlyPlayedList>
              {recentlyPlayed.map((file) => (
                <RecentlyPlayedItem key={file.id}>
                  <AudioImage
                    src={`https://picsum.photos/seed/${file.id}/150`}
                    alt={`${file.title} image`}
                  />
                  <PlayButton
                    onClick={() => handlePlayPause(file)}
                    isPlaying={playingFileId === file.id && isPlaying}
                  >
                    {playingFileId === file.id && isPlaying ? (
                      <Pause />
                    ) : (
                      <PlayArrow />
                    )}
                  </PlayButton>
                  <Typography variant="body2" color="textPrimary">
                    {file.title}
                  </Typography>
                </RecentlyPlayedItem>
              ))}
            </RecentlyPlayedList>
          </RecentlyPlayedContainer>
          <SearchContainer>
            <TextField
              variant="outlined"
              placeholder="Search for a Lecture Audio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </SearchContainer>
          <Content>
            {Object.keys(groupedAudioFiles).length > 0 ? (
              Object.keys(groupedAudioFiles).map((title) => (
                <AudioGroup key={title}>
                  <Typography variant="h6" color="textPrimary">
                    {title}
                  </Typography>
                  <AudioList>
                    {groupedAudioFiles[title].map((file) => (
                      <AudioItem key={file.id}>
                        <AudioTitle>{file.title}</AudioTitle>
                        <AudioContainer>
                          <AudioImage
                            src={`https://picsum.photos/seed/${file.id}/150`}
                            alt={`${file.title} image`}
                          />
                          <audio ref={audioRef} onEnded={handleAudioEnded} />
                          <PlayButton
                            onClick={() => handlePlayPause(file)}
                            isPlaying={playingFileId === file.id && isPlaying}
                          >
                            {playingFileId === file.id && isPlaying ? (
                              <Pause />
                            ) : (
                              <PlayArrow />
                            )}
                          </PlayButton>
                        </AudioContainer>
                      </AudioItem>
                    ))}
                  </AudioList>
                </AudioGroup>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No podcasts available
              </Typography>
            )}
          </Content>
        </MainContent>
        <Footer>
          <FooterContent>
            <img src={image} alt="Description" />
            <IconButton onClick={handleShuffle} color="primary">
              <Shuffle />
            </IconButton>
            <div>
              {playingFileId ? (
                <>
                  <Typography variant="body2" color="textSecondary">
                    {filteredAudioFiles.find(
                      (file) => file.id === playingFileId,
                    )?.title || "Unknown Title"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {filteredAudioFiles.find(
                      (file) => file.id === playingFileId,
                    )?.description || "No Description"}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No podcast playing
                </Typography>
              )}
            </div>
            <IconButton onClick={handlePrevious} color="primary">
              <SkipPrevious />
            </IconButton>
            <IconButton
              onClick={() =>
                handlePlayPause(
                  audioFiles.find((file) => file.id === playingFileId),
                )
              }
              color="primary"
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={handleNext} color="primary">
              <SkipNext />
            </IconButton>
            <IconButton onClick={handleLoop} color="primary">
              {loopMode === "none" && <Repeat />}
              {loopMode === "single" && <RepeatOne />}
              {loopMode === "all" && <Repeat />}
            </IconButton>
          </FooterContent>
          <Slider
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            aria-labelledby="continuous-slider"
          />
          <TimeDisplay>
            <Typography variant="body2" color="textSecondary">
              {formatTime(currentTime)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatTime(duration)}
            </Typography>
          </TimeDisplay>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const SidebarContainer = styled.div`
  width: 80px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const StaticSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 1rem;
`;

const SidebarIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 1rem;
  transition:
    transform 0.3s,
    background-color 0.3s;

  &:hover {
    transform: scale(1.2);
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AudioList = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;
  white-space: nowrap;
`;
const AudioItem = styled.li`
  width: 200px;
  height: 250px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.secondary.main};
  position: relative;
  transition: transform 0.3s;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }
`;

const AudioImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;
const AudioTitle = styled.h3`
  margin: 10px 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.text.primary};
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
const AudioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const RecentlyPlayedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const RecentlyPlayedList = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;
`;

const RecentlyPlayedItem = styled(Card)`
  width: 150px;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  background-color: #2c2c2c;
  color: white;
  position: relative;
  margin-right: 10px;
`;
const PlayButton = styled(IconButton)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background-color: ${({ isPlaying }) =>
    isPlaying ? "green" : "#1DB954"}; /* Spotify green color */
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  &:hover {
    background-color: #1ed760; /* Slightly lighter green on hover */
  }

  &:before {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: rgba(29, 185, 84, 0.2); /* Translucent green circle */
    border-radius: 50%;
    z-index: -1;
  }
`;
const Footer = styled(AppBar)`
  top: auto;
  bottom: 0;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
  margin-left: 10px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const FooterContent = styled(Toolbar)`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 50px; /* Adjust width as needed */
    height: 50px; /* Set a specific height if needed */

    object-fit: cover; /* Control how the image fits within the dimensions */
    align-self: left;
  }
`;
export default Home;
