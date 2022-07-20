import * as React from 'react'
import './SearchResultCard.css'
import {Link} from 'react-router-dom'

export default function SearchResultCard() {
  return (
    <div className='search-result-card'>

         {/* displays the result card */}
        <div className="result-image">
                {/* Load the main image here */}
            <Link to='/recipe/recipeDetail'>
                <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Chocolate-Lover-s-Pancakes_EXPS_TOHCA19_133776_B03_15_3b_rms.jpg" alt=""/>
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
                <Link to='/recipe/recipeDetail'>
                    <h1> Chocolate pancake </h1>
                </Link>
            </div>

            {/* displays result details */}
            <div className="result-detail">

                {/* displays user's profile image */}
                <div className="result-profile-img">
                    <Link to='/user/userId'>
                        <img src="https://icons-for-free.com/iconfiles/png/512/person+user+icon-1320166085409390336.png" alt="" />
                    </Link>
                </div>

                {/* displays the user's handle */}
                <div className="result-profile-name">
                    <Link to='/user/userId'>
                        <p>Felix Augustus</p>
                    </Link>
                </div>

                {/* displays the result stars */}
                <div className="result-stars">
                    <p><b>PlaceHolder Stars</b></p>
                    <p> 3 stars </p>
                </div>
            </div>

            {/* displays the contents of the result */}
            <div className="result-contains">
                <p> <b> recipe Description </b> </p>
            </div>

            {/* displays the result creation date in moment form */}
            <div className="result-creation-date">
                <p> 2 months ago </p>
            </div>
        </div>
    </div>
  )
}
