import { Route } from "react-router-dom";
import React from "react";

import {Home} from "./Home"

import { FacilityProvider } from "./facilities/FacilityProvider"
import { FacilityForm } from "./facilities/FacilityForm";
import { FacilityList } from "./facilities/FacilityList"

import { ParcelProvider } from "./parcels/ParcelProvider"
import { ParcelForm } from "./parcels/ParcelForm"
import { ParcelList } from "./parcels/ParcelList"


export const ApplicationViews = () => {

    return (
        <>
        <Route exact path="/">
                <Home />
            </Route>
            
        
        <FacilityProvider>
            <Route exact path='/facilities/'>
                <FacilityList />
            </Route>

            <Route exact path='/facilities/add'>
                <FacilityForm />
            </Route>

            <Route exact path="/facilities/edit/:facilityId(\d+)">
              <FacilityForm />
            </Route>

        </FacilityProvider>

        <ParcelProvider>
            <FacilityProvider>
                <Route exact path='/parcels/'>
                 <ParcelList />
                 </Route>
                <Route exact path='/parcels/add'>
                    <ParcelForm />
                 </Route>

            <Route exact path="/parcels/edit/:parcelId(\d+)">
              <ParcelForm />
            </Route>

            </FacilityProvider>
        </ParcelProvider>

        </>
    )
}