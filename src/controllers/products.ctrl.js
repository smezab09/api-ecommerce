const Product = require("../models/product");

const obtenerProductos = async (req, res) => {
  try {
    const products = await Product.find();

    return res.json({
      ok: true,
      msg: "Productos obtenidos",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.json({
      ok: true,
      msg: "Producto obtenido",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const nuevo_producto = {
      name,
      description,
      price,
      image,
    };

    const new_product = await Product(nuevo_producto).save();

    return res.json({
      ok: true,
      msg: "Producto creado",
      data: new_product,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
};
