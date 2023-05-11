const { Router } = require("express");
const authController = require("../controller/authController");
// const { jwtAuth } = require("../middleware/jwtAuth");

/**
 * @swagger
 * tags:
 *  name: Authors
 *  description: Authentication
 */

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);


module.exports = router;
