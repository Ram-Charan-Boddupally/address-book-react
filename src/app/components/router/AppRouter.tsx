import React from "react";
import { BrowserRouter, Navigate, NavLink, Route,Routes } from "react-router-dom";

import Home from '../views/homePage';
import AddContact from '../views/contactPage';
import DetailsBlock from '../views/detailsPage';
import Error404 from "../views/errorPage";

import "../../../styles/pagesHeaderStyle.css"

export default function PageRouter(){

    return (
        <BrowserRouter>
          <header>
            <div className='page-title'>Address Book</div>
            <nav className='navigation'>
              <NavLink to={'/home'}>Home</NavLink>
              <NavLink to={'/add'} state={{ edit:false }}>Add</NavLink>
            </nav>
          </header>
          
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/add' element={<AddContact/>}/>
            <Route path='/details' element={<DetailsBlock/>}/>
            <Route path='/*' element={<Error404/>}/>
          </Routes>
        </BrowserRouter>
    );
}
