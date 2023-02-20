// Import Datatype & Model Class

const {Model} = require('sequelize')

// Import User Fields 

const userFields = require('../resources/fields/user.fields')


class User extends Model {
    static init(sequelizeInstance)
    {
        return super.init(userFields,{
            sequelize:sequelizeInstance,
            createdAt:'DATA_INREGISTRARII',
            updatedAt:false,
            tableName:'UTILIZATORI'
        })
    }
}


module.exports = User