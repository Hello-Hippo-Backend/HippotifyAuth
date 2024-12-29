const jwt = require("jsonwebtoken");
const db = require('../../config/database');

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ msg: "email, username and password required" });
  }

  try {
    const user = await db.promise().query(`SELECT * FROM users 
                  WHERE username = ?`, [username])
    // If no user is found, return 401
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    await db.promise()
    .query(`INSERT users (username, email, password)
          VALUE(?, ?, ?)`,[username, email, password]);

    return res.status(200).json({ msg: "Successfully create account" });
  } catch (error) {
    // Catch and handle server errors
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
}
module.exports = {signup};