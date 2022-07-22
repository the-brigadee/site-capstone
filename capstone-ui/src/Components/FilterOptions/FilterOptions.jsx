import * as React from 'react'
import './FilterOptions.css'
import items from '../../Data/categoryItem.json'

export default function FilterOptions({handleOnSetFilter, setSelected, selected}) {
    const handleOptionOnActive = (name) => {
        setSelected(name)
    }
    

    React.useEffect(() => {
        
    })

  return (
    <div className='filter-options'>
        <h2> Meal Types </h2>
        <div className='filter-table'>
            
            {/*  Button to remove filter options */}
            <button onClick={() => {handleOnSetFilter("") 
            handleOptionOnActive("none")}} className={`filter-buttons ${selected === "none" ? 'active' : ""}`}>
                <p>None</p>
            </button>

            {/* other filter buttons */}
            {items.map((category, idx) => {
                return <FilterButtons key={idx} category={category} handleOnSetFilter={handleOnSetFilter} handleOptionOnActive={handleOptionOnActive} selected={selected}/>
            })}
        </div>
    </div>
  )
}

function FilterButtons({category, handleOnSetFilter, handleOptionOnActive, selected}){
    return(
        <button onClick={() => {handleOnSetFilter(category.name)
            handleOptionOnActive(category.name)}} className={`filter-buttons ${selected === category.name ? 'active' : ""}`}>
            <p>{category.name}</p>
        </button>
    )
}
