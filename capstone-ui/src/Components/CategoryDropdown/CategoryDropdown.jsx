import * as React from 'react'
import './CategoryDropdown.css'
import { useAuthNavContext } from '../../Contexts/authNav'
import { useNavigate } from 'react-router-dom'
import items from '../../Data/categoryItem.json'
import Categories from '../Categories/Categories'

export default function CategoryDropdown() {

    //get the current category,
    // setResultsType from the auth context 
    const {setCurrentCategory, setResultsType} = useAuthNavContext()

    //create the navigate object/function
    const navigate = useNavigate()

    //create a function for each Category link
    const handleCategoryOnClick = (category) => {
        
        //set the current category to the category clicked on
        setCurrentCategory(category)

        //set the resultsType to "sidebar"
        setResultsType("sidebar")
        
        //navigage to the results page
        navigate('/search')
    }

    // The main return function for the categories dropdown
  return (
    <div className='category-box'>
        {/* map each category in our categories item array aliased as (items) to a category component */}
        {items.map((item,idx) => {
            return <Categories key={idx} item={item} handleCategoryOnClick={handleCategoryOnClick}/>
        })}
    </div>
  )
}
