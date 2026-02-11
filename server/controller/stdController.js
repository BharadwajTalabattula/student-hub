const bcrypt = require("bcrypt");
const STD = require('../model/stdModel')
const jwt = require("jsonwebtoken");

const handleStdSignup = async(req, res) =>{
    try{
        if(req.body == undefined){
            return  res.status(400).json({message: "details are mandatory to create student account"})
        }

        const {email, name, password, age } = req.body
        if(!email || !name || !password || !age){
            return res.status(400).json({message: 'all input fields are mandatory'})
        }
        const isStd = await STD.findOne({ email })

        if(isStd){
            return res.status(409).json({message: "stdent with this email already exsits"})
        }

        const hashedPass = await bcrypt.hash(password, 10) // why bcrypt what is hash

        const isCreated = await STD.insertOne({ email, name, age, password: hashedPass}) //STD. insert how?

        console.log(isCreated);

        return res.status(201).json({message: "student account created successfully"})
        
    }catch(error){

        return req.status(500).json({message: "internal server error"})
    }
}

const handleStdLogin = async(req, res)=>{
    try{
        if(req.body === undefined){ // why check undefined
            return res.status(400).json({message: "details are mandatory to login student account"})
        }
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "all input fields are mandatory"})

        }


        const isStd = await STD.findOne({ email });
        

        if( !isStd){
            return res.status(409).json({message: "invalid email"})
        }

        const isChecked = await bcrypt.compare(password, isStd.password)

        if(!isChecked){
            return res.status(409).json({message : "invalid password"})

        }

        const token = jwt.sign({ email, _id: isStd._id}, "jsp", { // why token , what it generate, what is the flow
             expiresIn: '1h' // how 1hr works
        })

        return res.status(200).json({ message: "login successfully", token })

    }catch(error){
        return req.status(500).json({message: "internal server error"})
    }
}

const getDetails = async(req, res)=>{
    try{
        const { _id } = req.payload // why? what is _id
        const isStd = await STD.findById({ _id }, { password: 0}) // why password

        if(!isStd){
            return res.status(401).json({message: "Token not valid because acount deleted"})
        }
        return res.status(200).json({ std: isStd });


    }catch(error){
        return res.status.json({message: "Internal server error" });
    }
}

const handleUpdatestdName = async (req, res) => {
    try{
        const { _id } = req.payload; // why id and payload

        if(req.body === undefined){
            return res.status(400).json({ message: "details are mandatory to login student account" })
        } // why checking body?

        const { name } = req.body;
        const isStd = await STD.findById({ _id }) // why checking based on id

        if (!isStd){
            return res.status(401).json({ message: "token not valid because account deleted" })
        }

        if(!name){
            return res.status(400).json({message: "all input fields are mandatory" })
        }

        if( name === isStd.name){
            return res.status(400).json({message: "new name same as previous"})
        }

        isStd.name = name;
        await isStd.save();// save()?
        return res.status(200).json({ message : "name updated successfully" })

    }catch(error){
        return req.status(500).json({ message: "Internal server error "})
    }
}


const handleUpdatePassword = async(req, res)=>{

   try{
    let { _id } = req.payload;
    const isStd = await STD.findById({ _id });
    if( ! isStd){
        return res.status(401).json({message: "token not valid because acc has been deleted"});
    }

    if( req.body === undefined){
        return res.status(401).json({message: "details are mandatory to updated"})
    }

    const{password, newPassword} =  req.body;

    if( !password || !newPassword){
        return res.status(401).json({message: "Inputfields are mandatory"})
    }

    const isMatched = await bcrypt.compare(password, isStd.password);

    if(!isMatched){
        return res.status(401).json({message: 'current password is wrong'})
    }

    if(password == newPassword){
        return res.status(401).json({message: "new password cannot be same as current password"})
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);

    isStd.password = hashedPass;

    await isStd.save();
    return res.status(200).json({message: "password updated successfully"});

   }catch(error){
    return res.status(500).json({message: "internal server error"})
   }

}


module.exports = {handleStdSignup, handleStdLogin, getDetails, handleUpdatestdName, handleUpdatePassword}