const {DataTypes} = require('sequelize')

module.exports = {
   // Id User 
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        field:'ID_UTILIZATOR'
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        field:'NUME_UTILIZATOR'
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        field:'ADRESA_MAIL'
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'PAROLA_UTILIZATOR'
    },
    bornDate:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        field:'DATA_NASTERII',
        validate: {
            is:/^\d{4}-\d{2}-\d{2}$/
    }
    },
    isBanned:{
        type:DataTypes.BOOLEAN,
        field:'ESTE_INTERZIS',
        defaultValue:false
  }
}

