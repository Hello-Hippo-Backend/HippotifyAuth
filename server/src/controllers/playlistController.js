const playlistModel = require("../models/playlistModel");

const getAllPlaylistByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlists = await playlistModel.getAllPlaylistsByUser(userId);

    return res.json({
      success: true,
      data: playlists,
      message: "Playlist retrived successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

const getPlaylistByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlist = await playlistModel.getPlaylistByUserId(userId);

    return res.json({
      success: true,
      data: playlist,
      message: "Playlist retrived successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.user.id;

    if (!playlistId) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Playlist ID is required",
      });
    }

    const playlist = await playlistModel.getPlaylistById(playlistId, userId);
    if (!playlist.length) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Access denied.",
      });
    }

    const tracks = await playlistModel.getPlaylistTracks(playlistId);
    const formattedTracks = tracks.map((track) => ({
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

    const response = {
      ...playlist[0],
      tracks: formattedTracks,
      edit_access: playlist[0].author_id === userId,
    };

    return res.status(200).json({
      success: true,
      data: response,
      message: "Playlist retrived successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

const updatePlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { title, description } = req.body;

    await playlistModel.updatePlaylist(playlistId, title, description);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Playlist updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

const addTracksToPlayList = async (req, res) => {
  try {
    const { playlistId, trackId } = req.body;

    await playlistModel.addTrackToPlaylist(playlistId, trackId);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Track added to playlist",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

const removeTrackFromPlaylist = async (req, res) => {
  try {
    const { playlistId, playlistTrackId } = req.body;

    await playlistModel.removeTrackFromPlaylist(playlistId, playlistTrackId);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Track removed from playlist",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
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
