import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "../App.css";
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			// iconColor: "#c4f0ff",
            iconColor:"black",
			// color: "#fff",
            color:"white",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
            // color:"red"
		}
	}
}

export default function CheckoutForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements();

    // pick up time ==========> 15 mins later time
    let currentDate=new Date();
    let futureTime=new Date(currentDate. getTime() + 15*60000);
    let date = futureTime.getFullYear()+'-'+(futureTime.getMonth()+1)+'-'+futureTime.getDate();
    let time = futureTime.getHours() + ":" + (futureTime.getMinutes());
    let dateTime;
    if(futureTime.getHours()<12){
        dateTime = time+' am  on '+ date;
    }else{
        dateTime = time+' pm  on '+ date;
    }
    const pickUpTime=dateTime;
    //========================<

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:8000/payment", {
                    amount: 1000,
                    id
                })

                if(response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                alert("Invalid Payment");
                console.log("Error", error)
            }
        } else {
            alert("Invalid Payment");
            console.log(error.message)
        }
    }

    const clearAllCart=()=>{
        axios.delete("http://localhost:8000/api/teasInCart")
            .then(res=>{
                console.log(res.data);
                //window.location.reload(false);
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="Main">
         <div className="bar">
            <span className="barSpan"> <Link to="/" className="links">Home</Link></span>
            <span className="barSpan"><Link to="/menu" className="links">Menu</Link></span>
            <span className="barSpan"><Link to="/signUp" className="links">Login</Link></span>
        </div>
        <div className="header">
            <h1 className="Title">TEA PARADISE CHECKOUT</h1>
            <hr />
        </div>
        
        {!success ? 
        
        <form className="cardForm" onSubmit={handleSubmit}>
            <h2 style={{marginLeft:"30%"}}>Card Information</h2>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="payButton">Pay</button>
            <br /><br /><br />
            <Link to="/purchase" style={{marginLeft:"77%", textDecoration:"none"}}> Go Back</Link>
        </form>
        
        :
       <div>
           {clearAllCart()}
           <p style={{textAlign:"center", marginTop:"5%",fontSize:"30px"}}>
                Thank you for your order! Your Order Has Been Placed!
            </p>
            <br />
            <p style={{textAlign:"center", fontSize:"25px"}}>
                And Your estimate pick up time is around <span style={{fontSize:"35px", fontStyle:"italic", textDecoration:"underline"}}>{pickUpTime}</span>
           </p>
       </div> 
        }
            
        </div>
    )
}