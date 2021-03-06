const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require('../middleware/validation');
const emailValidation = require('../middleware/emailValidation');
const path = require("path");
const multer = require("multer");
const { check } = require('express-validator');
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

//Multer foto registro

const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null, path.join(__dirname, "../../public/uploads/userUploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))},   
});

const upload = multer({storage:storage});

//Rutas de Usuarios

router.get("/login", guestMiddleware, userController.login);    //formulario login
router.post("/login", userController.loginProcess);     //procesar formulario

router.get("/userProfile", authMiddleware, userController.profile);     //perfil del usuario

router.get("/logout/", userController.logout)   //destruir sesion   

router.get("/register", guestMiddleware, userController.register);
router.post("/register", upload.single("img"), validation, emailValidation, userController.processRegister);

router.get("/:id/edit", userController.edit);
router.post("/:id/edit", upload.single("img"), validation, userController.update);

router.post('/:id/delete', userController.delete);

module.exports = router;