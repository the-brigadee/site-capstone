import * as React from 'react'
import './UserSearchGrid.css'
import {useAuthNavContext} from '../../Contexts/authNav'

export default function UserSearchGrid({usersList}) {

    //get searchWord from the authNavContext
    const {searchWord} = useAuthNavContext()

   
  return (
    <div className='usersearch-grid'>
        UserSearchGrid
    </div>
  )
}

