const prisma = require('../prisma/client'); //conecta com o banco
const bcrypt = require('bcrypt'); //biblioteca para criptografar a senha

//funcao que lida com cadstro
async function postUser(req, res) {
    const { nome, email, senha } = req.body;

    //Verifica se o email ja esta cadastrado
    const usuarioExistente = await prisma.user.findUnique({ //busca um unico registro igual 
        where: { email },
    });

    if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    //Criptografa a senha usando bcrypt
    const senhaCriptografada = await bcrypt.hash(senha, 10); //cria uma versão crpitografada da senha, 10 é o nível de segurança

    //Cria o usuário no banco
    const novoUsuario = await prisma.user.create({
        data: {
            nome,
            email,
            senha: senhaCriptografada,
        },
    });

    //Retorna dados sem a senha
    res.status(201).json({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
    });
}

module.exports = { postUser }
