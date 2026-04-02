import React, { useEffect } from "react";
import SearchP from "./components/SearchP";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMain from "./components/UserMain";


const User_main = ()=>{

    return(
    <div>
        <BrowserRouter>
            
            <div className="App">
                <Routes>
                <Route path='/' element={<UserMain/>}/>
                <Route path='/Search/:ADDR' element={<SearchP/>}/>
                </Routes>
            </div>
        </BrowserRouter>


        
    </div>
    )
}

export default User_main