import './App.css';
import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import LandingPage from '../LandingPage/LandingPage';
import NotFound from '../NotFound/NotFound';
import {AuthNavContextProvider, useAuthNavContext} from '../../Contexts/authNav'
import ResultPage from '../ResultPage/ResultPage'
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import RecipeAdd from '../RecipeAddPage/RecipeAdd';
import UserSearchPage from '../UserSearchPage/UserSearchPage';
import UserDetailPage from '../UserDetailPage/UserDetailPage';


export default function AppContainer(){
  return(
    <AuthNavContextProvider>
      <App />
    </AuthNavContextProvider>
  )
}



/**
 * 
 * @returns App function
 */

function App() {


  //return statement
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className='app-body'>
            <Sidebar />
          {/* Create React routers for page navigation. */}
            <Routes>
              {/* Declare individual routes under */}
              <Route path='/' element={<LandingPage/>} />
              <Route path='/search' element={<ResultPage />}/>
              <Route path='/usersearch' element={<UserSearchPage />}/>
              <Route path='/recipe/:recipeId' element={<RecipeDetail />}/>
              <Route path='/recipe/create' element={<RecipeAdd />}/>
              <Route path='/user/:userId' element={<UserProfilePage />}/>
              <Route path='/profile/:userId' element={<UserDetailPage />}/>
              <Route path='*' element={<NotFound />}/>
            </Routes>

            
          </div>
        </BrowserRouter>
        
    </div>
  );
}
