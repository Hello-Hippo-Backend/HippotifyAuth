const db = require("../config/database");

const findUserByUsername = async (username) => {
  const [user] = await db
    .promise()
    .query(`SELECT * FROM users WHERE username = ?`, [username]);
  return user[0] || null;
};

const findUserByEmail = async (email) => {
  const [user] = await db
    .promise()
    .query(`SELECT * FROM users WHERE email = ?`, [email]);
  return user[0] || null;
};

const createUser = async (username, email, password) => {
  await db.promise().query(
    `INSERT INTO users (image_url, username, email, password, role)
     VALUE ('https://cdn-icons-png.flaticon.com/512/8847/8847419.png', ?, ?, ?, 'User')`,
    [username, email, password]
  );
};

const getUserId = async (username, email) => {
  const [user] = await db
    .promise()
    .query(`SELECT id FROM users WHERE username = ? AND email = ?`, [
      username,
      email,
    ]);
  return user[0].id;
};

const createDefaultPlaylist = async (userId) => {
  await db.promise().query(
    `INSERT INTO playlists (cover, user_id, title, description, type)
     VALUE ('https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033', ?, 
     'Camper Playlist', 'This is a playlist for camper', 'Private')`,
    [userId]
  );
};

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  getUserId,
  createDefaultPlaylist,
};
