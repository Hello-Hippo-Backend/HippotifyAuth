const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const connection = require('./config/database');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const playlistRoute = require('./routes/playlistRoutes');

const authenticateToken = require('./middlewares/authenticateToken');

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow cookies and other credentials
}));

app.use("/api/auth", authRoute);
app.use("/api/users", authenticateToken, userRoute);
app.use("/api/playlists", authenticateToken, playlistRoute);

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

