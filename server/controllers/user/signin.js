const jwt = require("jsonwebtoken");
const db = require('../../config/database');

const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "email and password required" });
  }

  try {
    const [user] = await db.promise().query(`SELECT * FROM users 
                  WHERE username = ?`, [username])
    // If no user is found, return 401
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // Verify the password
    if (password === user[0].password) {
      // Generate a JWT token
      const token = jwt.sign(
        {
          id: user[0].id,
          username: user[0].username,
          role: user[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      // Set the token in an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
      });

      // Return the user info
      return res.json({
        id: user[0].id,
        username: user[0].username,
        role: user[0].role,
      });
    }
    // If password is incorrect, return 401
    return res.status(401).json({ msg: "Incorrect username or password" });
  } catch (error) {
    // Catch and handle server errors
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
}

module.exports = signin;