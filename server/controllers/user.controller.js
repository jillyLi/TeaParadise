const User=require('../models/user.models');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

module.exports={
    // read all (User)

    findAllUser : (req, res)=>{
        User.find().sort({firstName:1})
        
            .then((allTea) => {
                // return an obj
                return res.json(allTea)
            })
            .catch(err=> res.status(400).json(err))
    },
    // read one (User)
    findOneFromUser:(req,res)=>{
        User.findById(req.params.id)
        //Author.findOne({_id:req.params.id})
            .then(tea => res.json(tea))
            .catch(err=>res.status(400).json(err))
    },
    //create(User)

    createUser:(req,res)=>{
        console.log(req.body);
        User.create(req.body)
            .then(newUser => res.json(newUser))
            .catch(err =>res.status(400).json(err))
    },

    //delete specific one (User)
    delete: (req,res)=>{
        User.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err=>res.status(400).json(err))
    },
    
    //delete all (User)
    deleteAll: (req, res)=>{
        User.remove({})
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    },

    //update (User)
    
    updateUser: (req, res)=>{
        User.findByIdAndUpdate(req.params.id,req.body,{
            new: true, 
            runValidators:true
        })
            .then(updatedUser => res.json(updatedUser))
            .catch(err=>res.status(400).json(err))
    },


    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
     
        if(user === null) {
            // email not found in users collection
            return res.sendStatus(400);
        }
     
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
        if(!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);
        }
     
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
     
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    },

    // register: (req, res) => {
    //     User.create(req.body)
    //       .then(user => {
    //           const userToken = jwt.sign({
    //               id: user._id
    //           }, process.env.SECRET_KEY);
       
    //           res
    //               .cookie("usertoken", userToken, secret, {
    //                   httpOnly: true
    //               })
    //               .json({ msg: "success!", user: user });
    //       })
    //       .catch(err => res.json(err));
    // },
    register: (req, res) => {
        User.create(req.body)
          .then(user => {
              res.json({ msg: "success!", user: user });
          })
          .catch(err => res.json(err));
      },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

}