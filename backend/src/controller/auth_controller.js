// import { auth } from "../middlewares/auth_middleware.js";

const login = async (request, reply) => {
  return reply.send({ message: "Login successful" });
};

const logon = async (request, reply) => {
  return reply.send({ message: "Logon successful" });
};

const logout = async (request, reply) => {
  return reply.send({ message: "Logout successful" });
};

export {
  login,
  logon,
  logout,
};
