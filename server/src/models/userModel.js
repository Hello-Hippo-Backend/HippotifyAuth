const db = require("../config/database");

const getUserById = async (user_id) => {
  const [user] = await db.promise().query(
    `SELECT id, image_url, email, username, role
          FROM users WHERE id = ?`,
    [user_id]
  );
  return user[0];
};

module.exports = { getUserById };
