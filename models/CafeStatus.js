const db = require("../db/database");

const CafeStatus = {
  get: (id, callback) => {
    const queryId = id || "1";
    db.get("SELECT * FROM cafe_status WHERE id = ?", [queryId], callback);
  },

  update: (id, hasCoffe, lastPerson, callback) => {
    const lastUpdate = new Date().toISOString();
    const queryId = id || "1";

    db.run(
      "UPDATE cafe_status SET hasCoffe = ?, lastPerson = ?, lastUpdate = ? WHERE id = ?",
      [hasCoffe, lastPerson, lastUpdate, queryId],
      callback
    );
  },

  patch: (id, updates, callback) => {
    const lastUpdate = new Date().toISOString();
    const queryId = id || "1";

    // Construir a query dinamicamente baseada nos campos fornecidos
    let setClause = [];
    let params = [];

    if (updates.hasCoffe !== undefined) {
      setClause.push("hasCoffe = ?");
      params.push(updates.hasCoffe);
    }

    if (updates.lastPerson) {
      setClause.push("lastPerson = ?");
      params.push(updates.lastPerson);
    }

    setClause.push("lastUpdate = ?");
    params.push(lastUpdate);

    params.push(queryId);

    if (setClause.length === 1) {
      // Apenas lastUpdate foi adicionado
      return callback(
        new Error("Nenhum campo válido para atualização fornecido")
      );
    }

    db.run(
      `UPDATE cafe_status SET ${setClause.join(", ")} WHERE id = ?`,
      params,
      callback
    );
  },
};

module.exports = CafeStatus;
