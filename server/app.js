let express = require('express');
let connectDB = require('./database/db')
let stdRouter = require('./routes/stdRouter')
const cors = require("cors")

let app  = express();

app.use(cors());

connectDB();

app.use(express.json());

// server testing api
app.get('/' , (req, res)=>{
    res.end(JSON.stringify({message: "Surver running successfully"}))

})

//api for std
app.use('/api/std', stdRouter)


app.listen(3000, 'localhost', ()=>{
    console.log("Server Started at http://localhost:3000")
})