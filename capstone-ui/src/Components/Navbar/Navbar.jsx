import * as React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"


export default function Navbar(){

    //useState variable for tracking User search text.
    const [searchField, setSearchField] = React.useState('')

    //Function that handles the value of searchField depending on the value of User's input text
    const handleSearchOnChange = (event) => {
        
        //prevent the events default behaviour
        event.preventDefault()

        //get the value of the User's search input
        const searchWord = event.target.value

        //set the value of the search input tag
        setSearchField(searchWord)
    }


    return(
        <nav className='navbar'>
            <div className="logo-container">
                <Link className="nav-link" to="/">
                     <img src="https://cdn.iconscout.com/icon/free/png-256/chef-1828025-1551570.png" alt="Logo img" className='logo' />
                </Link>
            </div>
            {/* Search bar */}
            <div className="search-container">
                <input type="text" name="search" placeholder="Search for recipe" value={searchField} onChange={handleSearchOnChange}/>
                        <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            
            {/* Buttons sections, temporary icon for login and register for now */}
            <div className="nav-btns">
                    <img src="https://cdn-icons-png.flaticon.com/512/4743/4743041.png" alt="temp icon" className='nav-btn'/>   
                    <img src="https://cdn-icons-png.flaticon.com/512/4743/4743041.png" alt="temp icon" className='nav-btn'/>   
            </div>
        </nav>
    )
}