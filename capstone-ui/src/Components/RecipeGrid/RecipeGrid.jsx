import * as React from 'react'
import './RecipeGrid.css'
import RecipeCard from '../RecipeCard/RecipeCard'

export default function RecipeGrid(){
    return(
        <div className="recipe-container"> 
            <h1 className="grid-title">Recommended</h1>
            <div className="recipe-grid">
                <RecipeCard imageUrl={"https://t4.ftcdn.net/jpg/01/15/52/31/360_F_115523122_e4ry4EKsouP9kl2auNN1wSREoJq3kdcE.jpg"}/>
                <RecipeCard imageUrl={"https://merryboosters.com/wp-content/uploads/2020/05/blog-featured-image.png"}/>
                <RecipeCard imageUrl={"https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Chocolate-Lover-s-Pancakes_EXPS_TOHCA19_133776_B03_15_3b_rms.jpg"}/>
                <RecipeCard imageUrl={"https://hips.hearstapps.com/hmg-prod/images/190403-pancakes-066-copy-1554497284.jpeg"}/>
                <RecipeCard imageUrl={"https://media.wired.com/photos/60b03c5cc4c56a005b69686a/master/pass/Gear-Gas-Grilling-is-Better-910142256.jpg"}/>
                <RecipeCard imageUrl={"https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1658167502~hmac=4de2ea76b4175bdc8780c1c48d4c6a78"}/>
            </div>
        </div>
        
    )
}