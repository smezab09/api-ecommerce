const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // opción para evitar el deprecated warning
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("Error de conexión a la base de datos:", error);
    throw new Error("Error al iniciar la base de datos");
  });

  db.once("open", () => {
    console.log("Base de datos online");
  });
};

module.exports = {
  dbConnection,
};
