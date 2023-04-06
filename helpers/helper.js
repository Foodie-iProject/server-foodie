const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")


const hashPass = (password) => {
  return bcryptjs.hashSync(password);
};

const comparePass = (password, hashPassword) =>{
  return bcryptjs.compareSync(password, hashPassword)
}

const encodeToken = (payload) =>{
  return jwt.sign(payload, process.env.SECRET_FOODIE)
}

const decodeToken = (token) =>{
  return jwt.verify(token, process.env.SECRET_FOODIE)
}

module.exports = {
    hashPass,
    comparePass,
    encodeToken,
    decodeToken
}