const database = require('../connection')
const {testForEmptyFields,testForUniqueConstraint} = require('../resources/validations/user.validation')

const {ValidationError} = require('sequelize')

const {throwServerMessage} = require('../resources/validations/generic.validation')

const bCrypt = require('bcrypt')

/// USER CONTROLLER

exports.createUser = async (req,res,next) => {

    // Get Data 
    const userModelData = req.body 

    // Validation Data 

    // STEP 1 : Check For Null Values 

    if(!testForEmptyFields(userModelData,'username','email','password','bornDate')){
        throwServerMessage(res,'NO ALLOWED VALUES DETECTED! CHECK AGAIN ALL REQUIRED FIELDS!',400)
        return
    }
       

    // STEP 2 : Check For Unique Constraint Error 

    const uniqueConstraintValidation = await testForUniqueConstraint(userModelData,database.User)

    if(!uniqueConstraintValidation){
        throwServerMessage(res,'UNIQUE CONSTRAINT ERROR VIOLATION DETECTED ! CHANGE USERNAME AND/OR EMAIL !',422)
        return
    }


     // Save Data 

        // First Step (Crypt Password) : 

          const newPassword = await bCrypt.hash(userModelData.password,10) // Get Hashed Password 

          userModelData.password = newPassword // Update Model with New Password 

          // Second Step (Save Data)

          try{
              const newUser = await database.User.create(userModelData) // Fetch with Data 

              if(newUser !== null)
                 throwServerMessage(res,
                     `User ${newUser.username} was saved on database successfully !`,201)
          }

          catch(error)
          {
              if(error instanceof ValidationError)
              {
                throwServerMessage(res,
                    `BAD FORMATS DETECTED ON REQUEST ! CHECK WITH ATTENTION ! `,400)
              }

              else
              {
                throwServerMessage(res,error,500)
              }

              next(error)
          }
    
}