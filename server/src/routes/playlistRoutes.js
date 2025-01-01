const express = require("express");
const playlistController = require("../controllers/playlistController");
const playlistRoute = express.Router();

playlistRoute.get('/', playlistController.getAllPlaylistByUser)
playlistRoute.get('/owned', playlistController.getPlaylistByUserId)
playlistRoute.get('/:playlistId', playlistController.getPlaylistById)
playlistRoute.put('/:playlistId', playlistController.updatePlayList)
playlistRoute.post('/:playlistId/tracks/:trackId', playlistController.addTracksToPlayList)
playlistRoute.delete('/:playlistId/tracks/:playlistTrackId', playlistController.removeTrackFromPlaylist)

module.exports = playlistRoute;