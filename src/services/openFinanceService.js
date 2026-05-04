// Função para salvar o itemId após a conexão real
exports.saveBankConnection = async (userId, itemId) => {
    return await prisma.config.update({
        where: { id: 1 },
        data: { itemId: itemId } // REGRA: Salvar apenas após conexão
    });
};
