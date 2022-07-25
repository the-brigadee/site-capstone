import * as React from 'react'
import './LandingPage.css'
import RecipeGrid from '../RecipeGrid/RecipeGrid'
import Overlay from '../Overlay/Overlay'
import { useLocation } from 'react-router-dom'
import { useAuthNavContext } from '../../Contexts/authNav'

export default function LandingPage(){
    const {user, showLoginForm, setIsPwChanged} = useAuthNavContext()
    const location = useLocation()
    React.useEffect(()=> {
        if (!user?.email && location?.state) {
            setIsPwChanged(true)
            showLoginForm()
        }
    }, [])
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