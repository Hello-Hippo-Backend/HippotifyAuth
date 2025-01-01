const express = require("express");
const playlistController = require("../controllers/playlistController");
const playlistRoute = express.Router();

playlistRoute.get('/', playlistController.getAllPlaylistByUser)
playlistRoute.post('/', playlistController.createNewPlaylist)
playlistRoute.get('/owned', playlistController.getPlaylistByUserId)
playlistRoute.get('/:playlistId', playlistController.getPlaylistById)
playlistRoute.put('/:playlistId', playlistController.updatePlayList)
playlistRoute.post('/:playlistId/track/:trackId', playlistController.addTracksToPlayList)
playlistRoute.delete('/:playlistId/track/:playlistTrackId', playlistController.removeTrackFromPlaylist)

module.exports = playlistRoute;