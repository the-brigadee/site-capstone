import * as React from 'react'
import './UserSearchPage.css'
import UserSearchGrid from '../UserSearchGrid/UserSearchGrid'
import ApiClient from '../../Services/ApiClient'
import { useAuthNavContext } from '../../Contexts/authNav'


export default function UserSearchPage() {

  // User array state variable
  const [usersList, setUsersList] = React.useState([])

  //get searchWord from the authNavContext
  const {searchWord} = useAuthNavContext()

  React.useEffect(() => {
    async function run(){

      //Call the corresponding api request
      const {data, error} = await ApiClient.userSearch(searchWord.replace(/ /g, '%20'))

      // If there is an error send it to the console
      if(error) console.error(error)

      //If there is data, set recipe list to it
      if(data) setUsersList(data.result)
    }

    // run the above function
    run()
    
}, [searchWord])


  return (
    <div className='usersearchpage-page'>
      
      {/* the div containing the result display*/}
        <UserSearchGrid usersList={usersList}/>
    </div>
  )
}

