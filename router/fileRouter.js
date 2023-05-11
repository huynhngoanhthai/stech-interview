const { Router } = require("express");
 const fileController = require("../controller/fileController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const upload = require('../middlewares/upload')
/**
 * @swagger
 * tags:
 *  name: Authors
 *  description: Authentication
 */

const router = Router();
router.post("/upload", jwtAuth , upload.array("photo"),fileController.upload);
router.get("/history-upload",jwtAuth,fileController.history )
router.patch("/delete-upload/:filename",jwtAuth,fileController.delete )



module.exports = router;
