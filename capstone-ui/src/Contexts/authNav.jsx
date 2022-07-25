/**
 * This context handles two main Operations. 
 * 
 * 1.) Changes the state depending on if the user is logged In (handles login props passing around )
 * 
 * 2.) Used to handle navigation issues like isLoading and "Access Denied please login" (handles navigation props passing around)
 */

//handle all imports here
import * as React from 'react'


//create the context using createcontext
const AuthNavContext = React.createContext(null)

//Create the custom provider we want to use for our context
export const AuthNavContextProvider = ({children}) =>{

    //create our state variables here

    // user state variable
    const [user, setUser] = React.useState({})

    // error state variable
    const [error, setError] = React.useState({})

    // loading state variable
    const [isLoading, setIsLoading] = React.useState(false)

    // current selected Category state variable
    const [currCategory, setCurrentCategory] = React.useState("")

    // Pop up type state variable
    const [popupType, setPopupType] = React.useState("Login")

    //state variable for when user is logged out from changing password
    const [isPwChanged, setIsPwChanged] = React.useState(false)

    //state variable for user's stats about followers
    const [userDetails, setUserDetails] = React.useState({})
    
    //function for login button
    const showLoginForm = () => {
        setPopupType("Login")
        showPopup()
    }

    //function for Register button
    const showRegisterForm = () => {
        setPopupType("Register")
        showPopup()
    }

    // Show popup/modal function 
    const showPopup = () => {
        const overlay = document.querySelector('.overlay')
        const popup = document.querySelector('.popup-card')

        setTimeout(() => {
            overlay.classList.add('active')
            popup.classList.add('active')
        }, 100)
    }

    // Close popup/modal function 
    const closePopup = () => {
        const overlay = document.querySelector('.overlay')
        const popup = document.querySelector('.popup-card')
        if (overlay.classList.contains('active')) {
            overlay.classList.remove('active')
        }
        if (popup.classList.contains('active')) {
            popup.classList.remove('active')
        }
    }

    /**  This state variable helps the conditional rendering of the ResultsFeed page 
     * 
     *  it should have one of two values ("sidebar") or ("searchbar")
     * */
    const [resultsType, setResultsType] = React.useState("searchbar")

    // Searched word state variable
    const [searchWord, setSearchWord] = React.useState("")

    // search card transition state variable. Used to make search css transition continuous
    const [transition, setTransition] = React.useState(1)


    // Add all state variables to be passed to this object 
    const authNavvalue = {
        user, setUser, 
        currCategory, setCurrentCategory, 
        popupType, setPopupType, showPopup, closePopup, showLoginForm, showRegisterForm,
        resultsType, setResultsType, 
        error, setError, 
        isLoading, setIsLoading,
        searchWord, setSearchWord,
        transition, setTransition,
        isPwChanged, setIsPwChanged,
        userDetails, setUserDetails
    }


    //Return value
    return(
        <AuthNavContext.Provider value={authNavvalue}>
            <>{children}</>
        </AuthNavContext.Provider>
    )
}


//export the custom context which we just made
export const useAuthNavContext = () =>  React.useContext(AuthNavContext)