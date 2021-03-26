import { Route } from "react-router-dom";
import React from "react";

import {Home} from "./Home"

import { FacilityProvider } from "./facilities/FacilityProvider"
import { FacilityForm } from "./facilities/FacilityForm";
import { FacilityList } from "./facilities/FacilityList"
import { FacilityDetail } from "./facilities/FacilityDetail"

import { ParcelProvider } from "./parcels/ParcelProvider"
import { ParcelForm } from "./parcels/ParcelForm"
import { ParcelReturnForm} from "./parcels/ParcelReturnForm"
import { ParcelList } from "./parcels/ParcelList"

import { GenreProvider } from "./GenreProvider"
import { ReportList } from "./reports/ReportList"
import { ReturnList } from "./returns/ReturnList"



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

            <Route exact path="/facilities/details/:facilityId(\d+)">
                <FacilityDetail/>
            </Route>
        </FacilityProvider>

        <ParcelProvider>
            <FacilityProvider>
                <GenreProvider>
                     <Route exact path='/parcels/'>
                        <ParcelList />
                     </Route>
                
                     <Route exact path="/parcels/edit/:parcelId(\d+)">
                         <ParcelForm />
                     </Route>

                    <Route exact path="/reports)">
                        <ParcelReturnForm/ >
                    </Route>

                    <Route exact path="/reports">
                        <ReportList/ >
                    </Route>

                    <Route exact path="/returns">
                        <ReturnList />
                    </Route>
                </GenreProvider>
            </FacilityProvider>
        </ParcelProvider>

        </>
    )
}