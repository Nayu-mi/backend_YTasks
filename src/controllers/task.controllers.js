const prisma = require("../prisma/client")

async function postTask(req, res) { //Cria nova tarefa
    const { nome, descricao, dataLimite, listaId } = req.body;
    try {
        const novaTask = await prisma.task.create({
            data: {
                nome,
                descricao,
                dataLimite,
                listaId,
            }
        })

        res.status(201).json({
            mensagem: "Tarefa criada com sucesso!",
            tarefa: novaTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao criar tarefa!"
        })
    }
}

async function getTasks(req, res) { //Pega todas as tarefas da lista
    const id = req.params.id;

    try {
        const tarefas = await prisma.task.findMany({
            where: {
                listaId: Number(id)
            }
        });

        res.status(200).json({
            mensagem: "Tarefas encontradas com sucesso!",
            tarefas: tarefas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao buscar tarefas"
        });
    }
}

async function deleteTask(req, res) { //Deleta uma tarefa por ID
    const id = req.params.id;

    try {
        //Verifica se a tarefa existe
        const tarefa = await prisma.task.findUnique({
            where: { 
                id: Number (id)
            }
        });

        if ( !tarefa ) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" });
        }

        //Se existir, deleta:
        const deletaTask = await prisma.task.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({
            mensagem: "Tarefa excluída com sucesso!",
            tarefa: deletaTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao excluir tarefa"
        });
    }
}

async function patchTaskStatus(req, res) { //Muda a conlusão da tarefa
    const id = req.params.id;

    try {
        //Verifica se a tarefa existe
        const tarefa = await prisma.task.findUnique({
            where: { 
                id: Number (id)
            }
        });

        if ( !tarefa ) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" });
        }

        //Se existir, conclua:
        const concluiTask = await prisma.task.update({
            where: {
                id: Number (id)
            },
            data: {
                concluida: true
            }
        });

        res.status(200).json({
            mensagem: "Tarefa concluída com sucesso!",
            tarefa: concluiTask
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao concluir tarefa"
        });
    }
}

async function putTask(req, res) {
    const id = req.params.id;
    const { nome, descricao, dataLimite, concluida } = req.body;

    try {
        //Verifica se a tarefa existe
        const tarefa = await prisma.task.findUnique({
            where: { 
                id: Number (id)
            }
        });

        if ( !tarefa ) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" });
        }

        //Se existir, conclua:
        const alteraTask = await prisma.task.update({
            where: {
                id: Number (id)
            },
            data: {
                nome,
                descricao,
                dataLimite,
                concluida
            }
        });

        res.status(200).json({
            mensagem: "Tarefa alterada com sucesso!",
            tarefa: alteraTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao alterar tarefa"
        })
    }
}

module.exports = { 
    postTask,
    getTasks,
    deleteTask,
    patchTaskStatus,
    putTask
 }