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
export const AuthNavConextProvider = ({children}) =>{

    //create our state variables here
    const [user, setUser] = React.useState(false)

    // Add all state variables to be passed to this object 
    const authNavvalue = {
        user, setUser
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