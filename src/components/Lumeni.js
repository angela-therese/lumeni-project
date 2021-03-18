import React from "react"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import NavBar from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews";
import "./Lumeni.css"
import { Route, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'

export const Lumeni = () => (
    <>
        {/* <h2>Lumeni</h2>
        <small>Prison Book Project Data Management</small>
        <Button variant="success">Success</Button>{' '} */}
        <Route
      render={() => {
        if (localStorage.getItem("lumeni_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />


        <Route path="/login">
          <Login />
        </Route>
        
        <Route path="/register">
          <Register />
        </Route>
      
    

   
 
    </>
)