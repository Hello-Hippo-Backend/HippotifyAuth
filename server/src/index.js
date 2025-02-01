import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connection from "./config/database.js";

import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import playlistRoute from "./routes/playlistRoutes.js";
import authenticateToken from "./middlewares/authenticateToken.js";
import { logger } from "./middlewares/logger.js";

const app = express();
const port = 3000;

app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "http://patbook-air.local",
      "http://helloworld24.sit.kmutt.ac.th"
    ], // Allow requests from this origin
    credentials: true, // Allow cookies and other credentials
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", authenticateToken, userRoute);
app.use("/api/playlists", authenticateToken, playlistRoute);

connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database is connected");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
