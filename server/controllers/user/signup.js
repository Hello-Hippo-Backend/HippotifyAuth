const db = require('../../config/database');

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ msg: "email, username and password required" });
  }

  try {
    var [isTaken] = await db.promise().query(`SELECT * FROM users 
                  WHERE username = ?`, [username]);
    if (isTaken.length > 0) {
      return res.status(401).json({ msg: "Username is already taken" });
    }
    [isTaken] = await db.promise().query(`SELECT * FROM users 
                  WHERE email = ?`, [email]);
    if (isTaken.length > 0) {
      return res.status(401).json({ msg: "Email is already taken" });
    }

    await db.promise()
    .query(`INSERT users (image_url, username, email, password, role)
          VALUE('https://cdn-icons-png.flaticon.com/512/8847/8847419.png',
          ?, ?, ?, 'User')`,[username, email, password]);
    
    const [user] = await db.promise().query(`SELECT id FROM users WHERE username = ? AND email = ?`, [username, email]);
    await db.promise().query(`INSERT playlists (cover, user_id, title, description, type)
                VALUE('https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033', ?,
                'Camper Playlist', 'This is a playlist for camper', 'Private')`,[user[0].id]);

    return res.status(200).json({ msg: "Successfully create account" });
  } catch (error) {
    // Catch and handle server errors
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
}
module.exports = signup;