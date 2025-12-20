import express from 'express';
import cookieParser from 'cookie-parser';
import Path from 'path';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import{connectDB} from "./lib/db.js";
import { ENV } from './lib/env.js';
import { app, server } from "./lib/socket.js";




const _dirname = Path.resolve();

const PORT = ENV.PORT || 3000;

console.log("CLIENT_URL:", ENV.CLIENT_URL);

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://chatapp-o5lz.onrender.com"],
  credentials: true
}));
app.use(cookieParser());



app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(Path.join(_dirname,"../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(Path.join(_dirname, "../frontend", "dist", "index.html"));
  });
};

server.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});

