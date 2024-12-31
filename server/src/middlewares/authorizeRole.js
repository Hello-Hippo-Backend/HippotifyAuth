const authorizeRole = (allowedRoles) => (req, res, next) => {
      try {
          // Ensure `req.user` is populated by authentication middleware
          if (!req.user || !req.user.role) {
              return res.status(403).json({ success: false, message: "Forbidden. User role not found." });
          }
  
          // Check if the user's role is in the allowed roles
          if (!allowedRoles.includes(req.user.role)) {
              return res.status(403).json({ success: false, message: "Forbidden. Insufficient privileges." });
          }
  
          // User has an allowed role, proceed to the next middleware
          next();
      } catch (error) {
          console.error("Error verifying role:", error);
          return res.status(500).json({ success: false, message: "Internal server error" });
      }
  };
  
  module.exports = authorizeRole;