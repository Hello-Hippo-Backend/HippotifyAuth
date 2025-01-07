import { axiosInstance } from "../utils/axiosInstance";

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data.data;
  } catch (error) {
    return error.response;
  }
};
