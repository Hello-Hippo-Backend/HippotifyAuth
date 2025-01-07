import * as playlistModel from "../models/playlistModel.js";
import { timeFormatHMS, timeFormat } from "../utils/timeFormatChange.js";

export const getAdminPlaylists = async (req, res) => {
  try {
    const playlists = await playlistModel.getAdminPlaylists();

    return res.json({
      success: true,
      data: playlists,
      message: "Playlist retrieved successfully",
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

export const getUserPlaylists = async (req, res) => {
  const userId = req.user.id;
  try {
    const playlists = await playlistModel.getUserPlaylists(userId);

    return res.json({
      success: true,
      data: playlists,
      message: "Playlist retrieved successfully",
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

export const getOwnedPlaylists = async (req, res) => {
  const userId = req.user.id;
  try {
    const playlists = await playlistModel.getOwnedPlaylists(userId);

    return res.json({
      success: true,
      data: playlists,
      message: "Playlist retrieved successfully",
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

export const getPlaylistById = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user.id;
  const role = req.user.role;
  if (!playlistId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Playlist ID is required",
    });
  }

  try {
    const playlist = await (role == "Admin"
      ? playlistModel.getAdminPlaylistById(playlistId)
      : playlistModel.getUserPlaylistById(playlistId, userId));
    if (!playlist) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Access denied.",
      });
    }

    const tracks = await playlistModel.getPlaylistTracks(playlistId);
    const totalDurationInSeconds = tracks.reduce((total, track) => {
      return total + track.duration;
    }, 0);

    const response = {
      ...playlist,
      duration: timeFormatHMS(totalDurationInSeconds),
      tracks: tracks.map((track) => ({
        ...track,
        duration: timeFormat(track.duration),
      })),
      edit_access: playlist.author_id === userId,
    };

    return res.status(200).json({
      success: true,
      data: response,
      message: "Playlist retrieved successfully",
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

export const updatePlayList = async (req, res) => {
  const { playlistId } = req.params;
  const { title, description } = req.body;
  if (!playlistId || !title || !description) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Playlist ID, Title, and Description are required",
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

export const addTracksToPlayList = async (req, res) => {
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

export const removeTrackFromPlaylist = async (req, res) => {
  const { playlistId, playlistTrackId } = req.params;
  if (!playlistId || !playlistTrackId) {
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

export const createNewPlaylist = async (req, res) => {
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
