// controller is for CRUD

// all functions (export it all in obj)

//import the model
const Tea=require('../models/tea.models');

module.exports={
    // read all (menu)

    findAll : (req, res)=>{
        Tea.find().sort({teaName:1})
        
            .then((allTea) => {
                // return an obj
                return res.json(allTea)
            })
            .catch(err=> res.status(400).json(err))
    },
    

    //create (menu)

    create:(req,res)=>{
        console.log(req.body);
        Tea.create(req.body)
            .then(newTea => res.json(newTea))
            .catch(err =>res.status(400).json(err))
    },
   
    //read one

    findOne:(req,res)=>{
        Tea.findById(req.params.id)
        //Author.findOne({_id:req.params.id})
            .then(tea => res.json(tea))
            .catch(err=>res.status(400).json(err))
    },
    //delete all (menu)
    deleteAll: (req, res)=>{
        Tea.remove({})
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    },
    //update
    update: (req, res)=>{
        Tea.findByIdAndUpdate(req.params.id,req.body,{
            new: true, 
            runValidators:true
        })
            .then(updatedTea => res.json(updatedTea))
            .catch(err=>res.status(400).json(err))
    },

    
}