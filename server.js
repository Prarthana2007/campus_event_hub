const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, "public");

const events = [
  {
    id: "moonlight-movies",
    title: "Moonlight Movies",
    category: "Arts & culture",
    date: "October 17, 2026",
    day: "17",
    month: "OCT",
    time: "7:00 PM - 9:30 PM",
    venue: "North Quad Lawn",
    description: "Bring a blanket for an outdoor screening and a late-night snack bar.",
    host: "Campus Film Society",
    entry: "Free with student ID",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85",
    featured: true
  },
  {
    id: "open-mic-after-hours",
    title: "Open Mic: After Hours",
    category: "Live music",
    date: "October 22, 2026",
    day: "22",
    month: "OCT",
    time: "6:30 PM - 8:30 PM",
    venue: "The Lantern Cafe",
    description: "Songs, spoken word, and five-minute sets from people on campus.",
    host: "Student Arts Council",
    entry: "Free; sign-up at the door",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    featured: true
  },
  {
    id: "build-weekend",
    title: "Build Weekend",
    category: "Technology",
    date: "October 24, 2026",
    day: "24",
    month: "OCT",
    time: "9:00 AM - 6:00 PM",
    venue: "Innovation Lab, Room 204",
    description: "Find a team, sketch an idea, and make a small project in one day.",
    host: "Computing Club",
    entry: "Free; registration recommended",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    featured: true
  },
  {
    id: "makers-market",
    title: "Makers' Courtyard Market",
    category: "Community",
    date: "October 29, 2026",
    day: "29",
    month: "OCT",
    time: "11:00 AM - 3:00 PM",
    venue: "Student Union Courtyard",
    description: "Browse ceramics, prints, vintage finds, and student-made goods.",
    host: "Creative Campus Collective",
    entry: "Free entry",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",
    featured: false
  },
  {
    id: "open-sky-night",
    title: "Open Sky Night",
    category: "Science",
    date: "November 4, 2026",
    day: "04",
    month: "NOV",
    time: "8:00 PM - 10:00 PM",
    venue: "Observatory Hill",
    description: "Look through campus telescopes and learn the stories behind the stars.",
    host: "Astronomy Society",
    entry: "Free; weather permitting",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=85",
    featured: false
  }
];

app.use((req, res, next) => {
  const startedAt = process.hrtime.bigint();

  res.on("finish", () => {
    const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${elapsedMs.toFixed(1)}ms`);
  });

  next();
});

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    serverName: "Campus Event Hub",
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDirectory, "index.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(publicDirectory, "events.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(publicDirectory, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(publicDirectory, "contact.html"));
});

app.use(express.static(publicDirectory));

app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDirectory, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});