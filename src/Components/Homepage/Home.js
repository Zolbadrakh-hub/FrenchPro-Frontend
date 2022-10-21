import React from 'react'
import './Home.css'
import Image1 from "./assets/img1.png"
import Image2 from "./assets/img2.png"
import Image3 from "./assets/img3.png"
import {Link} from 'react-router-dom';
import { AiFillCaretRight } from "react-icons/ai";




function Home() {
    return (
        <div className='total-cards'>
        <div className='card-container'>
        <Link to='/Recorder'>
            <div className='card-title'>
                <h3>Mongolia</h3>
            </div>
            <div className='card-body'>
                <img src={Image1} alt='Flag' width="200px" height="100px"/>
            </div>
            <div className='btn'>
                <button>
                    Check it   <AiFillCaretRight size={10}/>
                </button>
            </div>
            </Link>
        </div>
        <div className='card-container'>
        <Link to='/Recorder'>
        <div className='card-title'>
                <h3>French</h3>
                </div>
            <div className='card-body'>
                <img src={Image2} alt='Flag' width="200px" height="100px"/>
            </div>
            <div className='btn'>
                <button>
                Check it   <AiFillCaretRight size={10}/>
                </button>
            </div>

            </Link>
        </div>
        <div className='card-container'>
        <Link to='/Recorder'>    
            <div className='card-title'>
                <h3>English</h3>
            </div>
            <div className='card-body'>
                <img src={Image3} alt='Flag' width="200px" height="100px"/>
            </div>
            <div className='btn'>
                <button>
                Check it   <AiFillCaretRight size={10}/>
                </button>
            </div>
            </Link>
            </div>
    </div>
    )
}

export default Home
