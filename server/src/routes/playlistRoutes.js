import express from "express";
import {
  createNewPlaylist,
  getOwnedPlaylists,
  updatePlayList,
  addTracksToPlayList,
  removeTrackFromPlaylist,
  getAdminPlaylists,
  getUserPlaylists,
  getPlaylistById,
} from "../controllers/playlistController.js";
import authorizeRole from "../middlewares/authorizeRole.js";

const playlistRoute = express.Router();

playlistRoute.get("/admin/all", authorizeRole("Admin"), getAdminPlaylists);
playlistRoute.get("/", getUserPlaylists);
playlistRoute.post("/", createNewPlaylist);
playlistRoute.get("/owned", getOwnedPlaylists);
playlistRoute.get("/:playlistId", getPlaylistById);
playlistRoute.put("/:playlistId", updatePlayList);
playlistRoute.post("/:playlistId/track/:trackId", addTracksToPlayList);
playlistRoute.delete(
  "/:playlistId/track/:playlistTrackId",
  removeTrackFromPlaylist
);

export default playlistRoute;
