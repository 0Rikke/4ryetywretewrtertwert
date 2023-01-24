const express = require(`express`);
const bodyParser = require("body-parser");
const Sequelize = require(`sequelize`);
const Users = require(`./Models/User`);
const crypto = require('crypto');
const cors = require('cors')

const msg =[];

const app = express();

const gerarSalt = () =>{
    return crypto.randomBytes(16).toString('hex');
}
const sha512 = (senha,salt) =>{
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(senha);
    var hash = hash.digest('hex');
    return {
        salt,
        hash,
    };
}

const login = (senha, hashDB,saltDB) =>{
    var senhaSalt = sha512(senha,saltDB)
    return senhaSalt.hash === hashDB;

}

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
        }})
        if(getUser.length !== 0 ){
        var hash = getUser[0].hash;
        var salt = getUser[0].salt;

        var validUser = login(req.body.password,hash,salt);
        }
        res.status(200).json(validUser ? {msg:'usuário valido',token:'132hjk1234lhj'} : {msg:`usuário invalido`})

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

    const nome = req.body.name;
    const senha  = req.body.password

    const saltGerado = gerarSalt();

    const hashSalt = sha512(senha,saltGerado);

    
    Users.create({
        name: nome,
        hash:hashSalt.hash,
        salt:hashSalt.salt

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
