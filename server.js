const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Nexus Finance Online 24/7</h1><p>O sistema de Open Finance está operando.</p>');
});

// Rota para testar se o banco de dados está lendo algo
app.get('/status-banco', async (req, res) => {
  try {
    const teste = await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "Banco Conectado!", dados: teste });
  } catch (error) {
    res.status(500).json({ status: "Erro no banco", erro: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Nexus rodando na porta ${PORT}`);
});

app.use(express.static('public')); // Se o html estiver numa pasta 'public'
// OU
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
