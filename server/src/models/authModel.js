import db from "../config/database.js";

export const findUserByUsername = async (username) => {
  const [user] = await db
    .promise()
    .query(`SELECT * FROM users WHERE username = ?`, [username]);
  return user[0] || null;
};

export const findUserByEmail = async (email) => {
  const [user] = await db
    .promise()
    .query(`SELECT * FROM users WHERE email = ?`, [email]);
  return user[0] || null;
};

export const createUser = async (username, email, password) => {
  const [response] = await db.promise().query(
    `INSERT INTO users (image_url, username, email, password, role)
     VALUE ('https://cdn-icons-png.flaticon.com/512/8847/8847419.png', ?, ?, ?, 'User')`,
    [username, email, password]
  );
  return response.insertId;
};
