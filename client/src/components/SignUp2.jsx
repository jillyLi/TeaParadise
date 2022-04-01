import React, {useState}from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom'
import '../App.css';
// all works
import { useEffect } from 'react';
import "../Main.css";

const SignUp =() =>{
    const history= useHistory();
    
    
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName] =useState("");
    const [email, setEmail]=useState("");
    // const [address, setAddress] =useState("");
    const [password, setPassword] =useState("");
    const [confirm, setConfirm] =useState("");
    // const [zip, setZip] =useState();
    const [reward, setReward]=useState(false);

// updating error
    const [firstErr, setFirstErr]=useState("");
    // const [lastNErr, setLastErr]=useState("");
    const [emailErr, setEmailErr]=useState("");
    const [passwordErr, setPasswordErr]=useState("");
    // const [confirm, setConfirm]=useState("");

// backend error
    const [errors, setErrors]=useState([]);
    const [length, setLength]=useState(0);

    useEffect(()=>{

        axios.get("http://localhost:8000/api/teasInCart")
            .then(res=>{
                // console.log("here length:" +res.data.length);
                setLength(res.data.length);
            })
            .catch(err=> console.log(err));
    },[])

    const createUser =(e) =>{
        e.preventDefault();
        
        //send to db
        const newUser={
            firstName,
            lastName,
            email,
            // address,
            password,
            confirm,
            // zip,
            reward
        }
        // first part link, second part pass an obj
        axios.post("http://localhost:8000/api/user",newUser)
            .then((res) => {
                console.log(res.data);
                //redirect to the main route
                history.push("/");
            })
            .catch((err) => {
                console.log("ERROR INPUT");
                // console.log(err.response.data);
                const errorResponse=err.response.data.errors;
                const errorArr=[];
                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    }

    // const handleErrorName=(e)=>{
    //     setFirstName(e.target.value);
    //     if(e.target.value.length<3 && e.target.value.length>0){
    //         setFirstErr("must be at least 3 characters")
    //     }else{
    //         setFirstErr("");
    //     }
    // }
    // const handleEmailError=(e)=>{
    //     setEmail(e.target.value);
    //     if(e.target.value.length<3 && e.target.value.length>0){
    //         setEmailErr("must be at least 3 characters")
    //     }else{
    //         setEmailErr("");
    //     }
    // }
    // const handlePasswordError=(e)=>{
    //     setPassword(e.target.value);
    //     if(e.target.value.length<3 && e.target.value.length>0){
    //         setPasswordErr("must be at least 3 characters")
    //     }else{
    //         setPasswordErr("");
    //     }
    // }
    return (
        <div className="Main">
            <div className="bar">
                <span className="barSpan"> <Link to="/menu" className="links">Menu</Link></span>
                <span className="barSpan"><Link to="/cart" className="links">Cart({length})</Link></span>
                <span className="barSpan"><Link to="" className="links">Login</Link></span>
                <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
            </div>
            <div className="header">
                <h1>TEA PARADISE</h1>
                <hr />
            </div>
            
            
            <p style={{color:"red"}}>
                {errors.map((err,index)=> <p key={index}>{err}</p>)}
            </p>

            <form className="signForm" onSubmit={createUser}>
                <div className="leftForm">

                    First Name:
                    <input type="text" onChange={e=>setFirstName(e.target.value)} value={firstName}/> 
                    
                    <br/><br/>
                    Last Name:
                    <input type="text" onChange={e=>setLastName(e.target.value)} value={lastName}/> 
                    
                    <br/><br />

                    Email:
                    <input type="text" onChange={e=>setEmail(e.target.value)} value={email}/> 
                    
                    
                </div>
                
               
                <div className="rightForm">
                    Password:
                    <input type="text" onChange={e=>setPassword(e.target.value)} value={password}/> 
                    <br /><br />
                    Confirm:
                    <input type="text" onChange={e=>setConfirm(e.target.value)} value={confirm}/> 
                    <br /> <br />
                    <input type="checkbox" onChange={e=>setReward(e.target.checked)} checked={reward}/>Join Reward Program?<br />
                    
                    <br/><br/>
                    <button className="signUp">Sign Up</button>
                </div>
            

            </form>
        </div>
        
    )
}
export default SignUp