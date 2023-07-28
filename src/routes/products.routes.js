const { Router } = require("express");
const { validarJWT } = require("../middleware/jwt.middleware");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
} = require("../controllers/products.ctrl");

const router = Router();

router.get("/", obtenerProductos);
router.get("/:id", obtenerProducto);
router.post("/", validarJWT, crearProducto);

module.exports = router;
