export default (allowedRoles) => (req, res, next) => {
  try {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ success: false, message: "User role not found." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient privileges." });
    }

    next();
  } catch (error) {
    console.error("Error verifying role:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
