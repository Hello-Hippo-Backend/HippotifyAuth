const express = require("express");
const { updatePlayList, addTracksToPlayList, removeTrackFromPlaylist, getAllPlaylistByUser, getPlaylistById, getPlaylistByUserId } = require("../controllers/playlistController");
const playlistRoute = express.Router();

playlistRoute.get('/all', getAllPlaylistByUser)
playlistRoute.get('/private', getPlaylistByUserId)
playlistRoute.get('/:id', getPlaylistById)
playlistRoute.put('/:id', updatePlayList)
playlistRoute.post('/track', addTracksToPlayList)
playlistRoute.delete('/track', removeTrackFromPlaylist)

module.exports = playlistRoute;