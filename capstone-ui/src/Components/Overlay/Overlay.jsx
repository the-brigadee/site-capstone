import * as React from 'react'
import './Overlay.css'
import {useAuthNavContext} from "../../Contexts/authNav"
import Popup from '../Popup/Popup'



export default function Overlay(){
    const {closePopup} = useAuthNavContext()

    return(
        <div className="overlay" onClick={closePopup}>
            <Popup />
        </div>
    )
}