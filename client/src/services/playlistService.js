import { axiosInstance } from "../utils/axiosInstance";

export const fetchAdminPlaylists = async () => {
  try {
    const response = await axiosInstance.get(`/playlists/admin/all`);
    return response.data.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchUserPlaylists = async () => {
  try {
    const response = await axiosInstance.get(`/playlists`);
    return response.data.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchPlaylist = async (id) => {
  try {
    const response = await axiosInstance.get(`/playlists/${id || 1}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const fetchOwnedPlaylists = async () => {
  try {
    const response = await axiosInstance.get("/playlists/owned");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updatePlaylist = async (id, title, description) => {
  try {
    await axiosInstance.put(`/playlists/${id}`, {
      title: title,
      description: description,
    });
    console.log("Update playlist detail", title, description);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const addTrack = async (playlistId, trackId) => {
  try {
    const response = await axiosInstance.post(
      `/playlists/${playlistId}/track/${trackId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const removeTrack = async (playlistId, playlistTrackId) => {
  try {
    const response = await axiosInstance.delete(
      `/playlists/${playlistId}/track/${playlistTrackId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
