import * as React from 'react'
import './SearchResultCard.css'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { stripHtml } from "string-strip-html"

export default function SearchResultCard({even, recipe}) {
    
    // Displayed recipe description state variable
    const [description, setDescription] = React.useState(null)
    //run everytime the component is mounted
    React.useEffect(() => {
        
        // function to cut description string
        if(recipe.description.length > 417){
            setDescription(stripHtml(recipe.description).result.substring(0,417) + "...")
        }
        else{
            setDescription(stripHtml(recipe.description).result)
        }

    }, [])

  return (
    <div className={`search-result-card ${even ? "even" : ""}`}>

         {/* displays the result card */}
        <div className="result-image">
                {/* Load the main image here */}
            <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.recipe_url ? recipe.recipe_url : "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Chocolate-Lover-s-Pancakes_EXPS_TOHCA19_133776_B03_15_3b_rms.jpg"} alt=""/>
            </Link>
            {/* Background div. Do not delete */}
            <div className='recipe-border-top'>

            </div>

            {/* Background div do not delete */}
            <div className='recipe-border-left'>

            </div>

            {/* Border div do not delete */}
            <div className="recipe-border-container">

            </div>
        </div>

        {/* displays the result information */}
        <div className="result-information">
            
            {/* displays result name */}
            <div className="result-name">
                <Link to={`/recipe/${recipe.id}`}>
                    <h1> {recipe.name} </h1>
                </Link>
            </div>

            {/* displays result details */}
            <div className="result-detail">

                {/* displays user's profile image */}
                <div className="result-profile-img">
                    <Link to={`/user/${recipe.user_id}`}>
                        <img src={recipe.user_url ? recipe.user_url : "https://icons-for-free.com/iconfiles/png/512/person+user+icon-1320166085409390336.png"} alt="" />
                    </Link>
                </div>

                {/* displays the user's handle */}
                <div className="result-profile-name">
                    <Link to={`/user/${recipe.user_id}`}>
                        <p>{recipe.owner}</p>
                    </Link>
                </div>

                {/* displays the result stars */}
                <div className="result-stars">
                    {/* <p><b>PlaceHolder Stars</b></p> */}
                    {/* <p> 3 stars </p> */}
                </div>
            </div>

            {/* displays the contents of the result */}
            <div className="result-contains">
                <p> <b> {description} </b> </p>
            </div>

            {/* displays the result creation date in moment form */}
            <div className="result-creation-date">
                <p> Last updated: {recipe.updated_at ? moment(recipe.updated_at).fromNow() : moment(recipe.created_at).fromNow()} </p>
            </div>
        </div>
    </div>
  )
}
