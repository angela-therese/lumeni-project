import { Route } from "react-router-dom";
import React from "react";

import {Home} from "./Home"
import {NavBar} from "./nav/NavBar"

import { FacilityProvider } from "./facilities/FacilityProvider"
import { FacilityForm } from "./facilities/FacilityForm";
import { FacilityList } from "./facilities/FacilityList"
import { FacilityDetail } from "./facilities/FacilityDetail"

import { ParcelProvider } from "./parcels/ParcelProvider"
import { ParcelForm } from "./parcels/ParcelForm"
import { ParcelReturnForm} from "./parcels/ParcelReturnForm"
import { ParcelList } from "./parcels/ParcelList"

import { GenreProvider } from "./GenreProvider"
import { UserProvider } from "./UsersProvider"
import { ReportList } from "./reports/ReportList"
import { ReturnList } from "./returns/ReturnList"



export const ApplicationViews = () => {

    return (
        <>
        <Route exact path="/">
                <UserProvider>
                    <ParcelProvider>
                <Home />
                    </ParcelProvider>
                </UserProvider>
            </Route>
            
        
        <FacilityProvider>
            <UserProvider>
            <Route exact path='/facilities/'>
                <NavBar /> 
                <FacilityList />
            </Route>

            <Route exact path='/facilities/add'>
                <NavBar /> 
                <FacilityForm />
            </Route>

            <Route exact path="/facilities/edit/:facilityId(\d+)">
              <NavBar /> 
              <FacilityForm />
            </Route>

            <Route exact path="/facilities/details/:facilityId(\d+)">
                <NavBar /> 
                <FacilityDetail/>
            </Route>
            </UserProvider>
        </FacilityProvider>

        <ParcelProvider>
            <FacilityProvider>
                <GenreProvider>
                 <UserProvider>
                     <Route exact path='/parcels/'>
                        <NavBar /> 
                        <ParcelList />
                     </Route>
                
                     <Route exact path="/parcels/edit/:parcelId(\d+)">
                         <NavBar /> 
                         <ParcelForm />
                     </Route>


                    <Route exact path="/reports">
                        <NavBar /> 
                        <ReportList />
                        
                    </Route>

                    <Route exact path="/returns">
                         <NavBar /> 
                        <ReturnList />
                    </Route>
                    </UserProvider>
                </GenreProvider>
            </FacilityProvider>
        </ParcelProvider>

        </>
    )
}