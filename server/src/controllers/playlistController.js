const db = require("../config/database");

const getAllPlaylistByUser = async (req, res) => {
  const user_id = req.user.id;
  try {
    const [playlists] = await db.promise().query(
      `SELECT p.id, p.title, p.cover
      FROM playlists p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ? OR p.type = 'Public'`,
      [user_id]
    );
    return res.json({
      success: true,
      data: playlists,
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

const getPlaylistByUserId = async (req, res) => {
  const user_id = req.user.id;
  try {
    const [playlist] = await db.promise().query(
      `SELECT id, title 
      FROM playlists
      WHERE user_id = ?`,
      [user_id]
    );

    return res.json({
      success: true,
      data: playlist[0],
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

const getPlaylistById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Playlist ID is required",
      });
    }

    const [playlist] = await db.promise().query(
      `SELECT p.id, p.title, p.description, p.cover,
                      u.id as author_id, u.image_url, u.username AS author, p.type
                  FROM playlists p
                  JOIN users u ON p.user_id = u.id
                  WHERE p.id = ? AND (p.user_id = ? OR p.type = 'Public')`,
      [id, user_id]
    );

    if (!playlist.length) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }

    const [playlistTracks] = await db.promise().query(
      `SELECT pt.id, t.title, t.cover, t.artist, t.album, 
                              DATE_FORMAT(pt.created_at, '%b %d, %Y') AS date_added,
                              FLOOR(t.duration / 60) AS duration_minutes, 
                              t.duration % 60 AS duration_seconds
                        FROM playlist_tracks pt
                        JOIN tracks t ON pt.track_id = t.id
                        WHERE pt.playlist_id = ?`,
      [id]
    );

    const formattedTracks = playlistTracks.map((track) => ({
      id: track.id,
      title: track.title,
      cover: track.cover,
      artist: track.artist,
      album: track.album,
      date_added: track.date_added,
      duration: `${track.duration_minutes}:${String(
        track.duration_seconds
      ).padStart(2, "0")}`,
    }));
    
    const edit_access = playlist[0].author_id === user_id;
    const response = {
      id: playlist[0].id,
      title: playlist[0].title,
      description: playlist[0].description,
      cover: playlist[0].cover,
      author: playlist[0].author,
      edit_access,
      image_url: playlist[0].image_url,
      type: playlist[0].type,
      tracks: formattedTracks,
    };

    return res.status(200).json({
      success: true,
      data: response,
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

const updatePlayList = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const [playlists] = await db
      .promise()
      .query(`SELECT * FROM playlists WHERE id = ?`, [id]);
    if (playlists.length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "No playlist",
      });
    }

    await db.promise().query(
      `UPDATE playlists 
                        SET title = ?, description = ?
                        WHERE id = ?`,
      [title, description, id]
    );

    const [updatedPlaylist] = await db
      .promise()
      .query(`SELECT * FROM playlists WHERE id = ?`, [id]);

    return res.status(200).json({
      success: true,
      data: updatedPlaylist,
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

const addTracksToPlayList = async (req, res) => {
  const { track_id, playlist_id } = req.body;
  try {
    const [tracks] = await db
      .promise()
      .query(`SELECT * FROM tracks WHERE id = ?`, [track_id]);
    if (tracks.length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "No track",
      });
    }

    await db.promise().query(
      `INSERT playlist_tracks (playlist_id, track_id)
                        VALUE(?, ?)`,
      [playlist_id, track_id]
    );

    return res.status(200).json({
      success: true,
      data: tracks,
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

const removeTrackFromPlaylist = async (req, res) => {
  const { id, playlist_id } = req.body;
  try {
    const [tracks] = await db.promise().query(
      `SELECT * FROM playlist_tracks pt
      JOIN tracks t ON pt.track_id = t.id
      WHERE pt.id = ? AND pt.playlist_id = ?`,
      [id, playlist_id]
    );
    if (tracks.length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "No track",
      });
    }

    await db.promise().query(
      `DELETE FROM playlist_tracks 
    WHERE id = ? AND playlist_id = ?`,
      [id, playlist_id]
    );

    return res.status(200).json({
      success: true,
      data: tracks[0],
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

module.exports = {
  getAllPlaylistByUser,
  getPlaylistByUserId,
  getPlaylistById,
  updatePlayList,
  addTracksToPlayList,
  removeTrackFromPlaylist,
};
