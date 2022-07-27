import * as React from 'react'
import './UserSearchCard.css'
import { Link } from 'react-router-dom'
import { useAuthNavContext } from '../../Contexts/authNav'
import ApiClient from '../../Services/ApiClient'

export default function UserSearchCard({people, even}) {

    //get the user from nav context 
    const {user, showLoginForm, setError} = useAuthNavContext()

    // followingorNot state variable
    const [followingOrNot, setFollowingOrNot] = React.useState(people.is_following)

    // const useableUser
    var userCheck = user.id ? user : {id : -1}

    const bioToScreen = () => {
        if(!people.description) return ""
        var word = ""

        if(people.description > 30){
            word = word.substring(0, 27) + "..."
            return word
        }
    }

  
    // function to handle unfollowing
    const handleOnClickFollowingBtn = async (event) => {

        // prevent the default behaviour 
        event.preventDefault()

        // Check if the user is not logged in 
        if (userCheck.id === -1){
            //display the login form
            showLoginForm()

            setError((e) => ({ ...e, form: "You need to be logged in!" }))
            return
        }

        // call the appropriate api
        const {data, error} = await ApiClient.handleFollow(userCheck.id, people.user_id)

        if(data){
            setFollowingOrNot(data.follow.followed_id)
        }
        if(error){
            setError((e) => ({ ...e, form: error }))
        }
    }

  // rerender card when follow or following button is clicked
  React.useEffect(() => {
    // useableUser
    userCheck = user.id ? user : {id : -1}

    // Check if the user is not logged in 
    if (userCheck.id === -1){
        setFollowingOrNot(null)
    }
}, [followingOrNot, user])

return (
    <div className={`search-user-card ${even ? "even" : ""}`}>
       <Link to={`/profile/${people.user_id}`}>
        {/* displays the result card */}
        <div className="result-user-image">
                    {/* Load the main image here */}
                    <img src={people.image_url ? people.image_url : "https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png"} alt="user profile" className={people.image_url ? "" : "default"}/>
                
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
                        <p>{people.num_following} following</p>
                    </div>

                    {/* users number of recipes created */}
                    <div className="result-user-count">
                        <p> {people.total_recipe} recipes </p>
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
                            {followingOrNot ? 
                            <button onClick={handleOnClickFollowingBtn}> <img src="https://cdn.icon-icons.com/icons2/2367/PNG/512/user_unfollow_icon_143481.png" alt="unfollow button" /> unfollow </button> :
                            <button onClick={handleOnClickFollowingBtn}> <img src="https://cdn.icon-icons.com/icons2/2367/PNG/512/user_follow_icon_143485.png" alt="follow button" />  follow </button>}
                        </div>
                    }
                    
                </div>

            </div>
        </Link>
    </div>
  )
}
