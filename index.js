const express = require(`express`);
const bodyParser = require("body-parser");
const Sequelize = require(`sequelize`);
const Users = require(`./Models/User`);
const cors = require('cors')

const msg =[];

const app = express();

app.use(cors());

app.use(
    express.urlencoded({
      extended: true,
    })
  );

/* 
   config body parser
*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
  routes
*/

// logar user
app.post(`/api/logUser`, (req, res) => {

    res.contentType(`json`);
    (async () => {
        const getUser = await Users.findAll({where:{
            name: req.body.name,
            password:req.body.password
        }})
        

        res.status(200).json(getUser.length === 1 ? {msg:'usuário valido'} : {msg:`usuário invalido`})

    })();
    
});
//buscar usuário específico                                                 
app.get(`/api/GetUsers`, (req, res) => {
    res.contentType(`json`);
    // busca o usuário por um query do sequelizer e armjazena numa variavel user
    (async () => {
        const getUser = await Users.findAll()

        res.status(200).json(getUser)

    })();
});

//criar usuário
app.post(`/api/CreateUsers`, (req, res,) => {

    Users.create({
        name: req.body.name,
        password: req.body.password
    }).then(() => {
        res.status(200).json({ msg: "Usuário criado com sucesso!" })
  
    }).catch((err) => {
        console.log(`falha ao cria um usuário: ` + err);
        
    })
})
//alterar usuário
//deletar usuário

app.listen(8081, () => {
    console.log(`server rodando!`);
});
