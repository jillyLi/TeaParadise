const express = require("express")
const app = express()
require("dotenv").config()
const db="teas_db"
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const myFirstSecret = process.env.FIRST_SECRET_KEY;
const bodyParser = require("body-parser")
const cors = require("cors")
// const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//-----------------------

//middleware
app.use(express.json(),cors(), express.urlencoded({extended:true}));
// cookieParser = require("cookie-parser"),
// ------------------------

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

//database connection
require('./config/mongoose.config')(db);
// require("./config/mongoose.config")(process.env.DB_NAME);

// app.use(cookieParser());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//connect the routes
require("./routes/tea.route")(app);


// app.listen(port, ()=>console.log(`server up on port: ${port}`))

app.listen(process.env.PORT || 8000, () => {
	console.log("Sever is listening on port 8000")
})


