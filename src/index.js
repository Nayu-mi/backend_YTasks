require('dotenv').config(); //Carrega as variáveis do .env

const express = require('express'); //Importa o express
const cors = require('cors'); //Permite requisições de outros domínios
const app = express();

//Middlewares
app.use(cors()); //Libera acesso externo (frontend)
app.use(express.json()); //Permite usar JSON no corpo das requisições

//Rotas
app.use('/usuarios', require('./routes/user.routes'))
app.use('/listas', require('./routes/taskList.routes'));
app.use('/tarefas', require('./routes/task.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
});