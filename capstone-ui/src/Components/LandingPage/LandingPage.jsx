import * as React from 'react'
import './LandingPage.css'
import RecipeGrid from '../RecipeGrid/RecipeGrid'
import Overlay from '../Overlay/Overlay'

export default function LandingPage(){
    return(
        <div className="landing-page"> 
            <Hero/>        
            <RecipeGrid />
            <Overlay />
        </div>
        
    )
}

export function Hero() {
    return (
        <div className="hero">
            <div className="hero-img-wrapper">
                <img src="https://t3.ftcdn.net/jpg/01/98/01/44/360_F_198014486_5hxZ4kbDGem8dDSlD0Kyb7RLm4TsYmHT.jpg" alt="hero img" />
            </div>
            <div className="hero-text">
                Welcome to Reciholic!
                <h3>Some other text here :D</h3>
            </div>
        </div>
    )
}