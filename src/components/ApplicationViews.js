import { Route } from "react-router-dom";
import React from "react";


import { FacilityProvider } from "./facilities/FacilityProvider"
import { FacilityForm } from "./facilities/FacilityForm";
import { FacilityList } from "./facilities/FacilityList"


export const ApplicationViews = () => {

    return (
        <FacilityProvider>
            <Route exact path='/facilities/'>
                <FacilityList />
            </Route>

            <Route exact path='/facilities/add'>
                <FacilityForm />
            </Route>
        </FacilityProvider>
    )
}