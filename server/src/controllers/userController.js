const { getUserById } = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await getUserById(user_id);
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

module.exports = { getUser };
