const db = require('../config/database');

const getPlaylistByUser = async (req, res) => {
      const user_id = req.user.id;
      const role = req.user.role;
      try{
            const [playlistData] = await db.promise()
                              .query(`SELECT p.id, p.type, p.name, p.description, u.username
                              FROM playlists p
                              JOIN users u ON p.user_id = u.id
                              WHERE p.user_id = ? OR p.type = 'Public'
                              ${role == 'Admin'? `OR p.type = 'Admin'` : ``}`, [user_id])
            return res.json({
			success: true,
			data: playlistData,
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

const getTracksByPlaylistId = async (req, res) => {
      try {
            const {id}= req.params;
            const user_id = req.user.id;
            const role = req.user.role;

            if (!id) {
                  return res.status(400).json({
                      success: false,
                      data: null,
                      message: "Playlist ID is required",
                  });
              }
      
              const [playlist] = await db.promise().query(
                  `SELECT 
                      p.id,
                      p.name, 
                      p.description,
                      p.cover,
                      u.username AS author, 
                      p.type
                  FROM playlists p
                  JOIN users u ON p.user_id = u.id
                  WHERE p.id = ? AND (p.user_id = ? OR p.type = 'Public'
                  ${role == 'Admin'? `OR p.type = 'Admin'` : ``})`, 
                  [id, user_id]
              );

              if (!playlist.length) {
                  return res.status(403).json({ success: false, message: "Access denied." });
              }

            const [playlistTracks] = await db.promise()
                  .query(`SELECT t.id, t.title, t.cover, a.artist, a.title as album, 
                              DATE_FORMAT(pt.created_at, '%b %d, %Y') AS date_added,
                              FLOOR(t.duration / 60) AS duration_minutes, 
                              t.duration % 60 AS duration_seconds
                        FROM playlist_tracks pt
                        JOIN tracks t ON pt.track_id = t.id
                        JOIN albums a ON t.album_id = a.id
                        WHERE pt.playlist_id = ?`, [id]);

            const formattedTracks = playlistTracks.map(track => ({
                  id: track.id,
                  title: track.title,
                  cover: track.cover,
                  artist: track.artist,
                  album: track.album,
                  date_added: track.date_added,
                  duration: `${track.duration_minutes}:${String(track.duration_seconds).padStart(2, '0')}`
            }));

            const response = {
                  id: playlist[0].id,
                  name: playlist[0].name,
                  description: playlist[0].description,
                  cover : playlist[0].cover,
                  author: playlist[0].author,
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
}

const updatePlayList = async (req, res) => {
      try {
            const {id}= req.params;
            const {name, description} = req.body

            const [playlists] = await db.promise()
                  .query(`SELECT * FROM playlists WHERE id = ?`, [id]);
            if(playlists.length === 0){
                  return res.status(400).json({
                        success: false,
                        data: null,
                        error: 'No playlist',
                  })
            }

            await db.promise()
                  .query(`UPDATE playlists 
                        SET name = ?, description = ?
                        WHERE id = ?`,[name, description, id]);

            const [updatedPlaylist] = await db.promise()
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
}

const addTracksToPlayList = async (req, res) => {
      try {
            const {track_id, playlist_id} = req.body

            const [tracks] = await db.promise()
                  .query(`SELECT * FROM tracks WHERE id = ?`, [track_id]);
            if(tracks.length === 0){
                  return res.status(400).json({
                        success: false,
                        data: null,
                        error: 'No track',
                  })
            }

            await db.promise()
                  .query(`INSERT playlist_tracks (playlist_id, track_id)
                        VALUE(?, ?)`,[playlist_id, track_id]);
            
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
}

const removeTrackFromPlaylist = async (req, res) => {
      try {
            const {playlist_id, track_id} = req.body

            const [tracks] = await db.promise()
                  .query(`SELECT * FROM tracks WHERE id = ?`, [track_id]);
            if(tracks.length === 0){
                  return res.status(400).json({
                        success: false,
                        data: null,
                        error: 'No track',
                  })
            }

            await db.promise()
                  .query(`DELETE FROM playlist_tracks
                        WHERE playlist_id = ? AND track_id = ?`,[playlist_id,track_id]);
            
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
}

module.exports = {
      getPlaylistByUser,
      getTracksByPlaylistId,
      updatePlayList,
      addTracksToPlayList,
      removeTrackFromPlaylist
}