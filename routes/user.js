const {Router} = require("express");
const userRouter = Router();
const signup = require("../controllers/signup");
const signin = require("../controllers/signin");
const home = require("../controllers/home");

userRouter.post("/signup",signup);


userRouter.post("/signin",signin);


userRouter.post("/home",home);


module.exports = userRouter;