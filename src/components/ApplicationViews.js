import { Route } from "react-router-dom";
import React from "react";

import { FacilityProvider } from "./facilities/FacilityProvider"
import { FacilityForm } from "./facilities/FacilityForm";


export const ApplicationViews = () => {

    return (
        <FacilityProvider>
            <Route exact path='/facilities/'>
                <FacilityForm />
            </Route>
        </FacilityProvider>
    )
}