const db = require(`./Config`);


// gerando model user
const users = db.sequelize.define(`users`, {
    name: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    }
});




// executar somente uma fez
//users.sync({ force: true });

module.exports = users;