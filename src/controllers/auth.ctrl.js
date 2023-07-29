const HttpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt.helper");

const registrarUsuario = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    // Validar datos de entrada aquí si es necesario

    const user = await User.findOne({ user_name: user_name });

    if (user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
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
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Error al registrar el usuario",
      data: {},
    });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    // Validar datos de entrada aquí si es necesario

    const user = await User.findOne({ user_name: user_name });

    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        ok: false,
        msg: "Usuario o password incorrectos",
        data: {},
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
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
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Error al iniciar sesión",
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
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Error al renovar el token",
      data: {},
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
  renovarToken,
};
