const Sequelize = require(`sequelize`);

// Instanciando a conneção com o banco de dados 
const sequelize = new Sequelize(`nodeJs`, `root`, `password`, {
    host: `localhost`,
    dialect: `mysql`
});

// verificação do sucesso da verificação
sequelize.authenticate().then(() => {
    console.log(`sucesso na conexão!`);

}).catch((err) => {
    console.log(`erro na conexão:` + err);

});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};