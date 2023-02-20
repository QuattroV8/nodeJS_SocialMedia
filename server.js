const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Import Server Configuration 
const {serverConfiguration} = require('./resources/server.config.json')

// Initialize server Core 

const appCore = express() 


// Setting Up BodyParser 

appCore.use(bodyParser.json()) // Json Parser 
appCore.use(bodyParser.urlencoded(
    { extended : true} // Parse Urleconded Bodies
))


/// Setting Up Cors  (Restricted Allowed Access)

appCore.use(cors({
    origin : (origin,callback) => {   
          
           if(!origin)  // Request with no origin (Curl Requests/Mobile Apps)
              return callback(null,true);
           

            if(serverConfiguration.allowOrigin.indexOf(origin) === -1) // Forbidden Cors Origin
             {
                const messageError = "CORS ORIGIN POLICY RESTRICT ACCESS FROM SPECIFIED ORIGIN ! "
                 return callback(new Error(messageError),false)     
             }

             else{ // Allowed Cors Origin 
                return callback(null,true) 
             }
    }
}))

/// Setting UP Routes 

require('./routes/user.router')(appCore)

// Start Server At this Port 

appCore.listen(serverConfiguration.port,  ()=> {
      console.log(`Server ExpressJS start at port ${serverConfiguration.port}...`)
})

