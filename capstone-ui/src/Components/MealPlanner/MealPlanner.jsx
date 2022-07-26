import * as React from 'react'
import './MealPlanner.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import items from '../../Data/categoryItem.json'
import Overlay from '../Overlay/Overlay'


export default function MealPlanner({imageUrl}) {
  const {error, setError, isLoading, setIsLoading, user, showMealPlannerForm} = useAuthNavContext()
  const navigate = useNavigate()

  return (
    <div className='recipe-container'> 
    <div className='recipe-add'>
      <div className="form">
            <div className="footer">
                <button className="footer-btn recipeadd" disabled={isLoading} onClick={showMealPlannerForm}>
                    {isLoading ? "Loading..." : "Add Recipe"}
                </button>
            </div>
        </div>
    </div>
    <Overlay />
    </div>
  )
}