import * as React from 'react'
import './ResultPage.css'
import SearchResultGrid from '../SearchResultGrid/SearchResultGrid'
import { useAuthNavContext } from '../../Contexts/authNav'
import ApiClient from '../../Services/ApiClient'
import Overlay from '../Overlay/Overlay'
import { useLocation } from 'react-router-dom'


export default function ResultPage() {


  /** Get the resultsType,
   *  searchWord
   *  state from the authcontext*/  
  const {resultsType, searchWord, currCategory, setResultsType} = useAuthNavContext()

  // display filter state variable
  const [displayFilter, setDisplayFilter] = React.useState(false)

  // filter condition state variable
  const [filter, setFilter] = React.useState("")

  // Recipe array state variable
  const [recipeList, setRecipeList] = React.useState([])

  // Banner Content state variable
  const [bannerContent, setBannerContent] = React.useState("")

  // Onclick function to fiter the search result
  const handleOnSetFilter = (mealType) => {
    //This function sets the filter variable to a word, allowing us to filter the recipe list by meal type

    //set filter variable
    setFilter(mealType)

    //set the results type to the special condition if mealType is not ("")
    if(mealType !== "") setResultsType("searchbar filter")
  }

  //Create a React useEffect that will handle A ton of conditional rendering
  React.useEffect(() => {

    async function run() {

    /**  Special condition for the resultsType, 
     * 
     * check if resultsType does not contain (filter)
    */
    if(!resultsType.includes("filter")){
      //set the filter to empty
      handleOnSetFilter("")
    }
    // If the webpage is routed to using the search bar setDisplayFilter to true
    if(resultsType.includes("searchbar")) {
      // display the filter button
      setDisplayFilter(true)
      // Create the banner content
      setBannerContent(`Search Result for ${searchWord}`)

      // If the searchword is empty, do nothing //Error checking 
      if(searchWord === "")  return


      //Call the corresponding api request
      const {data, error} = await ApiClient.recipeSearch(searchWord.replace(/ /g, '%20'), filter.replace(/ /g, '%20'))
      // If there is an error send it to the console
      if(error) console.error(error)

      //If there is data, set recipe list to it
      if(data) setRecipeList(data.result)
      
    }
    else {
      
      //  Make filter options invisible when coming from sidebar
      setDisplayFilter(false)

      //Call the corresponding api request
      const {data, error} = await ApiClient.recipeCategory(currCategory.replace(/ /g, '%20'))
      // If there is an error send it to the console
      if(error) console.error(error)

      //If there is data, set recipe list to it
      if(data) setRecipeList(data.result)

      // Create the banner content
      setBannerContent(`Available ${currCategory} Dishes`)
    }
  }
    
  // run the above function
  run()
    // Clear the filter state variable everytime the component is unmounted
    return () => {
      // handleOnSetFilter("")
    }
  }, [resultsType, searchWord, currCategory, filter])

  
  return (
    <div className='result-page'>

      {/* The main banner  */}
      {/* <div className="result-header">
        <h1 className="result-text">
          {bannerContent}
        </h1>
      </div> */}

      {/* the div containing the result display*/}
        <SearchResultGrid recipeList={recipeList} displayFilter={displayFilter} handleOnSetFilter={handleOnSetFilter} filter={filter}/>
        <Overlay />
    </div>
  )
}