// import the controllers
const Tea=require("../controllers/tea.controller");
const Cart=require("../controllers/cart.controller");
const User=require("../controllers/user.controller");
module.exports = (app)=>{
    // menu, immutable; not for deleting
    app.get("/api/teas", Tea.findAll);
    app.post("/api/teas", Tea.create);
    app.get("/api/teas/:id",Tea.findOne);
    app.put("/api/teas/:id/edit",Tea.update);
    app.delete("/api/teas",Tea.deleteAll);

    // cart, muttable; can be deleting/editing
    app.get("/api/teasInCart",Cart.findAllCart);
    app.get("/api/teasInCart/:id",Cart.findOneFromCart);
    app.post("/api/teasInCart",Cart.createCart);
    app.delete("/api/teasInCart/:id",Cart.delete);
    app.delete("/api/teasInCart",Cart.deleteAll);
    app.put("/api/teasInCart/:id/edit",Cart.updateCart);

    //user, immutable
    //app.get("/api/user",User.findAllUser);
    // app.get("/api/user/:id",User.findOneFromUser);
     app.post("/api/user",User.register);
    // app.delete("/api/user/:id",User.delete);
    // app.delete("/api/user",User.deleteAll);
    // app.put("/api/user/:id/edit",User.updateUser);

    
}