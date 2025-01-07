import db from "../config/database.js";

export const getAdminPlaylists = async () => {
  const [playlists] = await db.promise().query(
    `SELECT p.id, p.cover, p.title, p.description, p.type, u.username as author
     FROM playlists p
     JOIN users u ON p.user_id = u.id`
  );
  return playlists;
};

export const getUserPlaylists = async (userId) => {
  const [playlists] = await db.promise().query(
    `SELECT p.id, p.title, p.cover
     FROM playlists p
     JOIN users u ON p.user_id = u.id
     WHERE p.user_id = ? OR p.type = 'Public'`,
    [userId]
  );
  return playlists;
};

export const getOwnedPlaylists = async (userId) => {
  const [playlist] = await db.promise().query(
    `SELECT id, title 
     FROM playlists
     WHERE user_id = ?`,
    [userId]
  );
  return playlist;
};

export const getAdminPlaylistById = async (playlistId) => {
  const [playlist] = await db.promise().query(
    `SELECT p.id, p.title, p.description, p.cover,
            u.id as author_id, u.image_url, u.username AS author, p.type
     FROM playlists p
     JOIN users u ON p.user_id = u.id
     WHERE p.id = ?`,
    [playlistId]
  );
  return playlist[0];
};

export const getUserPlaylistById = async (playlistId, userId) => {
  const [playlist] = await db.promise().query(
    `SELECT p.id, p.title, p.description, p.cover,
            u.id as author_id, u.image_url, u.username AS author, p.type
     FROM playlists p
     JOIN users u ON p.user_id = u.id
     WHERE p.id = ? AND (p.user_id = ? OR p.type = 'Public')`,
    [playlistId, userId]
  );
  return playlist[0];
};

export const getPlaylistTracks = async (playlistId) => {
  const [tracks] = await db.promise().query(
    `SELECT pt.id, t.id track_id, t.title, t.cover, t.artist, t.album, 
            DATE_FORMAT(pt.created_at, '%b %d, %Y') AS date_added,
            t.duration
     FROM playlist_tracks pt
     JOIN tracks t ON pt.track_id = t.id
     WHERE pt.playlist_id = ?`,
    [playlistId]
  );
  return tracks;
};

export const updatePlaylist = async (playlistId, title, description) => {
  await db.promise().query(
    `UPDATE playlists 
     SET title = ?, description = ?
     WHERE id = ?`,
    [title, description, playlistId]
  );
};

export const addTrackToPlaylist = async (playlistId, trackId) => {
  await db.promise().query(
    `INSERT INTO playlist_tracks (playlist_id, track_id)
     VALUES (?, ?)`,
    [playlistId, trackId]
  );
};

export const removeTrackFromPlaylist = async (playlistId, playlistTrackId) => {
  await db.promise().query(
    `DELETE FROM playlist_tracks 
     WHERE id = ? AND playlist_id = ?`,
    [playlistTrackId, playlistId]
  );
};

export const createDefaultPlaylist = async (userId) => {
  const [response] = await db.promise().query(
    `INSERT INTO playlists (cover, user_id, title, description, type)
     VALUE ('https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033', ?, 
     'Camper Playlist', 'This is a playlist for camper', 'Private')`,
    [userId]
  );
  return { playlist_id: response.insertId };
};
