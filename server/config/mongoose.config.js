//connect with mongoose
const mongoose=require(`mongoose`);

//alternative way
module.exports =(db)=>{
    mongoose.connect(`mongodb://127.0.0.1:27017/${db}`)
        .then(()=> console.log(`connected to ${db}`))
        .catch(err => console.log(`cant connect to ${db}`,err))
}