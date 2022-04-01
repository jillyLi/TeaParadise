import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../App.css';
import '../Main.css';


const Main =(props) => {
    const [teas, setTeas] = useState([]);
    const [length, setLength]=useState(0);
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

    // const changePic=(e)=>{
    //     e.preventDefault();


    // }
    return (
        
        <div className="Main">
            <div className="bar">
                <span className="barSpan"> <Link to="/menu" className="links">Menu</Link></span>
                <span className="barSpan"><Link to="/cart" className="links">Cart({length})</Link></span>
                <span className="barSpan"><Link to="/signUp" className="links">Login</Link></span>
                <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
            </div>
            <div className="header">
                <h1 className="Title">TEA PARADISE </h1>
                <p className="slogan" style={{marginLeft:"50%"}}>-Just need a bit of sweetness to sweeten up your day- </p>
                <hr />
            </div>
            <div className="picBody">
            
                
                 {
                teas.map((tea, ind)=>{
                    return (
                        <div className="col" key={tea._id}> 
                            <img className="mainPic" src={tea.picture} alt="teaPic"/>
                               
                            
                         </div>
                    )
                })
                } 
                 
            </div>
        </div>
    )
}

export default Main