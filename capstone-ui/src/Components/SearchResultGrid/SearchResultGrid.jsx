import * as React from 'react'
import './SearchResultGrid.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import FilterOptions from '../FilterOptions/FilterOptions'
import { useAuthNavContext } from '../../Contexts/authNav'

export default function SearchResultGrid({recipeList, displayFilter, handleOnSetFilter}) {
  //get resultsType from the authNavContext
  const {resultsType} = useAuthNavContext()

  // display filter options state variable
  const [displayFilterOptions, setDisplayFilterOptions] = React.useState(false)

  // onclick function for the filter button
  const handleFilterOptionsOnClick = (event) => {
    //stop default behaviour
    event.preventDefault()

    // reverse the displayfilteroptions variable
    if (displayFilterOptions) setDisplayFilterOptions(false)
    else setDisplayFilterOptions(true)
  }

  // If resultsType is "sidebar" set it to false
  React.useEffect(() => {
    if(resultsType === "sidebar")setDisplayFilterOptions(false)
  })

  return (
    <div className="results-container">

          {/* Conditional filter button */}
          <div className='conditional-filter'>
            {displayFilter ? 
            <button onClick={handleFilterOptionsOnClick}>
              <img src="https://cdn.iconscout.com/icon/free/png-256/filter-1634626-1389150.png" alt="" className='filter-btn'/>  
              <p> Filter </p>
            </button>
            : <></>}
            {displayFilterOptions ? <FilterOptions handleOnSetFilter={handleOnSetFilter}/> : <></>}
            <hr />
          </div>

          {/* Result Details */}
          <div className="results-grid">
            <SearchResultCard />
          </div>
    </div>
  )
}
