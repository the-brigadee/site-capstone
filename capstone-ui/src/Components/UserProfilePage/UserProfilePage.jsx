import * as React from 'react'
import Slider from "react-slick";
import './UserProfilePage.css'
import RecipeCard from '../RecipeCard/RecipeCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import Overlay from '../Overlay/Overlay'

export default function UserProfilePage() {
  // setting for npm react slick library
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1575,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const {user, setError} = useAuthNavContext()
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(()=>{
    
    const getSavedRecipes = async () => {
      const {data, error} = await apiClient.getUsersSavedRecipes()
            if (error) setError((e) => ({ ...e, savedRecipe: error }))
            if (data?.savedrecipe) {
                setRecipes(data.savedrecipe)
            }
    }
    getSavedRecipes()
  }, [setRecipes])

  
  // the editing profile form, show when user click on edit profile button
  const form = (<div className="form">
  <div className="input-field split">
      <div className="input-row">
          <label htmlFor="First Name">First Name</label>
          <input type="text" name="first_name" placeholder="first"/>
      </div>
      <div className="input-row">
          <label htmlFor="Last Name">Last Name</label>
          <input type="text" name="last_name" placeholder="last"/>
      </div>
  </div>
  <div className="input-field split">
      <div className="input-row">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="username"/>
      </div>
      <div className="input-row">
          <label htmlFor="DOB">DOB</label>
          <input type="date" name="dob" className='calendar'/>
      </div>
  </div>
  <div className="input-row">
    <label htmlFor="bio">Bio</label>
    <textarea name="message" rows="8" placeholder='ok'>
    </textarea>
  </div>
                </div>)

  // user's profile details, this is what the user see when they go to the user profile page
  const userProfile = (<div className="user-display">
                        <div className="user-facts">
                          <h1>{`${user.first_name} ${user.last_name}`}</h1>
                          <h4>Joined on {user.created_at}</h4>
                          <span>{user.bio}</span>
                          <span>Birthday: {user.dob}</span>
                        </div>
                      </div>)
  
  // change password form
  const changePassword = (<div className="change-password">
                            <div className="input-row">
                              <label htmlFor="old_password">Old Password</label>
                              <input type="password" name="old_password" placeholder="old password"/>
                            </div>
                            <div className="input-row">
                                <label htmlFor="New Password">New Password</label>
                                <input type="password" name="new_password" placeholder="new password"/>
                            </div>
                            <div className="input-row">
                                <label htmlFor="Confirm Password">Confirm Password</label>
                                <input type="password" name="confirm_password" placeholder="new password"/>
                            </div>
                          </div>)
  return (
    <div className='user-profile-container'>
        <div className="user-profile">
          <div className="left-profile">
            <div className="profile-img">
              {user.imageUrl ? <img src={user.imageUrl} alt='profile img' /> : <img src="https://i.pinimg.com/originals/18/28/f4/1828f4bb6ac67ac60e7ce82d1ed2eb72.jpg" alt='profile img' />}
            </div>
            <button className="change-img">
              Update Picture
            </button>
            <div className="user-data">
              <h3>{user.username}</h3>
              <span># recipe created</span>
              <span># following</span>
              <span># followers</span>
            </div>
          </div>
          <div className="right-profile">
              {userProfile}
            <div className="setting-btns">
                <button>Change Password</button>
                <button>Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="saved-carousel carousel">
          <h3>Saved Recipes</h3>
          <Slider {...settings}>
                {recipes?.map((recipe) => (
                    <RecipeCard recipe_url={recipe.image_url} title={recipe.name} calories={recipe.calories} category={recipe.category} recipe_id={recipe.id} key={recipe.recipe_id} ownername={recipe.ownername} owner_url={recipe.owner_url ? recipe.owner_url : "https://i.pinimg.com/originals/18/28/f4/1828f4bb6ac67ac60e7ce82d1ed2eb72.jpg"} owner_id={recipe.ownder_id}/>
                ))}
          </Slider>
        </div>
        <Overlay />
    </div>
  )
}