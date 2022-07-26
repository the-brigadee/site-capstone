import * as React from 'react'
import './ProfileRecipeCard.css'
import { stripHtml } from "string-strip-html"
import {Link} from 'react-router-dom'
import moment from 'moment'

export default function ProfileRecipeCard({recipe, displayType, profileId, even}) {

        // Displayed recipe description state variable
        const [description, setDescription] = React.useState(null)
        //run everytime the component is mounted
    
        const presentableDescription = () => {
            // function to cut description string
            if(recipe.description.length > 417){
                return stripHtml(recipe.description).result.substring(0,417) + "..."
            }
            else{
                return stripHtml(recipe.description).result
            }
    
        }
        React.useEffect(() => {
            
            
        }, [])

  return (
    <div className={`profile-recipe-card ${even ? "even" : ""}`}>

         {/* displays the result card */}
         <div className="result-image">
                {/* Load the main image here */}
            <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.recipe_url ? recipe.recipe_url : "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Chocolate-Lover-s-Pancakes_EXPS_TOHCA19_133776_B03_15_3b_rms.jpg"} alt=""/>
            </Link>
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
            <div className={`result-detail ${displayType==="Owned" || profileId == recipe.user_id? "remove" : ""}`}>

                {/* displays user's profile image */}
                <div className="result-profile-img">
                    <Link to={`/profile/${recipe.user_id}`}>
                    {recipe.user_url 
                    ? 
                    <img src={recipe.user_url} /> 
                    : 
                    <img src="https://cdn.icon-icons.com/icons2/933/PNG/512/round-account-button-with-user-inside_icon-icons.com_72596.png" alt="" className='default'/>
                    }
                    </Link>
                </div>

                {/* displays the user's handle */}
                <div className="result-profile-name">
                    <Link to={`/profile/${recipe.user_id}`}>
                        <p>By {recipe.owner}</p>
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
                <p> <b> {presentableDescription()} </b> </p>
            </div>

            {/* displays the result creation date in moment form */}
            <div className="result-creation-date">
                <p> Last updated: {recipe.updated_at ? moment(recipe.updated_at).fromNow() : moment(recipe.created_at).fromNow()} </p>
            </div>
        </div>
    </div>
  )
}
