const User = require('../model/userModel');

const createUserIfNotExists = async (userData) => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) return existing;

  const user = await User.create({
    email: userData.email,
    name: userData.name || ""
  });
  return user;
};

const getUserById = async (id) => {
  return User.findById(id);
};

module.exports = { createUserIfNotExists, getUserById };