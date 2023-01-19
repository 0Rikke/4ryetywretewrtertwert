//adicionando libs
const express = require(`express`);
const bodyParser = require("body-parser");
const Sequelize = require(`sequelize`);
const Users = require(`./Models/User`);



const app = express();
/*
   Cors Unblocking
*/
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware

    next();
})
/* 
   config body parser
*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
  routes
*/
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
        res.status(200).json({msg:"Usuário criado com sucesso!"})
        //retornar um json com a menssagem de sucesso
        //res.redirect possibilita redirecionar a aotra rota caso necessário
        //res.algumacoisa

    }).catch((err) => {
        console.log(`falha ao cria um usuário: ` + err);
        //retornar um json com a menssgem de erro
        //res.algumacoisa
    })
})
//alterar usuário
//deletar usuário

app.listen(8081, () => {
    console.log(`server rodando!`);
});
