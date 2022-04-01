import React, {useState, useEffect} from 'react'
import { useParams ,Link, useHistory} from 'react-router-dom'
import axios from 'axios';
import '../App.css';
import '../Main.css';
const Customize=(props)=>{
    const history= useHistory();
    const {id}=useParams();
    const levelChoice = [
        "100%",
        "75%",
        "50%",
        "25%",
        "0%"
    ];
    const toppings = [
        "None",
        "Boba ($0.75)",
        "Crystal Boba ($0.75)",
        "Pearl (small version boba) ($0.75)",
        "Egg Pudding (contains egg) ($0.75)",
        "Green Tea Jelly ($0.75)"
    ];

    const [teaName, setTeaName]=useState("");
    const [sweetness, setSweetness] =useState(levelChoice[0]);
    const [ice, setIce]=useState(levelChoice[0]);
    const [topping, setTopping]=useState(toppings[0]);
    const [picture, setPic]=useState("");
    const [description, setDes]=useState("");
    const [price,setPrice]=useState(0);
// updating error
    // const [nameErr, setNErr]=useState("");
    // const [sweetnessErr, setSweetnessErr]=useState("");
    // const [iceErr, setIceErr]=useState("");
    
// backend error
    const [errors, setErrors]=useState([]);
    const [length, setLength]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:8000/api/teas/"+id)
            .then(res=>{
                console.log(res.data);
                setTeaName(res.data.teaName);
                setDes(res.data.description);
                setPic(res.data.picture);
                setPrice(res.data.price);
            })
            .catch(err =>console.log(err))

        axios.get("http://localhost:8000/api/teasInCart")
            .then(res=>{
                // console.log("here length:" +res.data.length);
                setLength(res.data.length);
            })
            .catch(err=> console.log(err));
    },[id])

    // const handleErrorName=(e)=>{
    //     setName(e.target.value);
    //     if(e.target.value.length<3){
    //         setNErr("must be at least 3 characters")
    //     }else{
    //         setNErr("");
    //     }
    // }
    
    
    const customize =(e) =>{
        e.preventDefault();
        //send to db
        const newOrder={
            sweetness,
            ice,
            topping,
            teaName,
            picture,
            description,
            price
        }
        // first part link, second part pass an obj
        axios.post(`http://localhost:8000/api/teasInCart`,newOrder)
            .then((res) => {
                console.log(res.data);
                history.push("/menu");
            })
            .catch((err) => {
                console.log("ERROR INPUT");

                // const errorResponse=err.response.data.errors;
                // const errorArr=[];
                // for(const key of Object.keys(errorResponse)){
                //     errorArr.push(errorResponse[key].message)
                // }
                // setErrors(errorArr);
            });
    }
    
    return (
        <div className="Main">
            <div className="bar">
                <span className="barSpan"> <Link to="/menu" className="links">Menu</Link></span>
                <span className="barSpan"><Link to="/cart" className="links">Cart({length})</Link></span>
                <span className="barSpan">Login</span>
            </div>
            
            <div className="header">
                <h1 className="Title">TEA PARADISE CUSTOMIZE</h1>
                <hr />
            </div>
            
            <div className="editBody">
            <p style={{color:"red"}}>
                {errors.map((err,index)=> <p key={index}>{err}</p>)}
            </p>

            <form className="editPage" onSubmit={customize}>
                
                <div className="left">
                    <img className="teaPic" src={picture} alt="milktea Pic "/><br />
                    <p style={{marginLeft:"5%"}}>{description}</p>
                </div>
                
                <div className="right">
                    Sweetness: 
                    <select value={sweetness} onChange={e => setSweetness(e.target.value)}>
                        {levelChoice.map( (item, i) => 
                            <option key={i} value={item}>{item}</option>
                        )}
                    </select><br /><br />

                    Ice Level:  
                    <select value={ice} onChange={e => setIce(e.target.value)}>
                        {levelChoice.map( (item, i) => 
                            <option key={i} value={item}>{item}</option>
                        )}
                    </select><br /><br />

                    Topping: 
                    <select value={topping} onChange={e => setTopping(e.target.value)}>
                        {toppings.map( (item, i) => 
                            <option key={i} value={item}>{item}</option>
                        )}
                    </select><br /><br /><br /><br />
                
                    <button>Add to the Cart</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Customize