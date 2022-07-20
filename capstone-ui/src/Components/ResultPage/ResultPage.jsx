import * as React from 'react'
import './ResultPage.css'
import SearchResultGrid from '../SearchResultGrid/SearchResultGrid'
import { useAuthNavContext } from '../../Contexts/authNav'

export default function ResultPage() {

  /** Get the resultsType,
   *  searchWord
   *  state from the authcontext*/  
  const {resultsType, searchWord, currCategory} = useAuthNavContext()

  // display filter state variable
  const [displayFilter, setDisplayFilter] = React.useState(false)

  // filter condition state variable
  const [filter, setFilter] = React.useState("")

  // Recipe array state variable
  const [recipeList, setRecipeList] = React.useState([{name : "nasty"}])

  // Banner Content state variable
  const [bannerContent, setBannerContent] = React.useState("")

  // Onclick function to fiter the search result
  const handleOnSetFilter = (mealType) => {
    //This function sets the filter variable to a word, allowing us to filter the recipe list by meal type

    //set filter variable
    setFilter(mealType)
  }

  //Create a React useEffect that will handle A ton of conditional rendering
  React.useEffect(() => {

    // If the webpage is routed to using the search bar setDisplayFilter to true
    // Create the banner content
    if(resultsType === "searchbar") {
      setDisplayFilter(true)
      setBannerContent(`Search Result for ${searchWord}`)
    }
    else {
      setDisplayFilter(false)
      setBannerContent(`Available ${currCategory} Dishes`)
    }

    console.log(resultsType)

    // Clear the filter state variable everytime the component is unmounted
    return () => {
      handleOnSetFilter("")
    }
  }, [resultsType, searchWord, currCategory, filter])

  
  return (
    <div className='result-page'>

      {/* The main banner  */}
      <div className="result-header">
        <h1 className="result-text">
          {bannerContent}
        </h1>
      </div>

      {/* the div containing the result display*/}
        <SearchResultGrid recipeList={recipeList} displayFilter={displayFilter} handleOnSetFilter={handleOnSetFilter}/>
    </div>
  )
}