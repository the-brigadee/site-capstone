import * as React from 'react'
import {Link} from 'react-router-dom'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown'
import './Sidebar.css'

export default function Sidebar(){
    
    // Variable to control the expanding and collapsing of the sidebar
    const [isExpand, setIsExpanded] = React.useState(false) 

    // Variable to control the dropdown of the category button on the sidebar
    const [isDropped, setIsDropped] = React.useState(false) 


    // Function that handles sidebar expansion and collapse
    const handleSidebarExpansion = (event) => {
        
        // stop the default propagation
        event.preventDefault()

        //  If categories is already dropped and the sidebar is going to be closed. collapse the dropdown 
        if(isExpand) closeDropdown()


        /** Reverse the state of expanded when the button is clicked.
         * 
         * True => False  and False => True
        **/
        if(isExpand) setIsExpanded(false)
        else setIsExpanded(true)
        
        
    }

    // Function that handles category dropdown
    const handleCategoryDropdown = (event) =>{
        //prevent the default behviour
        event.preventDefault()

        /** Reverse the state of dropdown when the button is clicked.
         * 
         * True => False  and False => True
        **/
         if(isDropped) closeDropdown()
         else setIsDropped(true)
        
    }

    /*Function to close the categories dropdown
            This function should be called when any link is clicked
    */ 
    const closeDropdown = () => {
        setIsDropped(false)
    }

    return(

        // The container for all the sidebar components
        <aside className={isExpand ? "sidebar-open" : "sidebar-closed"} >
            
            {/* The div containing the various buttons to the various pages as a flex box */}
            <div className={isExpand ? "sidebar-open-contents" : "sidebar-closed-contents"}>

                {/* Collapse & expand button */}
                <button onClick={handleSidebarExpansion}>
                    <img src="https://cdn-icons-png.flaticon.com/512/7124/7124424.png" alt="collapse/expand" className='sidebar-collapse'/>   
                </button>

                {/* The Categories button  To be changed to a drop down*/}
                <button>
                    <img src="https://cdn-icons-png.flaticon.com/512/4743/4743041.png" alt="categories" />  
                    {isExpand ? <p> Categories </p> : <></>}
                    {isExpand ? <img src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="dropdown" id="category-dropdown" className={isDropped ? 'drop' : ''} onClick={handleCategoryDropdown}/> : <></>}
                </button>


                {/* Conditional rendering for the Category dropdown based on the {isDropped} state*/}

                {isDropped ? <CategoryDropdown /> : <></>}


                {/* Recent button */}
                <Link to='/'>
                    <img src="https://cdn-icons.flaticon.com/png/512/2961/premium/2961948.png?token=exp=1658167259~hmac=bc3307a173b67dca683b25868ae2734d" alt="recent" />
                    {isExpand ? <p> Recents </p> : <></>}   
                </Link>

                {/* Top Rated button */}
                <Link to='/'>
                    <img src="https://cdn-icons-png.flaticon.com/512/3629/3629632.png" alt="top rated" />  
                    {isExpand ? <p> Top Rated </p> : <></>} 
                </Link>
                
                {/* Search Users button */}
                
                <Link to='/'>
                    <img src="https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1658167502~hmac=4de2ea76b4175bdc8780c1c48d4c6a78" alt="search users" />
                    {isExpand ? <p> Users </p> : <></>}    
                </Link>
                
                {/* Liked Recipe button */}
                <Link to='/'>
                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="liked recipes" /> 
                    {isExpand ? <p> Like </p> : <></>} 
                </Link>
                
            </div>
        </aside>
    )
}