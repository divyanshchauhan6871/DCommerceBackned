import JWT from "jsonwebtoken";
import usermodel from "../Models/userModel.js";

export const requiredsignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (err) {}
};

export const isAdmin = async (req, res, next) => {
  try {
    const adminuser = await usermodel.findById(req.user._id);
    if (adminuser.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
