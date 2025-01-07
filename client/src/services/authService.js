import { axiosInstance } from "../utils/axiosInstance";

export const auth = async () => {
  try {
    const response = await axiosInstance.get("/auth");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signin = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/signin", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      username: username,
      email: email,
      password: password,
    });
    console.log("Sign up", username, email, password);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signout = async () => {
  try {
    const response = await axiosInstance.post("/auth/signout");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
