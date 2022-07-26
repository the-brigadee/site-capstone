import * as React from 'react'
import './FollowPage.css'
import UserSearchGrid from '../UserSearchGrid/UserSearchGrid'
import ApiClient from '../../Services/ApiClient'
import { useAuthNavContext } from '../../Contexts/authNav'
import Overlay from '../Overlay/Overlay'
import { useParams } from 'react-router-dom'


export default function FollowPage() {
  // User array state variable
  const [usersList, setUsersList] = React.useState([])

  //get profileId and the followType from the useparams
  const {profileId, followType} = useParams()

  React.useEffect(() => {
    async function run(){

        // check the followType
        if(followType === "following"){
            // Call the corresponding api request
            const {data, error} = await ApiClient.getProfileFollowing(profileId)

            //If there is an error send it to the console
            if(error) console.error(error)

            // If there is data, set recipe list to it
            if(data) setUsersList(data.result)
        }
        else if(followType === "followers"){
            // Call the corresponding api request
            const {data, error} = await ApiClient.getProfileFollowers(profileId)

            //If there is an error send it to the console
            if(error) console.error(error)

            // If there is data, set recipe list to it
            if(data) setUsersList(data.result)
        }
        else{
            console.error("something went wrong")
        }
    }

    // run the above function
    run()
    
 }, [])


  return (
    <div className='usersearchpage'>
      
      {/* the div containing the result display*/}
        <UserSearchGrid usersList={usersList}/>
        <Overlay />
    </div>
  )
}