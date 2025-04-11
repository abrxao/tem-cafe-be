const express = require("express");
const router = express.Router();
const HistoricoCafe = require("../models/HistoricoCafe");

// GET /historico-cafe (todos) ou /historico-cafe/:id (específico)
router.get("/:id?", (req, res) => {
  const id = req.params.id;

  if (id) {
    // Busca por ID específico
    HistoricoCafe.getById(id, (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }
      res.json(row);
    });
  } else {
    // Busca todos
    HistoricoCafe.getAll((err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  }
});

// POST /historico-cafe
router.post("/", (req, res) => {
  const { person, action } = req.body;

  if (!person || !action) {
    return res.status(400).json({ error: "person and action are required" });
  }

  HistoricoCafe.create(person, action, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    HistoricoCafe.getAll((err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(rows);
    });
  });
});

module.exports = router;
