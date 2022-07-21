import * as React from 'react'
import './SearchResultGrid.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import FilterOptions from '../FilterOptions/FilterOptions'
import { useAuthNavContext } from '../../Contexts/authNav'
import ReactPaginate from 'react-paginate'

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


  //Fake data for now 
  const itemsPerPage = 4;
  const recipeLists = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]


  const [currentItems, setCurrentItems] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(recipeLists.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(recipeLists.length / itemsPerPage));
    // window.scrollTo({top: 0});
  }, [itemOffset, itemsPerPage, recipeList       ]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % recipeLists.length;
    setItemOffset(newOffset);
  };

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
            {
              currentItems.map((recipe, idx) => {
                return(
                  <SearchResultCard even={idx % 2 === 0} key={idx}/>
                )
              })
            }
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
