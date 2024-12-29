const express = require("express");
const { getPlaylistByUser, getTracksByPlaylistId, updatePlayList, addTracksToPlayList, removeTrackFromPlaylist } = require("../controllers/playlistController");
const playlistRoute = express.Router();

playlistRoute.get('/', getPlaylistByUser)
playlistRoute.get('/:id', getTracksByPlaylistId)
playlistRoute.put('/:id', updatePlayList)
playlistRoute.post('/track', addTracksToPlayList)
playlistRoute.delete('/track', removeTrackFromPlaylist)

module.exports = playlistRoute;