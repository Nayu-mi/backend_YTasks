const prisma = require("../prisma/client")

async function postList(req, res) {
    const { nome, userId } = req.body;

    try {
        const novaLista = await prisma.taskList.create({
            data: {
                nome,
                userId,
            }, 
        });

        res.status(201).json({
            mensagem: "Lista criada com sucesso!",
            lista: novaLista,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({mensagem: "Erro ao criar a lista"});
    }
}

module.exports = { postList }