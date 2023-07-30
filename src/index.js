require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
const app = express();

dbConnection();
app.use(cors());
app.use(express.json());

// Middleware para verificar el token de autenticación
const validarJWT = require("./middleware/jwt.middleware");

app.get("/api", (req, res) => {
  return res.json({
    msg: "Bienvenido al Api de mi E-Commerce",
  });
});

// Rutas públicas que no requieren autenticación
app.use("/api/usuarios", require("./routes/users.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// Rutas protegidas que requieren autenticación
app.use("/api/productos", validarJWT, require("./routes/products.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
