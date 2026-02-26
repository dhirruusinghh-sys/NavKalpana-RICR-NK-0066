const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (userData) => {
  const { name, email, password, roleId } = userData;

  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return reject(err);

      if (result.length > 0) {
        return reject(new Error("Email already registered"));
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password, roleId) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, roleId],
        (err, result) => {
          if (err) return reject(err);

          resolve({ id: result.insertId, name, email, roleId });
        }
      );
    });
  });
};

exports.loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return reject(err);

      if (result.length === 0) {
        return reject(new Error("Invalid email or password"));
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return reject(new Error("Invalid email or password"));
      }

      const token = jwt.sign(
        { id: user.id, roleId: user.roleId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // ✅ Return token + safe user data
      resolve({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
        },
      });
    });
  });
};