const db = require("../config/database");

const getUserById = async (userId) => {
  const [user] = await db.promise().query(
    `SELECT id, image_url, email, username, role
          FROM users WHERE id = ?`,
    [userId]
  );
  return user[0];
};

module.exports = { getUserById };
