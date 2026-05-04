const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// REGRA CRÍTICA: Atribuição Manual pelo Admin
exports.assignTransaction = async (req, res) => {
    const { transactionId, personId } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Atualiza a transação para atribuída
            const transaction = await tx.transaction.update({
                where: { id: transactionId },
                data: { 
                    assignedPersonId: personId,
                    isAssigned: true 
                }
            });

            // 2. Gera a dívida automaticamente para a pessoa
            const debt = await tx.debt.create({
                data: {
                    amount: transaction.amount,
                    personId: personId,
                    status: "PENDENTE"
                }
            });

            // 3. LOG OBRIGATÓRIO
            await tx.log.create({
                data: {
                    action: "ATRIBUICAO_TRANSACAO",
                    details: `Transação ${transactionId} atribuída para Pessoa ${personId}`,
                    userId: req.user.id // Pegando do JWT
                }
            });

            return { transaction, debt };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atribuir transação" });
    }
};
