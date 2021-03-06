import * as React from 'react'
import './UserDetailPage.css'
import Overlay from '../Overlay/Overlay'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthNavContext } from '../../Contexts/authNav'
import ReactPaginate from 'react-paginate'
import ApiClient from '../../Services/ApiClient'
import ProfileRecipeCard from '../ProfileRecipeCard/ProfileRecipeCard'

export default function UserDetailPage() {
  // Get the user Id from the url parameter
  const {profileId} = useParams()

   //get the user from nav context 
  const {user, showLoginForm, setError, transition, setTransition} = useAuthNavContext()

  // display type state variable  Should display either (owned recipes ) or (saved recipes)

  // should be either "owned" or "saved"
  const [displayType, setDisplayType] = React.useState("Owned")

  const handleSavedOwnedRecipes = (event) => {
    // stop default behaviour
    event.preventDefault()

    // switch displaytype
    if(displayType === "Owned"){
      setDisplayType("Saved")
    }
    else{
      setDisplayType("Owned")
    }
    setTransition(transition+1)
  }
  return (
    <div className='user-detailpage'>

      {/* profile detail main info*/}
      <ProfileMain user={user} showLoginForm={showLoginForm} setError={setError} profileId={profileId} displayType={displayType}
      handleSavedOwnedRecipes={handleSavedOwnedRecipes}/>

      {/* Reciepe Type */}
      <h1 className='profile-banner'>{displayType} Recipes</h1>

      {/* profile Recipe info */}
      <RecipeDisplay showLoginForm={showLoginForm} setError={setError} profileId={profileId} displayType={displayType}
      handleSavedOwnedRecipes={handleSavedOwnedRecipes} transition={transition} setTransition={setTransition}/>

        <Overlay />
    </div>
  )
}


function ProfileMain({user, showLoginForm, setError, profileId, displayType, handleSavedOwnedRecipes}){

   // const useableUser
   var userCheck = user.id ? user : {id : -1}

   // const navigate
   var navigate = useNavigate()

  // profile state variable
  const [profile, setProfile] = React.useState({})

  // followingorNot state variable
  const [followingOrNot, setFollowingOrNot] = React.useState(profile.is_following)

  // function to handle unfollowing
  const handleOnClickFollowingBtn = async (event) => {

    // prevent the default behaviour 
    event.preventDefault()

    // Check if the user is not logged in 
    if (userCheck.id === -1){
        //display the login form
        showLoginForm()
        setError((e) => ({ ...e, form: "You need to be logged In!" }))
        return
    }

    // call the appropriate api
    const {data, error} = await ApiClient.handleFollow(userCheck.id, profileId)

    if(data){
        setFollowingOrNot(data.follow.followed_id)
    }
    if(error){
        setError((e) => ({ ...e, form: error }))
    }
}

  // function to the following/follower page
  const toFollowOrFollowing = (size, followingType) => {
    // if size is less than 1, do nothing
    if(size < 1){
      return
    }
    // navigate to the correct page
    else{
      navigate(`/profile/${profileId}/${followingType}`)
    }
  }

    // React useEffect to get the profile's details
    React.useEffect(() => {
      async function run(){
        //check if user is logged in
        userCheck = user.id ? user : {id : -1}

        // Check if the user is not logged in 
        if (userCheck.id === -1){
          setFollowingOrNot(null)
        }

        // Call the appropriate API 
        const {data,error} = await ApiClient.getProfileDetails(profileId, userCheck.id)

        if(data){
          setProfile(data.result)
          setFollowingOrNot(data.result.is_following)
          
        }
        if(error){
          setError(error)
        }
      }
  
      run()
    }, [profileId,followingOrNot])

  return(
      <div className="profile-detail-main">

        {/* profile image */}
        <div className="profile-detail-image">
          <img src={profile.image_url ? profile.image_url : "https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png"} alt="profile " className={profile.image_url ? "" : "default"}/>
        </div>

        {/* profile text info */}
        <div className="profile-detail-text">
          
          {/* the profile owners name */}
          <div className="profile-detail-name">
            <h1>{profile.username}</h1>
          </div>

          {/* the total number of recipes */}
          <div className="profile-total-recipes">
            <p>{profile.total_recipes} recipes created</p>
          </div>

          {/* the profile description */}
          <div className="profile-detail-biography">
            <p>{profile.description ? profile.description : <em>No bio</em>}</p>
          </div>

          {/*  the following and follow total */}
          <div className="follow-to-following">
            <div className="num-following">
            <button onClick={ () => {toFollowOrFollowing(profile.num_following, "following")}
              } ><img src="https://img.icons8.com/external-simple-line-edt.graphics/344/external-Arrow-arrows-simple-line-edt.graphics.png" alt="following" /> {profile.num_following} following</button>
            </div>

            <div className="num-followers">
              <button onClick={ () => {toFollowOrFollowing(profile.num_followers, "followers")}}> <img src="https://img.icons8.com/external-simple-line-edt.graphics/344/external-Arrow-arrows-simple-line-edt.graphics.png" alt="followers " /> {profile.num_followers} followers </button>
            </div>
          </div>

          {/*  the saved recipes, owned recipes, follow  & following buttonw */}

          <div className="profile-detail-page-interaction">
            {displayType === "Owned" 
            ? 
            <button className='detail-saved-recipes' onClick={handleSavedOwnedRecipes}> <img src="https://cdn.iconscout.com/icon/free/png-256/save-3244517-2701888.png" alt="" /> saved recipes </button>
            :
            <button className="detail-owned-recipes" onClick={handleSavedOwnedRecipes}>  <img src="https://www.iconpacks.net/icons/1/free-wrench-icon-951-thumb.png" alt="" /> owned recipes </button>
            }
            {profile.profile_id === userCheck.id 
            ?
            <></>
            :
            followingOrNot
            ? 
            <button className="detail-following-button" onClick={handleOnClickFollowingBtn}> <img src="https://cdn.icon-icons.com/icons2/2367/PNG/512/user_unfollow_icon_143481.png" alt="unfollow button" /> unfollow </button>
            :
            <button className="detail-follow-button" onClick={handleOnClickFollowingBtn}> <img src="https://cdn.icon-icons.com/icons2/2367/PNG/512/user_follow_icon_143485.png" alt="follow button" /> follow </button>
            }
          </div>

        </div>
      </div>
  )
}

function RecipeDisplay({showLoginForm, setError, profileId, displayType, transition, setTransition}){

  const [profileRecipeList, setProfileRecipeList] = React.useState([])

  // React useeffect that gets all the profile owned or saved recipes 
  React.useEffect(() => {
    async function run(){

      // check the display type and call the appropriage backend 
      if(displayType === "Owned"){
        //get the owned recipes 
        const {data, error} = await ApiClient.getProfileOwned(profileId)

        // if there is no error
        if(data){
          setProfileRecipeList(data.result)
        }
        // if there is an error set error

        if(error){
          setError(error)
        }
      }
      if(displayType === "Saved"){
        const {data, error} = await ApiClient.getProfileSaved(profileId)

        // if there is no error
        if(data){
          setProfileRecipeList(data.result)
        }
        // if there is an error set error
        if(error){
          setError(error)
        }
      }
    }

    run()
  }, [displayType, profileId])

  //Number of items per page
  const itemsPerPage = 3;

  const [currentItems, setCurrentItems] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);


    // useEffect for the pagination feature
  React.useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(profileRecipeList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(profileRecipeList.length / itemsPerPage));
    // window.scrollTo({top: 0});
  }, [itemOffset, itemsPerPage,profileRecipeList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % profileRecipeList.length;
    setItemOffset(newOffset);
  };


  return(
    <div className="profile-detail-recipe">
      {
        profileRecipeList.length == 0 
        ?
        <div className='no-result'>
          <h1> No {displayType} Recipes </h1> 
        </div>
        :
        <div className='results-grid'>
          {
            currentItems.map((recipe, idx) => {
              return (
                <ProfileRecipeCard recipe={recipe} 
                key={idx} 
                displayType={displayType} 
                profileId={profileId} 
                even={(idx+1+transition)  % 2 === 0}/>
              )
            })
          }

          {/* pagination component in react */}
          <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName='page-number'
                previousLinkClassName='page-next'
                nextLinkClassName='page-next'
                activeLinkClassName='page-current'
                activeClassName='page-current-border'
              />
        </div>
      }
    </div>
  )
}