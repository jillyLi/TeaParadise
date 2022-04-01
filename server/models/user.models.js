const mongoose=require(`mongoose`);
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "{PATH} must be present"],
        minlength:[3,"{PATH} must be at least 3 chars"]
    },
    lastName:{
        type:String,
        required:[true, "{PATH} must be present"],
        minlength:[3,"{PATH} must be at least 3 chars"]
    },
    email:{
        type:String,
        required:[true, "{PATH} must be present"],
        minlength:[3,"{PATH} must be at least 3 chars"]
    },
    // address:{
    //     type:String,
    //     required:[true, "{PATH} must be present"],
    //     minlength:[3,"{PATH} must be at least 3 chars"]
    // },
    password:{
        type:String,
        required:[true, "{PATH} must be present"],
        minlength:[3,"{PATH} must be at least 3 chars"]
    },
    confirm:{
        type:String,
        required:[true, "{PATH} must be present"],
        minlength:[3,"{PATH} must be at least 3 chars"]
    },
    // zip:{
    //     type:Number,
    //     required:[true, "{PATH} must be present"],
    //     minlength:[3,"{PATH} must be at least 3 chars"]
    // },
    reward:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

//create the schema and export it
const User= mongoose.model("User", UserSchema);
module.exports=User;