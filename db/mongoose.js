//This file will handle connection logic to mongodb database

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/TaskManagerTest",{useNewUrlParser : true}).then(()=>{
    console.log("Connnected to the Mongodb database")
}).catch((error)=>{
    console.log("Error Connecting to the Mongodb database",error)
})
// , useCreateIndex: true, useFindAndModify:false
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
}