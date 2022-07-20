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
                <img src="https://static01.nyt.com/images/2020/04/30/dining/30substitutions/30substitutions-superJumbo.jpg" alt="hero img" />
            </div>
            <div className="hero-text">
                Welcome to Reciholic!
                <h3>Hunger Leads to Anger so Eat 😁</h3>
            </div>
        </div>
    )
}