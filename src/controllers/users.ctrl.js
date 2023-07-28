const User = require("../models/user");

const obtenerUsuarios = async (req, res) => {
  try {
    const users = await User.find();

    return res.json({
      ok: true,
      msg: "Usuarios obtenidos",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { user_name, password, email, age, status } = req.body;

    const nuevo_usuario = {
      user_name,
      password,
      email,
      age,
      status,
    };

    const new_user = await User(nuevo_usuario).save();

    return res.json({
      ok: true,
      msg: "Usuario creado",
      data: new_user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, password, email, age, status } = req.body;

    const informacion_nueva = {
      user_name,
      password,
      email,
      age,
      status,
    };

    const usuario_actualizado = await User.findByIdAndUpdate(
      id,
      informacion_nueva,
      { new: true }
    );

    return res.json({
      ok: true,
      msg: "Usuario actualizado",
      data: usuario_actualizado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario_eliminado = await User.findByIdAndRemove(id);

    return res.json({
      ok: true,
      msg: "Usuario eliminado",
      data: usuario_eliminado,
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
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
