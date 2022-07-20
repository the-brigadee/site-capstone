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

  // Recipe array state variable
  const [recipeList, setRecipeList] = React.useState([{name : "nasty"}])

  // Banner Content state variable
  const [bannerContent, setBannerContent] = React.useState("")

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
  }, [resultsType, searchWord, currCategory])

  
  return (
    <div className='result-page'>

      {/* The main banner  */}
      <div className="result-header">
        <h1 className="result-text">
          {bannerContent}
        </h1>
      </div>

      {/* the div containing the result display*/}
        <SearchResultGrid recipeList={recipeList} displayFilter={displayFilter}/>
    </div>
  )
}