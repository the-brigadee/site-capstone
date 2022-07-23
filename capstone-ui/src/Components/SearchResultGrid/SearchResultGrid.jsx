import * as React from 'react'
import './SearchResultGrid.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import FilterOptions from '../FilterOptions/FilterOptions'
import { useAuthNavContext } from '../../Contexts/authNav'
import ReactPaginate from 'react-paginate'

export default function SearchResultGrid({recipeList, displayFilter, handleOnSetFilter, filter}) {

  //get resultsType from the authNavContext
  const {resultsType, searchWord, transition, setTransition} = useAuthNavContext()

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

  
  React.useEffect(() => {
    // If resultsType is "sidebar" set it to false
    if(resultsType === "sidebar")setDisplayFilterOptions(false)
  })

  //Number of items per page
  const itemsPerPage = 4;


  const [currentItems, setCurrentItems] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);


  // useEffect for the pagination feature
  React.useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(recipeList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(recipeList.length / itemsPerPage));
    // window.scrollTo({top: 0});


    //update transition state variable used to fix the continuous css 
    setTransition(transition+1)
  }, [itemOffset, itemsPerPage,recipeList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % recipeList.length;
    setItemOffset(newOffset);
    setTransition(transition+1)
  };
  
  const [selected, setSelected] = React.useState("none")

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
            {displayFilterOptions ? <FilterOptions handleOnSetFilter={handleOnSetFilter} setSelected={setSelected} selected={selected}/> : <></>}
            <hr />
          </div>


          {/* conditionally render the did not find message */}
          {recipeList.length == 0 ? 
            <div className="no-result">
              <h3> Couldn't Find Any Recipe Matching <br /> <p>{`${searchWord}`}?</p></h3>
              {resultsType.includes("filter") ? <h3 className='no-match'>& Type: {`${filter}`}?</h3> : <></>}
            </div> :
            <></>
          }
          {/* Result Details */}
          <div className="results-grid">
            {
              currentItems.map((recipe, idx) => {
                return(
                  <SearchResultCard even={(idx+1+transition)  % 2 === 0} recipe={recipe} key={idx} />
                )
              })
            }

            {/* pagination component in react */}
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageClassName='page-number'
              previousLinkClassName='page-next'
              nextLinkClassName='page-next'
              activeLinkClassName='page-current'
              activeClassName='page-current-border'
            />
          </div>
    </div>
  )
}
