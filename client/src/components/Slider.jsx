import React,{useState} from 'react'
import { SliderData } from './SliderData'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa';
import "../Slider.css"
const Slider = ({slides}) => {
    const[curr, setCurr]=useState(0);
    const length=slides.length;
    console.log("len:" +length);

    const nextSlide=()=>{
        setCurr(curr===length-1 ? 0 : curr+1);
    };
    const prevSlide=()=>{
        setCurr(curr===0 ? length-1 : curr-1);
    };
    
    if(!Array.isArray(slides)|| slides.length<=0){
        return null;
    }
    
  return (
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
  )
}

export default Slider