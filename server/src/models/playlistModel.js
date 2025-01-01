const db = require("../config/database");

const getAllPlaylistsByUser = async (userId) => {
  const [playlists] = await db.promise().query(
    `SELECT p.id, p.title, p.cover
     FROM playlists p
     JOIN users u ON p.user_id = u.id
     WHERE p.user_id = ? OR p.type = 'Public'`,
    [userId]
  );
  return playlists;
};

const getPlaylistByUserId = async (userId) => {
  const [playlist] = await db.promise().query(
    `SELECT id, title 
     FROM playlists
     WHERE user_id = ?`,
    [userId]
  );
  return playlist[0];
};

const getPlaylistById = async (playlistId, userId) => {
  const [playlist] = await db.promise().query(
    `SELECT p.id, p.title, p.description, p.cover,
            u.id as author_id, u.image_url, u.username AS author, p.type
     FROM playlists p
     JOIN users u ON p.user_id = u.id
     WHERE p.id = ? AND (p.user_id = ? OR p.type = 'Public')`,
    [playlistId, userId]
  );
  return playlist;
};

const getPlaylistTracks = async (playlistId) => {
  const [tracks] = await db.promise().query(
    `SELECT pt.id, t.title, t.cover, t.artist, t.album, 
            DATE_FORMAT(pt.created_at, '%b %d, %Y') AS date_added,
            FLOOR(t.duration / 60) AS duration_minutes, 
            t.duration % 60 AS duration_seconds
     FROM playlist_tracks pt
     JOIN tracks t ON pt.track_id = t.id
     WHERE pt.playlist_id = ?`,
    [playlistId]
  );
  return tracks;
};

const updatePlaylist = async (playlistId, title, description) => {
  await db.promise().query(
    `UPDATE playlists 
     SET title = ?, description = ?
     WHERE id = ?`,
    [title, description, playlistId]
  );
};

const addTrackToPlaylist = async (playlistId, trackId) => {
  await db.promise().query(
    `INSERT INTO playlist_tracks (playlist_id, track_id)
     VALUES (?, ?)`,
    [playlistId, trackId]
  );
};

const removeTrackFromPlaylist = async (playlistId, playlistTrackId) => {
  await db.promise().query(
    `DELETE FROM playlist_tracks 
     WHERE id = ? AND playlist_id = ?`,
    [playlistTrackId, playlistId]
  );
};

module.exports = {
  getAllPlaylistsByUser,
  getPlaylistByUserId,
  getPlaylistById,
  getPlaylistTracks,
  updatePlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
};
