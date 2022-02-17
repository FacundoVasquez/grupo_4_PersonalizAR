const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const multer = require("multer");
const path = require("path");

const storage=multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null, path.resolve("public/img/products"))
    },
    filename: function (req, res, cb) {
        cb (null, file.filename + '_' + Date.now () + patch.extname (file.originalname))},   
});

const upload=multer({storage:storage});



router.get("/", productsController.index);

router.get("/:id", productsController.detail);

router.get("/cart", productsController.productCart);

router.get("/create", productsController.store);
router.post('/',upload.single('imagen'),productsController.store);


module.exports = router;

