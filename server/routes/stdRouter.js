const express = require('express');
const auth = require("../auth/auth")
const {handleStdSignup, handleStdLogin, getDetails, handleUpdatestdName, handleUpdatePassword} = require('../controller/stdController');
const stdRouter = express.Router();

stdRouter.get('/', (req, res)=>{
    return res.json({message: 'stdRouter server started'})

})

//signup std
stdRouter.post('/signup', handleStdSignup)

//login std
stdRouter.post('/login', handleStdLogin)

//get std
stdRouter.get('/get', auth, getDetails)

//updated  std
stdRouter.patch('/update', auth, handleUpdatestdName)

//updated password std
stdRouter.patch('/updatepassword', auth, handleUpdatePassword)



module.exports = stdRouter;
