const db = require(`./Config`);


// gerando model user
const users = db.sequelize.define(`users`, {
    name: {
        type: db.Sequelize.STRING
    },
    hash:{
        type: db.Sequelize.STRING
    },
    salt: {
        type: db.Sequelize.STRING
    }
});




// executar somente uma fez
//users.sync({ force: true });

module.exports = users;