const {Op} = require('sequelize')

exports.testForEmptyFields =  (model,...reqParams) => {

     // Check if Object is Complete 

     const checkForCompleteRequest = 
     reqParams.every(item => Object.keys(model).includes(item))

      return checkForCompleteRequest ? Object.entries(model)
              .filter(entries => reqParams.indexOf(entries[0]) !== -1)
                 .every(entries => typeof entries[1] === 'string' ? 
                        entries[1].trim().length !== 0 :  entries[1] !== null) : false 
}

exports.testForUniqueConstraint = async (model,userDB) => {
     const userFound = await userDB.findOne({
         where:{
             [Op.or] : [
                {username:model.username},
                {email:model.email}
             ]
         }  
     })

     return userFound === null 
    
}
