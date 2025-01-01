import express from "express";
import {
  getAllPlaylistByUser,
  createNewPlaylist,
  getPlaylistByUserId,
  getPlaylistById,
  updatePlayList,
  addTracksToPlayList,
  removeTrackFromPlaylist,
  getAllPlaylists,
} from "../controllers/playlistController.js";
import authorizeRole from "../middlewares/authorizeRole.js";

const playlistRoute = express.Router();

playlistRoute.get("/all", authorizeRole('Admin'), getAllPlaylists);
playlistRoute.get("/", getAllPlaylistByUser);
playlistRoute.post("/", createNewPlaylist);
playlistRoute.get("/owned", getPlaylistByUserId);
playlistRoute.get("/:playlistId", getPlaylistById);
playlistRoute.put("/:playlistId", updatePlayList);
playlistRoute.post("/:playlistId/track/:trackId", addTracksToPlayList);
playlistRoute.delete("/:playlistId/track/:playlistTrackId", removeTrackFromPlaylist);

export default playlistRoute;
