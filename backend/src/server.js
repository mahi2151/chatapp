import express from 'express';
import dotenv from 'dotenv';
import Path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

dotenv.config();


const app = express();
const _dirname = Path.resolve();

const PORT = process.env.PORT || 3000;


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(Path.join(_dirname,"../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(Path.join(_dirname, "../frontend", "dist", "index.html"));
  });
};

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});

