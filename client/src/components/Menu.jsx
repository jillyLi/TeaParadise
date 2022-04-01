import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import '../App.css';
import '../Main.css';

const Menu =(props) => {
    const [teas, setTeas] = useState([]);
    const [length, setLength]=useState(0);
    const [fresh, setFresh]=useState(false);
    const history=useHistory();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/teas")
            .then(res => {
                console.log(res.data);
                setTeas(res.data);
            })
            .catch(err => console.log(err))
        axios.get("http://localhost:8000/api/teasInCart")
            .then(res=>{
                // console.log("here length:" +res.data.length);
                setLength(res.data.length);
            })
            .catch(err=> console.log(err));
    },[])
    const updateCart=(tea)=>{
        
        const newTea={
            teaName:tea.teaName,
            price:tea.price,
            description:tea.description,
            picture:tea.picture
        }
        // first part link, second part pass an obj
        axios.post("http://localhost:8000/api/teasInCart",newTea)
            .then((res) => {
                console.log(res.data);
                setLength(length+1);
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
                <span className="barSpan"> <Link to="/" className="links">Home</Link></span>
                <span className="barSpan"><Link to="/cart" className="links">Cart({length})</Link></span>
                <span className="barSpan"><Link to="/signUp" className="links">Login</Link></span>
            </div>
            <div className="header">
                <h1 className="Title">TEA PARADISE MENU</h1>
               
                <hr />
            </div>
            <div className="menuBody">
                {
                teas.map((tea, ind)=>{
                    return (
                        <div className="menuChild" key={tea._id}> 
                            <div className="picLeft">
                                <img className="teaPic" src={tea.picture} alt="teaPic" />
                            </div>
                            <div className="desRight">
                                <b>{tea.teaName}</b><br /><br />

                                {tea.description} <br /><br />
                                <p >${tea.price}</p> 
                                <button onClick={()=>updateCart(tea)} >Add to the Cart</button>  
                                <Link to={"/customize/"+tea._id} className="links" >Customize</Link>
                            </div>
                     </div>
                    )
                })
                }
                 
            </div>
        </div>
    )
}

export default Menu