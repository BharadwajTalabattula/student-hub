const express = require('express');
const auth = require("../auth/auth")
const {handleStdSignup, handleStdLogin, getDetails, handleUpdatestdName, handleUpdatePassword} = require('../controller/stdController');
const stdRouter = express.Router();

stdRouter.get('/', (req, res)=>{
    return res.json({message: 'stdRouter server started'})

})

//signup std
stdRouter.post('/signup', handleStdSignup)

stdRouter.post('/login', handleStdLogin)


stdRouter.get('/get', auth, getDetails)

stdRouter.patch('/update', auth, handleUpdatestdName)

stdRouter.patch('/updatepassword', auth, handleUpdatePassword)



module.exports = stdRouter;
