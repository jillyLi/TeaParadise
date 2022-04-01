import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams ,Link,useHistory} from 'react-router-dom'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import '../App.css';
import StripeContainer from './StripeContainer';

const Purchase=(props)=>{
    const history=useHistory();
    const [teas, setTeas] = useState([]);
    const [tax, setTax]=useState(0);
    const [total, setTotal]=useState(0);

    // card information

    const [showItem, setShowItem] = useState(false);
    
    useEffect(()=>{
    
        axios.get("http://localhost:8000/api/teasInCart")
            .then(res=>{
                setTeas(res.data);
                totalPrice(res.data);
            } )
            .catch(err => console.log(err))
    },[])
    
    
    
    const totalPrice =(teas)=>{
        let num=0;
        let tax=0.0975;
        teas.map((tea,ind)=>{
            num+=tea.price;
            if(tea.topping!=="None"){
                num+=0.75;
            }
        })
        tax*=num;
        num+=tax;
        
        tax=tax.toFixed(2);
        num=num.toFixed(2);
        setTax(tax);
        setTotal(num);
    }

    const updateCard=(e)=>{
        e.preventDefault();
    }
    return (
        <div className="Main">
            <div className="bar">
                <span className="barSpan"> <Link to="/" className="links">Home</Link></span>
                <span className="barSpan"><Link to="/menu" className="links">Menu</Link></span>
                <span className="barSpan"><Link to="/signUp" className="links">Login</Link></span>
            </div>
            <div className="header">
                <h1 className="Title">TEA PARADISE PURCHASE</h1>
                <hr />
            </div>
            <div className="purchaseBody">
                
                <div className="leftPurchase">
                    <h3 style={{marginLeft:"30%"}}>Your Order Review</h3>
                    
                    <div style={{marginLeft:"5%"}}>
                    {
                    teas.map((tea, ind)=>{
                        return (
                            <p key={tea._id}> 
                                <b>{ind+1}. {tea.teaName} &nbsp;<span className="price" style={{marginLeft:"43%"}}>${tea.topping!=="None" ? (tea.price+0.75) : tea.price}</span></b> <br />
                                <b style={{marginLeft:"7%"}}>- Sweetness: ({tea.sweetness})</b><br />
                                <b style={{marginLeft:"7%"}}>- Ice Level: ({tea.ice})</b><br />
                                <b style={{marginLeft:"7%"}}>-Topping: {tea.topping}</b><br />
                            </p>
                        )
                    })
                    }
                    <br />
                    <b>+ Tax(9.75%): <span style={{marginLeft:"48%"}}>${tax} </span></b>
                    <br /><br /><br />
                    
                    <p style={{marginLeft:"65%"}}>Total: ${total} </p> 
                    <br/><p style={{marginLeft:"30%"}}><Link to="/card" className="links">Add Card Here</Link></p>
                    <br /><br />
                    <Link to="/cart" style={{marginLeft:"40%",textDecoration:"none",fontSize:"13px"}}> Go Back</Link>
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    )
}
export default Purchase