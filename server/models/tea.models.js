const mongoose=require(`mongoose`);
const teaProductSchema=new mongoose.Schema({
    teaName:{
        type:String,
        required:[true, "{PATH} must be present"],
        minlength:[3,"{PATH} must be at least 3 chars"]

    },
    sweetness:{
        type:String,
        default:"100%"
    },
    ice:{
        type:String,
        default:"100%"
    },
    topping:{
        type:String,
        default:"None"
    },

    picture:{
        type:String,
        required:[true, "{PATH} must be present"],
    },
    price:{
        type:Number,
        required:[true, "{PATH} must be present"],
    },
    description:{
        type:String,
        required:[true, "{PATH} must be present"],
        default:"none"
    }
},{timestamps:true})

//create the schema and export it
const TeaProduct= mongoose.model("TeaProduct", teaProductSchema);
module.exports=TeaProduct;