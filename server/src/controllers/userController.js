import { getUserById } from "../models/userModel.js";

export const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await getUserById(userId);
    return res.status(200).json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};
