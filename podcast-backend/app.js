const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Podcast } = require("./models"); // Adjust the path as needed

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static file serving for the uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const upload = multer({ storage });

// Route to fetch all podcasts
app.get("/api/podcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.findAll();
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch podcasts" });
  }
});

// Route to add a new podcast
app.post("/api/podcasts", upload.single("audio"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const audioUrl = `/uploads/${req.file.filename}`;
    const podcast = await Podcast.create({
      title,
      description,
      audio_url: audioUrl,
    });
    res.status(201).json({ podcast, message: "Podcast added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add podcast" });
  }
});

// Route to delete a podcast
app.delete("/api/podcasts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcast.findByPk(id);
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }
    await podcast.destroy();
    res.json({ message: "Podcast deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete podcast" });
  }
});

// Route to edit a podcast
app.put("/api/podcasts/:id", upload.single("audio"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const podcast = await Podcast.findByPk(id);
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }
    podcast.title = title;
    podcast.description = description;
    if (req.file) {
      podcast.audio_url = `/uploads/${req.file.filename}`;
    }
    await podcast.save();
    res.json({ podcast, message: "Podcast updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to update podcast" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
