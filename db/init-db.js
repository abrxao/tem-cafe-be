const db = require("./database");

db.serialize(() => {
  // Criar tabela cafe_status
  db.run(`CREATE TABLE IF NOT EXISTS cafe_status (
    id TEXT PRIMARY KEY,
    hasCoffe INTEGER,
    lastPerson TEXT,
    lastUpdate TEXT
  )`);

  // Criar tabela historico_cafe
  db.run(`CREATE TABLE IF NOT EXISTS historico_cafe (
    id TEXT PRIMARY KEY,
    person TEXT,
    action TEXT,
    timestamp TEXT DEFAULT (datetime('now', 'localtime'))
  )`);

  // Inserir dados iniciais
  db.run(`INSERT OR IGNORE INTO cafe_status (id, hasCoffe, lastPerson, lastUpdate) 
          VALUES ('1', 1, 'Abraao', datetime('now', 'localtime'))`);

  const historico = [
    { id: "e235", person: "Abraão", action: "fez_cafe" },
    { id: "3172", person: "Abraao", action: "cabou_cafe" },
    { id: "6045", person: "Abraao", action: "fez_cafe" },
    { id: "a818", person: "Abraao", action: "cabou_cafe" },
    { id: "7a15", person: "Abraao", action: "fez_cafe" },
  ];

  const stmt =
    db.prepare(`INSERT OR IGNORE INTO historico_cafe (id, person, action) 
                          VALUES (?, ?, ?)`);

  historico.forEach((item) => {
    stmt.run(item.id, item.person, item.action);
  });

  stmt.finalize();

  console.log("Banco de dados inicializado com sucesso!");
});

db.close();
