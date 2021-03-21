import { Route } from "react-router-dom";
import React from "react";

import {Home} from "./Home"

import { FacilityProvider } from "./facilities/FacilityProvider"
import { FacilityForm } from "./facilities/FacilityForm";
import { FacilityList } from "./facilities/FacilityList"

import { ParcelProvider } from "./parcels/ParcelProvider"
import { ParcelForm } from "./parcels/ParcelForm"


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
            <Route exact path='/parcels/'>
                <ParcelForm />
            </Route>
        </ParcelProvider>

        </>
    )
}