import express from "express";
import {
  createNewPlaylist,
  getPlaylistByUserId,
  updatePlayList,
  addTracksToPlayList,
  removeTrackFromPlaylist,
  getAllPlaylists,
  getAllUserPlaylist,
  getPlaylistById,
} from "../controllers/playlistController.js";
import authorizeRole from "../middlewares/authorizeRole.js";

const playlistRoute = express.Router();

playlistRoute.get("/admin/all", authorizeRole('Admin'), getAllPlaylists);
playlistRoute.get("/", getAllUserPlaylist);
playlistRoute.post("/", createNewPlaylist);
playlistRoute.get("/owned", getPlaylistByUserId);
playlistRoute.get("/:playlistId", getPlaylistById);
playlistRoute.put("/:playlistId", updatePlayList);
playlistRoute.post("/:playlistId/track/:trackId", addTracksToPlayList);
playlistRoute.delete("/:playlistId/track/:playlistTrackId", removeTrackFromPlaylist);

export default playlistRoute;
