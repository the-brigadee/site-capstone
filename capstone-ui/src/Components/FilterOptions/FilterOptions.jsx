import * as React from 'react'
import './FilterOptions.css'
import items from '../../Data/categoryItem.json'

export default function FilterOptions({handleOnSetFilter}) {
  return (
    <div className='filter-options'>
        <h2> Meal Types </h2>
        <div className='filter-table'>
            
            {/*  Button to remove filter options */}
            <button onClick={() => {handleOnSetFilter("")}} className='filter-buttons'>
                <p>None</p>
            </button>

            {/* other filter buttons */}
            {items.map((category, idx) => {
                return <FilterButtons key={idx} category={category} handleOnSetFilter={handleOnSetFilter}/>
            })}
        </div>
    </div>
  )
}

function FilterButtons({category, handleOnSetFilter}){
    return(
        <button onClick={() => {handleOnSetFilter(category.name)}} className='filter-buttons'>
            <p>{category.name}</p>
        </button>
    )
}