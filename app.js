const express = require("express");
const cors = require("cors");
const cafeStatusRouter = require("./routes/cafeStatus");
const historicoCafeRouter = require("./routes/historicoCafe");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/cafe-status", cafeStatusRouter);
app.use("/historico-cafe", historicoCafeRouter);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do Status do Café está funcionando!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
