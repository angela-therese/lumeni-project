import React, {useState, createContext} from "react"
import { useHistory } from "react-router-dom"
//context stores data for your application and is used by individual components that need to access that data. The context is imported into relevant components. Nothing is there when it is first defined; just an empty warehouse to be filled
export const ParcelContext = createContext()

//props here? 
export const ParcelProvider = (props) => {
    
    const [parcels, setParcels] = useState([])
    const history = useHistory()
    

    const getParcels = () => {
        return fetch(`https://lumeni-api.herokuapp.com/parcels?_expand=genre&_expand=facility`)
        .then(res => res.json())
        .then(setParcels)
    }

    const addParcel = parcelObj => {
        return fetch(`https://lumeni-api.herokuapp.com/parcels`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(parcelObj)
        })
        .then(response => response.json())
        .then(getParcels)
        
    }

    const getParcelById = (id) => {
        return fetch(`https://lumeni-api.herokuapp.com/parcels/${id}`)
        .then(res => res.json())
    } 

    const updateParcel= parcel=> {
        return fetch (`https://lumeni-api.herokuapp.com/parcels/${parcel.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parcel)
        })
            .then(getParcels)
    }

    const deleteParcel = parcelId => {

        return fetch(`https://lumeni-api.herokuapp.com/parcels/${parcelId}`, {
            method: "DELETE"
        })
       
        .then(getParcels)
        .then(history.push(`/parcels`))
    }

 
    
//return the context provider that holds the functions you defined above. 
return (
        <ParcelContext.Provider value={{
            parcels, getParcels, addParcel, getParcelById,updateParcel, deleteParcel
        }}>
            {props.children}
        </ParcelContext.Provider>

)

}