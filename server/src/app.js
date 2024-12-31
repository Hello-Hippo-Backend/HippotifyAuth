const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const connection = require('./config/database');
const playlistRoute = require('./routes/playlistRoutes');
const userRoute = require('./routes/userRoutes');
const verifyAccessToken = require('./middlewares/authenticateToken');

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow cookies and other credentials
}));

app.use("/api/user", userRoute);
app.get("/api/authorize", verifyAccessToken, (req, res) => {
    return res.status(200).json({
      condition: "success",
      data: {
        id: req.user.id,
        role: req.user.role,
      },
      message: "User is authorized",
    });
});
app.use("/api/playlist", verifyAccessToken, playlistRoute);

connection.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Database is connected");
    }
})

app.listen(port, () => {
      console.log(`App listening on port ${port}`);
})

