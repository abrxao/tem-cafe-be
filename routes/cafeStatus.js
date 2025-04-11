const express = require("express");
const router = express.Router();
const CafeStatus = require("../models/CafeStatus");

// GET /cafe-status ou /cafe-status/:id
router.get("/:id?", (req, res) => {
  const id = req.params.id;

  CafeStatus.get(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }
    res.json(row);
  });
});

// PUT /cafe-status ou /cafe-status/:id (atualização completa)
router.put("/:id?", (req, res) => {
  const id = req.params.id;
  const { hasCoffe, lastPerson } = req.body;

  if (hasCoffe === undefined || !lastPerson) {
    return res.status(400).json({
      error: "Para PUT, ambos hasCoffe e lastPerson são obrigatórios",
    });
  }

  CafeStatus.update(id, hasCoffe, lastPerson, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    CafeStatus.get(id, (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    });
  });
});

// PATCH /cafe-status ou /cafe-status/:id (atualização parcial)
router.patch("/:id?", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (updates.hasCoffe === undefined && !updates.lastPerson) {
    return res.status(400).json({
      error: "Para PATCH, forneça pelo menos hasCoffe ou lastPerson",
    });
  }

  CafeStatus.patch(id, updates, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    CafeStatus.get(id, (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    });
  });
});

module.exports = router;
