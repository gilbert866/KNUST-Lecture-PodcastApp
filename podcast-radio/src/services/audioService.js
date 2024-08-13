// src/services/audioService.js
const API_URL = "http://localhost:5000/api/podcasts"; // Your actual API URL

export const fetchAudioFiles = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch audio files");
    }
    const data = await response.json();
    console.log("Audio files data:", data); // Debug log
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
