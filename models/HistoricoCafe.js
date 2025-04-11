const db = require("../db/database");

const HistoricoCafe = {
  getAll: (callback) => {
    db.all("SELECT * FROM historico_cafe ORDER BY timestamp DESC", callback);
  },

  getById: (id, callback) => {
    db.get("SELECT * FROM historico_cafe WHERE id = ?", [id], callback);
  },

  create: (person, action, callback) => {
    const id = Math.random().toString(36).substring(2, 6);
    db.run(
      "INSERT INTO historico_cafe (id, person, action) VALUES (?, ?, ?)",
      [id, person, action],
      callback
    );
  },
};

module.exports = HistoricoCafe;
