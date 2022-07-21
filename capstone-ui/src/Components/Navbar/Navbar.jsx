import * as React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"
import {useAuthNavContext} from "../../Contexts/authNav"
import { useNavigate } from 'react-router-dom'
import apiClient from "../../Services/ApiClient"
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function Navbar(){
    //using tippy.js for tooltip hover message
    tippy('#login', {
        content: "Login",
        offset: [0, 20],
    
    });
    tippy('#register', {
        content: "Register",
        offset: [0, 20],
    });
    tippy('#logout', {
        content: "Logout",
        offset: [0, 20],
    });
    tippy('#search-icon', {
        content: "Search",
        offset: [0, 20],
    });

    // extract the navigate function
    const navigate = useNavigate()

    //useState variable for tracking User search text.
    const [searchField, setSearchField] = React.useState('')
    const {showLoginForm, showRegisterForm, setSearchWord, setResultsType, user, setUser, setError} = useAuthNavContext()

    //Function that handles the value of searchField depending on the value of User's input text
    const handleSearchOnChange = (event) => {
        
        //prevent the events default behaviour
        event.preventDefault()

        //get the value of the User's search input
        const searchWord = event.target.value

        //set the value of the search input tag
        setSearchField(searchWord)
    }

    //Function that runs when the search field is submitted.
    const handleSearchOnSubmit = (event) => {
        /**
         * This codes stores the search word in a state variable called (searchWord) then navigates to the results page.
         * 
         * i.e The results page calls the api with the searchword value
         */

        event.preventDefault()

        // If the search Field is not an empty string then navigate OTHERWISE do nothing
        if (searchField !== '' && searchField !== ""){
            setResultsType("searchbar")
            setSearchWord(searchField)
            navigate('/search')
        }
    }

    // function for pressing enter while searching
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchOnSubmit(event)
        }
    }

    const handleLogout = async () => {
        await apiClient.logoutUser()
        setUser({})
        setError(null)
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
                <input type="text" name="search" placeholder="Search for recipe" value={searchField} onChange={handleSearchOnChange} onSubmit={handleSearchOnSubmit} onKeyDown={handleKeyDown}/>
                        <i id="search-icon" className="fa-solid fa-magnifying-glass" onClick={handleSearchOnSubmit}></i>
                </div>
            
            {/* Buttons sections, temporary icon for login and register for now */}
            <div className="nav-btns">
                    {user?.email ? null : <img id="login" src="https://img.icons8.com/ios-glyphs/344/login-rounded-right--v1.png" alt="temp icon" className='nav-btn' onClick={showLoginForm}/>}
                    {user?.email ? null : <img id="register" src="https://static.thenounproject.com/png/6478-200.png" alt="temp icon" className='nav-btn' onClick={showRegisterForm}/>}
                    <Link to="/recipe/create">
                    {user?.email ?<img id="add_recipe" src="https://static.thenounproject.com/png/1001670-200.png" alt="temp icon" className='nav-btn'/> : null}
                    </Link>
                    {user?.email ?<img id="logout" src="https://www.iconpacks.net/icons/2/free-exit-logout-icon-2857-thumb.png" alt="temp icon" className='nav-btn' onClick={handleLogout}/> : null}
                    
            </div>
        </nav>
    )
}