const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt.helper");

const registrarUsuario = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const user = await User.findOne({ user_name: user_name });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: `El usuario ${user_name} ya existe`,
        data: {},
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const nuevo_usuario = {
      user_name,
      password: bcrypt.hashSync(password, salt),
    };

    const new_user = await User(nuevo_usuario).save();

    const token = await generarJWT(new_user.id);

    return res.json({
      ok: true,
      msg: "Usuario registrado",
      data: new_user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const user = await User.findOne({ user_name: user_name });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o password incorrectos",
        data: {},
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o password incorrectos",
        data: {},
      });
    }

    const token = await generarJWT(user.id);

    return res.json({
      ok: true,
      msg: "Acceso correcto",
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const renovarToken = async (req, res) => {
  try {
    const { user } = req;

    const token = await generarJWT(user.id);

    return res.json({
      ok: true,
      msg: "Token renovado",
      data: user,
      token,
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
  registrarUsuario,
  iniciarSesion,
  renovarToken,
};
