// Import MySQL && Sequelize ORM 
const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

// Import Data Configuration 

const {databaseConfiguration : dbConfig} = require('./resources/server.config.json')


module.exports = database = {}  // Export Database 


// Create Database Query 

const rawQueryCreateDatabase = 
                (dbName) => `CREATE DATABASE IF NOT EXISTS ${dbName};`


// Init Connection

;(async ()=> {
 
     // Create MySQL Connection 

     try{

     const mysqlConnection = await mysql.createConnection({
        host:dbConfig.host,
        port:dbConfig.port,
        user:dbConfig.username,
        password:dbConfig.password
     })

     await mysqlConnection.query(rawQueryCreateDatabase(dbConfig.databaseName))

    }
    catch(error)
    {
        throw new Error(error)
    }


     // Link MySQL to Sequelize ORM

     const seqInstance = new Sequelize(dbConfig.databaseName,dbConfig.username,dbConfig.password,{
        dialect:dbConfig.dialect,
        logging:dbConfig.logging,
        pool:dbConfig.pool
     })
     

     // Attach Models to DB

     database.User = require('./models/user.model').init(seqInstance)
   


     // Sync Tables 

     try{
     await seqInstance.sync({
        force:true})

        console.log('All Models were synchronized successfully !')
     }
     catch(Err) {
      throw new Error(Err)
     }



})()
