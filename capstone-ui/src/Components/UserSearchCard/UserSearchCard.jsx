import * as React from 'react'
import './UserSearchCard.css'
import { Link } from 'react-router-dom'
import { useAuthNavContext } from '../../Contexts/authNav'

export default function UserSearchCard({people, even}) {

    //get the user from nav context 
    const {user} = useAuthNavContext()
    console.log(people)

    // const useableUser
    const userCheck = user ? user : {id : -1}

    const bioToScreen = () => {
        if(!people.description) return ""
        var word = ""

        if(people.description > 30){
            word = word.substring(0, 27) + "..."
        }
    }
  return (
    <div className={`search-user-card ${even ? "even" : ""}`}>
       <Link to={`/user/5`}>
        {/* displays the result card */}
        <div className="result-user-image">
                    {/* Load the main image here */}
                    <img src={people.image_url ? people.image_url : "https://cdn.icon-icons.com/icons2/933/PNG/512/round-account-button-with-user-inside_icon-icons.com_72596.png"} alt="user profile picture"/>
                
            </div>

            {/* displays the people information */}
            <div className="result-user-information">
                
                {/* displays people name */}
                <div className="result-user-name">
                        <h1> {people.username } </h1>
                </div>

                {/* display people and number of recipes created */}
                <div className="result-user-numbers">

                    {/* users following */}
                    <div className="result-user-following">
                        {people.num_following} following
                    </div>

                    {/* users number of recipes created */}
                    <div className="result-user-count">
                        {people.total_recipe} recipes 
                    </div>
                </div>

                {/* display follow button and description */}
                <div className="result-user-metrics">

                    {/* display user bio */}
                    <div className="result-user-bio">
                        <p> {bioToScreen()} </p>
                    </div>

                    {/* Conditionally render this div based on user id */}

                    {
                        userCheck.id === people.user_id 
                        ? 
                        <></>
                        :
                        // {/* conditionally render the following or followers button */}
                        <div className="result-followbtn">
                            {people.is_following ? 
                            <button> Following </button> :
                            <button> Follow </button>}
                        </div>
                    }
                    
                </div>

            </div>
        </Link>
    </div>
  )
}
