import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../App.css';
import '../Main.css';
import "../Slider.css";
import { SliderData } from './SliderData'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa';
import "../Slider.css"

const Main =({slides}) => {
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
                // const [length, setLength]=useState(0);
                setLength(res.data.length);
            })
            .catch(err=> console.log(err));
    },[])

    
    const[curr, setCurr]=useState(0);
    const len=slides.length;
    // console.log("len:" +length);

    const nextSlide=()=>{
        setCurr(curr===len-1 ? 0 : curr+1);
    };
    const prevSlide=()=>{
        setCurr(curr===0 ? len-1 : curr-1);
    };
    
    if(!Array.isArray(slides)|| slides.length<=0){
        return null;
    }
    

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
                {/* a little bit of code /cold and taste */}
                <p className="slogan" style={{marginLeft:"50%"}}>" a LITTLE bit of SWEET, a LITTLE bit of TASTE " -- <img src={require('./papaJ.png')} style={{width:"30px",height:"30px", borderRadius:"60%",objectFit:"cover", paddingTop:"5px"}}/></p>
                <hr />
            </div>
           {/* ===========slider==== */}
           <section className="slider">
                <FaArrowAltCircleLeft className="left-arrow" onClick={()=>prevSlide()}/>
                <FaArrowAltCircleRight className="right-arrow" onClick={()=>nextSlide()}/>
                {
                SliderData.map((slide,ind)=>{
                    return (
                        <div className={ind === curr ? 'slide active' : 'slide'} key={ind}>
                        
                        {ind ===curr && (
                            <img src={slide.image} alt="sliderImg" className="image"/>


                        )}
                        </div>
                    
                    );
                
                })}


            </section>



            {/* ===============================  working part  */}
            {/* <div className="picBody">
            
                
                 {
                teas.map((tea, ind)=>{
                    return (
                        <div className="col" key={tea._id}> 
                            <img className="mainPic" src={tea.picture} alt="teaPic"/>
                               
                            
                         </div>
                    )
                })
                } 
                 
            </div> */}
        </div>
    )
}

export default Main