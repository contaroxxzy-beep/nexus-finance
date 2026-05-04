const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.static('public')); // Entrega os arquivos da pasta public

// Rota principal: entrega o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de Teste de Banco (para matar o erro P1001 na nuvem)
app.get('/api/status', async (req, res) => {
    try {
        await prisma.$connect();
        res.json({ status: "Online", banco: "Conectado no Supabase" });
    } catch (err) {
        res.status(500).json({ status: "Erro", mensagem: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Nexus rodando na porta ${PORT}`));
