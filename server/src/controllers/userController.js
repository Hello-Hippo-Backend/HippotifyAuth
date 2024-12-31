const db = require('../config/database');

const getUserById = async (req, res) => {
      const user_id = req.user.id;
      try {
        const [user] = await db.promise().query(
          `SELECT id, image_url, username
          FROM users WHERE id = ?`,[user_id]
        )
        return res.json({
          success: true,
          data: user[0],
          error: null,
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
          success: false,
          data: null,
          error: "Internal server error",
        });
      }
    };
module.exports = getUserById