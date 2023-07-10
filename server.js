const express = require('express'); 
require('dotenv').config();
const cors = require("cors");
const mongoose = require('mongoose');
const BlogModel = require('./models/blog')

require("dotenv").config();

const app = express();
const port = process.env.PORT;


app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Connect to Mongo DB, we are connecting to our database to simplify the process
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {console.log('Connected to Mongo DB')}, err => {console.log(`Cannot connect to DB ${err}`)})

//routes, our paths to our URL's
app.get('/', (req, res) => res.status(200).send ('Server is Running.'))

app.post('/add-blog', (req, res) => {
    const incomingData = req.body;
    
    try{
        const newBlog = new BlogModel(incomingData);
        newBlog.save();

        res.status(200).send({
            message: 'save blog'
        })
    } catch (err){
        console.log(err);
    }
});
app.delete('/delete-profile', (req, res) =>{
    const data =req.body;
    async function deleteUser(){
        try{
            await BlogModel.findByIdAndDelete(data._id)
            res.status(200).send({
                message: 'delete Profile'
            })
        } catch (err) {
            console.log(err);

        }
        }
        deleteUser()
});

app.listen(port, () => {
    console.log(`Server is runnning on https://localhost:${port}`);
});


