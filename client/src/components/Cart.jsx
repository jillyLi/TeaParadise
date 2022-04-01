import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams ,Link,useHistory} from 'react-router-dom'
import '../App.css';
import '../Main.css';
const Cart=(props)=>{

    const [teas, setTeas] = useState([]);
    const [err, setErr]=useState("");
    const history=useHistory();
    const [click, setClick]=useState(false);
    useEffect(()=>{
    
        axios.get("http://localhost:8000/api/teasInCart")
            .then(res=>{
                setTeas(res.data);
                
            } )
            .catch(err => console.log(err))
       
    },[])

    const handleErr=(teas)=>{
        setClick(true);
        if(teas.length<1){
            setErr( "Cannot sumbit an empty order!!!");
        }else{
            setErr( "");
        }
    }
    

    const deleteThis=(deleteId)=>{
        console.log(deleteId);
        // make a request to database to delete
        axios.delete("http://localhost:8000/api/teasInCart/"+deleteId)
            .then(res=>{
                console.log(res.data);
                
                //remove from DOM after a successful delete
                setTeas(teas.filter((tea)=>tea._id !==deleteId));
                history.push("/cart");
            })
            .catch(err => console.log(err))
    }

    
    const deleteOrder = (teas)=>{
        axios.delete("http://localhost:8000/api/teasInCart")
            .then(res=>{
                console.log(res.data);
                setTeas([]);
                history.push("/cart");
                //window.location.reload(false);
                
            })
            .catch(err => console.log(err));
    }
    
    // countDup = name + uniq
    
    
    const countEach=(teaName)=>{
        let countDup=new Map();
        for(let tea of teas){
            if(!countDup.has(tea.teaName)){
                countDup.set(tea.teaName, 1);
            }
            else{
                if(tea.topping==="None" && tea.ice==="100%" &&tea.sweetness==="100%"){
                    countDup.set(tea.teaName, countDup.get(tea.teaName)+1);
                }
            }
        }
        
        
    }
    
    
    let noDupArr=[];
    const noDupArrFinal=(teaName,topping)=>{
        //uniq = topping + qty
        let uniq=new Map();
        let countDup=new Map();
        for(let tea of teas){
            if(!countDup.has(tea.teaName)){
                uniq.set(tea.topping,1);
                countDup.set(tea.teaName, uniq);
                noDupArr.push(tea);
            }else if(!uniq.has(tea.topping)){
                uniq.set(tea.topping, 1);
                countDup.set(tea.teaName, uniq);
                noDupArr.push(tea);
             }
        }
        
    }

    return (
        <div className="Main">
            <div className="bar">
                <span className="barSpan"> <Link to="/" className="links">Home</Link></span>
                <span className="barSpan"><Link to="/menu" className="links">Menu</Link></span>
                <span className="barSpan"><Link to="/signUp" className="links">Login</Link></span>
            </div>
            <div className="header">
                <h1 className="Title">TEA PARADISE CART</h1>
                <hr />
               
            </div>
            
            <div className="cartBody">
                <h3 style={{marginLeft:"35%"}}>Your Cart</h3>
                <div style={{marginLeft:"5%"}}>
                {
                
                teas.map((tea, ind)=>{
                    return (
                        <div key={tea._id}> 
                            <b>{ind+1}. {tea.teaName} &nbsp;<span className="price" style={{marginLeft:"45%"}}>${tea.topping!=="None" ? (tea.price+0.75) : tea.price}</span></b> <br />
                            
                            <b style={{marginLeft:"7%"}}>- Sweetness: ({tea.sweetness})</b><br />
                            <b style={{marginLeft:"7%"}}>- Ice Level: ({tea.ice})</b><br />
                            <b style={{marginLeft:"7%"}}>-Topping: {tea.topping}</b><br />
                            <br />
                            <p style={{marginLeft:"50%"}}><Link to={"/edit/"+tea._id} className="links">Edit</Link>
                            <button style={{marginLeft:"2%"}} onClick={()=>deleteThis(tea._id)}>Remove</button></p>
                     </div>
                    )
                })
                }
                 
                </div>
                <Link to="menu" style={{marginLeft:"5%", textDecoration:"none"}}> + Add More</Link><br /><br />
                <p className="purchaseButton">
                <button onClick={()=>deleteOrder(teas)} style={{marginLeft:"25%"}}>CANCEL</button>
                {
                    teas.length>0
                    ?
                    <Link to="/purchase" className="links">PURCHASE</Link>
                    :

                    <>
                        <button onClick={()=>handleErr(teas)}>PURCHASE</button>

                        <br />
                        {click
                            ?
                             <p style={{color:"red", marginLeft:"15%"}}>Warning: {err}</p>
                             :
                             ""
    
                        }
                        
                        
                     </>

                }
                
                </p>
                
            </div>
            
        </div>
    )
}
export default Cart