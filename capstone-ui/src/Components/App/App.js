import './App.css';
import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';


/**
 * 
 * @returns App function
 */
function App() {


  //return statement
  return (
    <div className="App">
        <Navbar />
        <div className='app-body'>
          <Sidebar />
         </div>
        

      {/* <React.Fragment>
        
        Create React routers for page navigation.
       
        <BrowserRouter>
        <div className='body-div'>
        <Navbar />
        <Sidebar />
        </div>
          <Routes>
            Declare individual routes under
            <Route path='/' element={<Landing />} />
            
          </Routes>
        </BrowserRouter>
        
      </React.Fragment> */}
    </div>
  );
}

export default App;
