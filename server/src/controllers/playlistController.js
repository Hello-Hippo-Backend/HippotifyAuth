const playlistModel = require("../models/playlistModel");

const getAllPlaylistByUser = async (req, res) => {
  const userId = req.user.id;
  try {
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
  const userId = req.user.id;
  try {
    const playlists = await playlistModel.getPlaylistByUserId(userId);

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

const getPlaylistById = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user.id;
  if (!playlistId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Playlist ID are required",
    });
  }

  try {
    const playlist = await playlistModel.getPlaylistById(playlistId, userId);
    if (!playlist) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Access denied.",
      });
    }

    const tracks = await playlistModel.getPlaylistTracks(playlistId);
    const response = {
      ...playlist,
      tracks: tracks,
      edit_access: playlist.author_id === userId,
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
  const { playlistId } = req.params;
  const { title, description } = req.body;
  if (!playlistId || !title || !description) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Playlist ID, Title and Description are required",
    });
  }

  try {
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
  const { playlistId, trackId } = req.params;
  if (!playlistId || !trackId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Playlist ID and Track ID are required",
    });
  }

  try {
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
  const { playlistId, playlistTrackId } = req.params;
  if (!playlistId || ! playlistTrackId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Playlist ID and Playlist Track ID are required",
    });
  }

  try {
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

const createNewPlaylist = async (req, res) => {
  const userId = req.user.id;

  try {
    const playlist = await playlistModel.createDefaultPlaylist(userId);
    return res.status(200).json({
      success: true,
      data: playlist,
      message: "Playlist created successfully",
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
  createNewPlaylist
};
