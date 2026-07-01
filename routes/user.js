const {Router} = require("express");
const userRouter = Router();
const signup = require("../controllers/signup");
const signin = require("../controllers/signin");
const home = require("../controllers/home");
const refreshToken = require("../controllers/refreshToken");

userRouter.post("/signup",signup);


userRouter.post("/signin",signin);


userRouter.post("/home",home);


userRouter.post("/refreshToken",refreshToken);


module.exports = userRouter;