const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI = "mongodb://0.0.0.0:27017/iNoteBook"
const connectToMongo = () => {
    mongoose.connect(mongoURI, () =>{
        console.log("Connected to mongo succesfully");
    })   
}

module.exports = connectToMongo;