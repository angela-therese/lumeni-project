import React, {useState, createContext} from "react"
import { useHistory } from "react-router-dom"

//context stores data for your application and is used by individual components that need to access that data. The context is imported into relevant components. Nothing is there when it is first defined; just an empty warehouse to be filled
export const FacilityContext = createContext()

//props here? 
export const FacilityProvider = (props) => {
    
    const [facilities, setFacilities] = useState([])
    const history = useHistory()

    const getFacilities = () => {
        return fetch("https://lumeni-api.herokuapp.com/facilities/?_embed=parcels")
        .then(res => res.json())
        .then(setFacilities)
    }

    const addFacility = facilityObj => {
        return fetch("https://lumeni-api.herokuapp.com/facilities/?_embed=parcels/facilities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(facilityObj)
        })
        .then(response => response.json())
    }

    const getFacilityById = (id) => {
        return fetch(`https://lumeni-api.herokuapp.com/facilities/${id}/?_embed=parcels`)
        .then(res => res.json())
    } 

    const updateFacility = facility => {
        return fetch (`https://lumeni-api.herokuapp.com/facilities/${facility.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(facility)
        })
            .then(getFacilities)
    }
    const deleteFacility = facilityId => {
        return fetch(`https://lumeni-api.herokuapp.com/facilities/${facilityId}?_embed=parcels`, {
            method: "DELETE"
        })
            .then(getFacilities)
            .then(history.push(`/facilities`))
    }


//return the context provider that holds the functions you defined above. 
return (
        <FacilityContext.Provider value={{
            facilities, getFacilities, addFacility, getFacilityById, updateFacility, deleteFacility
        }}>
            {props.children}
        </FacilityContext.Provider>
)

}
