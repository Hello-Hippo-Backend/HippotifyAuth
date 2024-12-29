const signout = async (req, res) => {
      // Clear the JWT token cookie
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
      });
    
      return res.json({ msg: "Logged out successfully" });
};
module.exports = {signout}