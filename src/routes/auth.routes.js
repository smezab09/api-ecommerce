const { Router } = require("express");
const { validarJWT } = require("../middleware/jwt.middleware");

const {
  registrarUsuario,
  iniciarSesion,
  renovarToken,
} = require("../controllers/auth.ctrl");

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciarSesion);
router.get("/renew", validarJWT, renovarToken);

module.exports = router;
