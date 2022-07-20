import * as React from 'react'
import './SearchResultGrid.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'

export default function SearchResultGrid({recipeList, displayFilter}) {
  return (
    <div className="results-container">

          {/* Conditional filter button */}
          <div>
            {displayFilter ? <img src="https://cdn-icons.flaticon.com/png/512/3171/premium/3171047.png?token=exp=1658268262~hmac=032982963513064b3d09d891152518b3" alt="" className='filter-btn'/>  : <></>}
          </div>

          {/* Result Details */}
          <div className="results-grid">
            <SearchResultCard />
          </div>
    </div>
  )
}
