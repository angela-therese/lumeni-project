import React, { useContext, useState, useEffect} from "react"
import { ParcelContext } from "./ParcelProvider"
import { FacilityContext } from "../facilities/FacilityProvider";
import { GenreContext } from "../GenreProvider"
import { FacilityList } from "../facilities/FacilityList"
import "./Parcel.css"
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


export const ParcelReturnForm = () => {

    const { getParcels, addParcel, getParcelById, updateParcel} = useContext(ParcelContext)

    const { facilities, getFacilities } = useContext(FacilityContext)

    const { genres, getGenres } = useContext(GenreContext)

    //button inactive while waiting for data
    const [isLoading, setIsLoading] = useState(true);
    

    const {parcelId} = useParams();
	const history = useHistory();
   
    const [ parcel, setParcel ] = useState({

       
        dateSent: "",
        parcelNumber:null,
        facilityId: null,
        genreId: null, 
        title: "",
        return:false,
        returnDate:""

    })
    

    //this function updates state with input change
        const handleControlledInputChange = (event) => {
            const newParcel = {...parcel}

            newParcel[event.target.id] = event.target.value

            setParcel(newParcel)
    }

    // const currentDate = new Date()
    // const localDateString = currentDate.toLocaleDateString('en-US')

        const handleReturnParcel= () => {
            

                setIsLoading(true)

                updateParcel({
                 
                    dateSent: parcel.dateSent,
                    parcelNumber: parseInt(parcel.parcelNumber),
                    facilityId: parcel.facilityId,
                    genreId: parseInt(parcel.genreId),
                    title: parcel.title,
                    return: true,
                    returnDate:parcel.returnDate,
                    id: parcel.id
    
                })
                .then(getParcels)
                .then(() => history.push(`/parcels`))
            }
            // .then(getParcels)
            // .then(() => history.push(`/parcels`))
    
       
        


        useEffect(() => {
            getGenres().then(getFacilities)
            .then(() => {
                if(parcelId) {
                    getParcelById(parcelId)
                    .then(parcel => {
                        setParcel(parcel)
                        setIsLoading(false)
                        
                    })
                } else {
                    setIsLoading(false)
                }})
         }, [])

         if(parcelId){
             return (
                <>
                
                {/* <section className="parcel-container"> */}
        
                {/* <div className="div-header"></div> */}
                <div className="parcel-return-container">
        
                <form className="ParcelForm">
                <fieldset>
                <h5>Return Parcel</h5>
            
                    <div className="form-group form-parcel">
                    <div className="div-label-input">
                    <label>Date Returned</label>
                    <input className="form-input date-input" type="date" onChange={handleControlledInputChange} id="returnDate" value={parcel.returnDate}/>
                    </div>
        
        <div className="btns-container">
              
               <Button variant="info" className="btn btn-primary" size="sm"
                     disabled={isLoading}
                     onClick={event => {
                       event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                       handleReturnParcel()
                     }}>
                 Save</Button> 

            
                <Button variant="link" size="sm" className="btn-ret" onClick={() => {
                            history.push("/parcels/")}}>Return to List</Button>{' '}
                </div>
                </div>
               </fieldset>
                </form>
                
                </div>
                {/* </section> */}
                </>

        
             )}
       
    }
































{/* <input list="states"  name="facility-state" />
<datalist id="states">
{sortedFacilities.map(facility => {
  return(
  <option value={facility.state + "--" + facility.name} />
  )
 })}
</datalist> */}