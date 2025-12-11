import express from 'express';

import Path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import{connectDB} from "./lib/db.js";
import { ENV } from './lib/env.js';




const app = express();
const _dirname = Path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json());




app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(Path.join(_dirname,"../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(Path.join(_dirname, "../frontend", "dist", "index.html"));
  });
};

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});

