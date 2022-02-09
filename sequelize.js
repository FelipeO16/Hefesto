
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test','root','',{
    host: 'localhost',
    dialect: 'mysql',
});
const { Op } = require("sequelize");


sequelize.authenticate().then( function() {
    console.log('conectado')
}).catch( function(err) {
    console.log('falha ao conectar com o banco de dados. '+err)
})

const Usuario = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

const Produto = sequelize.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
})

const Comandas = sequelize.define('comandas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_client: {
        type: Sequelize.INTEGER
    },
    products: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.BOOLEAN
    }
})

sequelize.insertUser = (name,lastname) => {
    console.log(lastname)
    Usuario.create({
        nome: name,
        sobrenome: lastname
    })
}

sequelize.insertProduct = (name,value) => {
    Produto.create({
        nome: name,
        valor: value
    })
}

sequelize.insertCommand = async (id_client) => {
    Comandas.create({
        id_client: id_client,
        status: true,
        products: '[]'
    })
}

sequelize.updateClient = async (type,id,name,lastname) => {
    await type.update({ nome: name, sobrenome: lastname }, {
        where: {
            id: id
        }
      });
    const result = await type.findAll();
    return JSON.stringify(result)
}


sequelize.insertPList = async (id,list) => {
    await Comandas.update({ products: list }, {
        where: {
            id: id
        }
    });
}

sequelize.updateProduct = async (type,id,name,value) => {
    await type.update({ nome: name, valor: parseFloat(value) }, {
        where: {
            id: id
        }
      });
    const result = await type.findAll();
    return JSON.stringify(result)
}

// GLOBAL FUNCTIONS

sequelize.findItem = async (type,text) => {
    var result = await type.findAll({
        where: {
            nome: {
              [Op.substring]: text
            }
          }
      });
      return JSON.stringify(result)
}

sequelize.listItem = async (type) => {
    const result = await type.findAll({
        order: [
            ['nome', 'ASC'],
        ]
    });
    return JSON.stringify(result)
}

sequelize.listOrders = async (type) => {
    const result = await type.findAll({
        where: { status: true },
    });
    return JSON.stringify(result)
}

sequelize.dayOrders = async (type) => {
    const result = await Comandas.findAll({
        where: { 
            createdAt: {
                [Op.gte]: new Date(new Date().toDateString())
            }
        }
    });
    return JSON.stringify(result)
}

sequelize.weekOrders = async (type) => {
    const result = await Comandas.findAll({
        where: { 
            createdAt: {
                [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7)
            }
        }
    });
    return JSON.stringify(result)
}

sequelize.monthlyOrders = async (type) => {
    const result = await Comandas.findAll({
        where: { 
            createdAt: {
                [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-30)
            }
        }
    });
    return JSON.stringify(result)
}

sequelize.filterDayOrders = async (date) => {
    const result = await Comandas.findAll({
        where: { 
            createdAt: {
                [Op.gte]: new Date(date +' 00:00:00'),
                [Op.lte]: new Date(date +' 23:59:59')
            }
        }
    });
    return JSON.stringify(result)
}

sequelize.delItem = async (type,id) => {
    await type.destroy({
        where: {
          id: id
        }
    });
    const result = await type.findAll();
    return JSON.stringify(result)
}


sequelize.finishOrder = async (id) => {
    await Comandas.update({ status: false }, {
        where: {
            id: id
        }
    });
    const result = await Comandas.findAll({
        where: { status: true }
      });
    return JSON.stringify(result)
}




// Usuario.sync({force:true})
// Produto.sync({force:true})
// Comandas.sync({force:true})

module.exports = {sequelize, Produto, Usuario, Comandas};
