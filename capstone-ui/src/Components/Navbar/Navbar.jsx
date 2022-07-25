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
    tippy('#profile', {
        content: "Profile",
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

        // If the search Field is not an empty string And the search field is nothing blank space then navigate OTHERWISE do nothing
        if (searchField !== '' && searchField !== "" && searchField.trim() !== ""){
            setResultsType("searchbar")
            setSearchWord(searchField)


            /** redirect based on the searchType
             * 
             * 1) if searchType is ("") then go to recipe search page
             * 
             * 2) if searchType is ("users") then go to the user search page
             *  */
            if(searchType === ""){
                navigate('/search')
            }
            if(searchType === "users"){
                navigate('/usersearch')
            }
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
        navigate("/")
    }

    /**  Select Searchbar state variable
     * 
     *   Can only be one of two states for now 
     * 
     *  1) ("") - default = search for recipes
     * 
     *  2) ("users") - type = search for users
    */
    const [searchType, setSearchType] = React.useState("")

    // handle the change of the select button
    const handleSearchType = (e) => {

        // prevent default behaviour
        e.preventDefault()

        //Change the search type to the option chose
        setSearchType(e.target.value)

        //set placeholder text
        if(e.target.value === "")
        setSearchPlaceholder("Search for recipe")

        if(e.target.value === "users")
        setSearchPlaceholder("Search for user")
    }

    const [searchPlaceholder, setSearchPlaceholder] = React.useState("Search for recipe")
    return(
        <nav className='navbar'>
            <div className="logo-container">
                <Link className="nav-link" to="/">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/chef-1828025-1551570.png" alt="Logo img" className='logo' />
                </Link>
            </div>
            {/* Search bar */}
            <div className="search-container">
                <select  name="searchtype" onChange={handleSearchType}>
                    <option value="">recipes</option>
                    <option value="users">users</option>
                </select>
                <input type="text" name="search" placeholder={searchPlaceholder} value={searchField} onChange={handleSearchOnChange} onSubmit={handleSearchOnSubmit} onKeyDown={handleKeyDown}/>
                        <div className="round">
                            <i id="search-icon" className="fa-solid fa-magnifying-glass" onClick={handleSearchOnSubmit}></i>
                        </div>
                </div>
            
            {/* Buttons sections, temporary icon for login and register for now */}
            <div className="nav-btns">
                    {user?.email ? null : <img id="login" src="https://img.icons8.com/ios-glyphs/344/login-rounded-right--v1.png" alt="temp icon" className='nav-btn' onClick={showLoginForm}/>}
                    {user?.email ? null : <img id="register" src="https://static.thenounproject.com/png/6478-200.png" alt="temp icon" className='nav-btn' onClick={showRegisterForm}/>}
                    <Link to="user/1"> 
                        {user?.email ?<img id="profile" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEUAAADt7e3+/v7////v7+/39/f09PT4+Pj7+/slJSXr6+soKCjo6Oi1tbXi4uK+vr7R0dHY2NjJycl+fn4wMDB3d3dRUVGtra06OjoLCwuOjo6fn59CQkJcXFxsbGwbGxuJiYlkZGSwsLCXl5d5eXkcHBw8PDxJSUmcnJylpaVubm5OTk4zMzMUFBT6sinxAAANXElEQVR4nO2diXLquBKGbauxHeMdAmExYTkJgYH3f71rGwNuYeRNS0jdv+bMVB0NRF9kS93qVksjSFCWbuA2vdxmozYTtVn3BoNqgwH6nIU+Z6I2m9FmoO8EDIHbNGKUlFKUZTDabNRmojYLfRATWqgzFvqciTqD2wC12Yw2A7cJJ8wo/CgMFqPNZHkavr0Nx6flZLVexJELtgXlbzUbU/wWwmyUBuF0vTlpVRon60Pg58/gaxKmbwvEo8mwku6qr/1q6jsF5EsRpqPnB/8+mXQ3bQ5hzsgibE4vhTDjm++b4eU6jYKU8WXGEGwINi3wLlpOo8FrEAK4Xnu+TPtDurD9fkJwg/2sE2CqD6/E+DsJAeJVV7xcSWBfeySD0G7cZhZ8/m7cCzBdPkZuMYzUXIogFI0hOMFHT75MZ8/MGbmNITZaMSFleSNCyvLOANdvHAA1bfYOjzYrtq5pQmyVI2mUN4FHDbXRo4a8ifSXESVc+DJ9eDo8PJeoN6jNYLQRretz+TCiQbXx2U2fO73F+m8w2joTGtiKsa1FQwutqUZ+87mF1cZnDNMn4x9fvlSJr3YMMaE/4g6Y2uMIUSkhRBMBgKn/GDW04UQTQtTNDK3XvoSokBA4rhK0vjPEKgtHJiH4okYw095vYqUKJQRXxCRz18YlagkB1kIBU8SLr/Fgp0kj9AQDatri4mqoIExbIeBjazM1rfU02ISoUceeBkX/0Ab+f+IBtbHf0pvAEBr6XRjIRgfKEn1os8XOMlclbrYPh/pi446yIPp4wMTrvCHTTnNHzT4NcZdyALWvGFTsCBPyLglQ05bpc6qAMJYGqGmH7v5wd0JHnDn6qFMsn9CYSgRMXX7phAB9N0ZbKpJMCPAjF1B7t8s9lUAYyVoprhqGkgl3kgHTN9EuBaaExy3AbxP+5KPP8saU8DGErXTA1HbrStgpbiFzLbzqo+RQdI5bgF0W7U3cG8IvBYSz6b0/JuqozYKg/MPnc0vprSRE/jyT6ejeN/gYz6Xe3Mc3nhEqeUhTVzh8Qsg9biHV5i7r0GgMeRCqeUhTZ18SISE8YtmddHsRBRO6qgA1TxKh+D3SZ1pLIpSzw1al5PqYCiUkpshQDFvfoRTCiGdKQjvNPCmEsaRd0iodxBMSlRNN6iTq0JoQNTLjFkUWlDFXSDhxr4TN4xbYSM+s99yCNx+MdPti2ZugbqLRtOHVqbj20az0NMw7hEl5wPiXUfXMgqvMoslk5oH9FvFSvbWPDy7n5Kd28lvnLbQn9FUCaqFwQoBIKWEgYQxVOYcXTSUQBkoJfyQQqlzwNW335wnn/yd8eUIZT+nfn2nUrhaHDoQt4xYQKiX0iNE2bmEiWdiboNus9I+jlDAoOoP6aeGOoia7TdzikgZpKiUMKzzgB/8QQbTexSADySkKWH57H7/1Po0tJjG/mc6ueEIiKSGxWksJhAY5KCRcOTIIVS75Oyn7paGEzOdn2kohdNRNNeNYCqEhL6+U1iSSQWgQ2Sltd72DHEJ1e1G3QL5gQvusijDqQogam8QtiMwEb6zvUqZC87iFhUR5E9Vtlio3f26362gudtwCWfD3X2D4rQRwdksxFRq3yL7Q5X+uuYmSu18kOvsStkrCwD/8M2ifEko7LVPWmy+PUBd+rrJKGwFZ0M8JIwUJpuVUdvGEjnw3ODFlEuoQsMuw8dfMk3waAWTbNQnIJdSlh4KzrWCphLoh902cyD9/aEQy901n2x5n11rGLa6ype65jVy6eismZMUtBsgQH5RlMdsGjjzD5tOn+oI7w2qz6LhF/ku4/qvKP8wykrJ/IF0xpHnCh4pRM+4dfYhb3BH61VRw1pIAV+lLqKQuBvhyntNhdn5UTeUPiKXkuOVLoXzCvMqeLuNsycjKuqyoeosMC3x16bGaMdQlVDcZts+35DmG2aso9rzsMC76q7ASVizSejsH1+6qrGbmCVz4D4QoH8PMGxY1iudps6rCwglBVCWeQ6mOgow6UfbTNuBSXZfW17SjN0HFLQY8ZIX8z0KdAy5dG3CqI2zFvA8/f8f0s9d0RCkIXrWgwecby9j4zOiLimrX4PI8DzVyyO+7owT4mTengNT4S6oqlkdrLoDHiG/Fcn6EqTfl9R/G09Sut7WV3RwA4M/7bffP1n4TO03h7Q+gx332+5PYbmSnqXoPL8Noxu8dNzc2QWFo1/q8qm9hMTuNY7J1yleU/E7C4n+xCHHn7Zz/7/eQfZOOrIp0xR+ouw0ps528UeOHdbOIRN6GdNvGrrRL7/vHD5n75LqxTCpuQ8qMR9c7nurc49lbsgjd641W983qKtvTKLaxq3fAr5+j4xYWMsQ7BgcGdIQj/9bs8IYbzI/Lp+7jx2oe+JZ1/fiA0ZnCiTF1y3psY32uKm7RyJtgtaG7kQDcMNitvvEjez4lo2kQOthDQd9ZFW0yvUl+4qKNf9hybiEkDLLJnHoua+advBumG8VB4E29II784laRwW32zP7LuivQzt//8FM7bx0QuIuRXUWSVzBsQlhoUPxtMU5FybEqCjahXlS4f/sxQRghsRbpjxhnleAbr446umuMDBgUNYSgF8vs3DUFERLz4gMegZ49ZRACLK5v8bsrhvBee2dtqSDc3hOxjhiDE6FRushiR9+kI54QgvJsjG+h4UIIZrmi52xrog+KJyRU2m5SvmevL2G+ANGXBPygO1KFE5KQ3pItX9HSlzD7lOnRW/fbMqJoQlIRUN/fp5v+hKBvH+zLz0UJUTAhCas8lcltFHsTpvN0VT7pQb99WCghIVF16vx/DaKndNyiMjsfoDr96fzjXBFRKequhE9ueCYkfpbzkeR3JdacA8YeQ+XBBXi61ztyb15BWbTl363t2hnbe+5nTny77vRFk7jF4ukP0EYXt63aP3z0NPIRLYse0UdvAvQDy5HO6wz2iVukvR8wd+s/ogpPA9083vmtzAnBP7J+fBbgqPE06nYxCKkJR3x42SAKIgQIa2unHXW2p1E3hlZ9TtD8wQ7nQ2jp4HgN9pfXTg/CZgX2klDMGDa9dHCndyOEjJAxyZQ03uqQ78BdvXoehMSOG25Inj20z9piDKHBI1poEuulj/IgJO666Q/XznE3wnShb55jMU797puh3pnw9vfECNqcGF+i+z2aEoLT7kTzx9QHPk9puhTWT6FY3+XJpiEhmMyVtkqbwLkw9iJMl2x/3fpY1b/SE96MsFMa0GcS57vXfQiJ7a675FjN7yZ1Q0KvW22Ileei95DQNwcPyj/uTphPxdmufjjveCzuPqEyCW8jGHcN5Z6TQ74DfiNkjCExymMIYJH4X+ccuXG+jUtoQl2zrarKUL1SKj/XIVR8Z+FNoApPZW9CD396ZcYv/cqqUdVxi76Zv1/JLtSvG9vNvAl9+69v5tiqWJPr4xbE4ZDafF7u4sjJKNlzS/ZAQ+QlPErCzJ1L1Aa9eBWEBGoclsbajxaBD9ca0vm0cyO8RC8sYkbbecIpe/PLa0RIDJ4Zam/fydrzIX39DByZcVzXj7z5cc8z/XboQ5MxbGZtt9Np8j4/bL0gledtp4fF/D0RkZO6cml/+JGwameSo2YzocUKhnEtIVFaVL6/FvWE9lp1J3spuzGphhCUllzvrbEPdWOotlx3f4W1hOrKXPHRAgDtadCEhKi5joufNg9jqGNC/bVfw7x2JB23uFwGUVxLZ8s7vSxIw5C67YKKWyi4fZOzzgE7buGoqQDFUweil3c2aR8/knHhvVitbbzpSxGqrNzJSSuTSai24DoXLV0mocoKupz05jMJX3+iuZX8riQkRGUla16KmYRKq5Fz0pRFaCm8NI6b5ixCdfdvctQ/FqHauys4acMi/APLYVYWDNulRskMN/7Acpgu+fg6ceQfvr5nkemDEbd4nsD2Sjo938UAJWVJuWvM2In6G4SnP0/48ecJl3+ecM8i/BNzacIi/BPr4RHVcqUIp6p7x0Nz1hj+Cbt0yiJ89cBTroBF6L76nn6qc0gTIr16XEajc00Ng4pbrFT3r7/ecU4SHbcQkWkiWTscmUE+PvkL2xh07OkhMqPi4gquOrlsQgV3HnDWitTkCE9ffcfUqyOMXny9eHPqCOHFH9M5fd7ykfC1Z9Ov7PQMg5CkhK8dyR8ZbMK8lnzwyoHu6CFXv4JQX6vuZneNcpoaQh38lw0i7v1aQiPzL8yXXROL64T053GL6/0WL2p/r4vTOQ3OWwx4HUeQqk3lnd3VVSOIqe662M66Ajari0H0l1sVkyd3lD6r/EHM9WtNN+83wKa1TYghrJa8AL3NS5VkmlZvISR6mflmGTjlMGjj+jSEBMkr7C7upxaq6NSmAo/pe78+sf174dP+UpsaQ6mrEc0nsq86bKzZ9zHIzm/2qqKUla6MF6O9lGuPWmmY7Dy/OHDch1DPIR0/iqfzY7L8GA8LvSENkd4Yjay2Jl86HJ+WyXEeRC4YtwPVPQn14sAnNvdwWg6uXzpAbbjikIXa8BlhG7XhikPGY9u9p2zCsugbPK5/nf2hqrciQrpCK4MQ02NCC3kFdE0l9MEyOzGetqX6HyTbItSzete+AAAAAElFTkSuQmCC" alt="temp icon" className='nav-btn' /> : null}
                    </Link>
                    <Link to="/recipe/create">
                    {user?.email ?<img id="add_recipe" src="https://static.thenounproject.com/png/1001670-200.png" alt="temp icon" className='nav-btn'/> : null}
                    </Link>
                    {user?.email ?<img id="logout" src="https://www.iconpacks.net/icons/2/free-exit-logout-icon-2857-thumb.png" alt="temp icon" className='nav-btn' onClick={handleLogout}/> : null}
                    
            </div>
        </nav>
    )
}