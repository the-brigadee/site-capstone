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
            </div>
            <div className="hero-text">
                Welcome to <br /> Reciholic!
                <h3>Hunger Leads to Anger so Eat 😁</h3>
            </div>
        </div>
    )
}