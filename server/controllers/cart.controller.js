// controller is for CRUD

// all functions (export it all in obj)

//import the model
const Cart=require('../models/cart.models');

module.exports={
    // read all (cart)

    findAllCart : (req, res)=>{
        Cart.find().sort({teaName:1})
        
            .then((allTea) => {
                // return an obj
                return res.json(allTea)
            })
            .catch(err=> res.status(400).json(err))
    },
    // read one (cart)
    findOneFromCart:(req,res)=>{
        Cart.findById(req.params.id)
        //Author.findOne({_id:req.params.id})
            .then(tea => res.json(tea))
            .catch(err=>res.status(400).json(err))
    },
    //create(cart)

    createCart:(req,res)=>{
        console.log(req.body);
        Cart.create(req.body)
            .then(newTea => res.json(newTea))
            .catch(err =>res.status(400).json(err))
    },

    //delete specific one (cart)
    delete: (req,res)=>{
        Cart.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err=>res.status(400).json(err))
    },
    
    //delete all (cart)
    deleteAll: (req, res)=>{
        Cart.remove({})
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    },

    //update (cart)
    
    updateCart: (req, res)=>{
        Cart.findByIdAndUpdate(req.params.id,req.body,{
            new: true, 
            runValidators:true
        })
            .then(updatedTea => res.json(updatedTea))
            .catch(err=>res.status(400).json(err))
    },
}