import React, { useContext, useState, useEffect} from "react"
import { ParcelContext } from "./ParcelProvider"
import { FacilityContext } from "../facilities/FacilityProvider";
import "./Parcel.css"
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


export const ParcelForm = () => {

    const { addParcel, getParcelById, updateParcel, deleteParcel } = useContext(ParcelContext)

    const { facilities, getFacilities } = useContext(FacilityContext)

    //button inactive while waiting for data
    const [isLoading, setIsLoading] = useState(true);
    
    const {parcelId} = useParams();
	const history = useHistory();
   
    const [ parcel, setParcel ] = useState({

       
        dateSent: "",
        parcelNumber:null,
        facilityId: null,
        genre: "",
        title: "",
        returnDate:false,
        returnDetails:false

    })
    

    //this function updates state with input change
        const handleControlledInputChange = (event) => {
            const newParcel = {...parcel}

            newParcel[event.target.id] = event.target.value

            setParcel(newParcel)
    }

    // const currentDate = new Date()
    // const localDateString = currentDate.toLocaleDateString('en-US')

        const handleSaveParcel= () => {
            
            if (parcel.dateSent === "" || parcel.parcelNumber === null || parcel.facilityId === false || parcel.genreId ==="" || parcel.title === ""){
                window.alert("Please fill in all fields.")
            }
            else if(parcelId){

                setIsLoading(true)

                updateParcel({
                 
                    dateSent: parcel.dateSent,
                    parcelNumber: parseInt(parcel.parcelNumber),
                    facilityId: parcel.facilityId,
                    genre: parcel.genre,
                    title: parcel.title,
                    returnDate: false,
                    returnDetails:false,
                    id: parcel.id
    
                })
                .then(() => history.push(`/parcels`))
            }
            else {
            addParcel({
                dateSent: parcel.dateSent,
                parcelNumber: parseInt(parcel.parcelNumber),
                facilityId: parseInt(parcel.facilityId),
                genre: parcel.genreId,
                title: parcel.title,
                returnDate: false,
                returnDetails:false

            })
            .then(() => history.push("/parcels")) 
    }
}

        useEffect(() => {
            getFacilities().then(() => {
                if(parcelId) {
                    getParcelById(parcelId)
                    .then(parcel => {
                        setParcel(parcel)
                        setIsLoading(false)
                        
                    })
                } else {
                    setIsLoading(false)
                }
             })
 
       
         }, [])

         const handleParcelDelete = () => {
            deleteParcel(parcel.id)
                .then(() => {
                    history.push("/parcels")
                })

         }

         const sortedFacilities =  facilities.sort((a, b) => (a.state > b.state) ? 1 : (a.state === b.state) ?((a.name > b.name) ? 1: -1 ) : -1)

    return (
        <>
        <section className="parcel-container">

        <div className="div-header"></div>
        <div className="parcel-form-container">

        <form className="ParcelForm">
        <fieldset>
        <h3> {parcelId ? <>Edit Parcel</> : <>Add a Parcel</>}</h3>
    
        <div className="form-group form-parcel">
            <div className="div-label-input">
            <label>Date Sent</label>
            <input className="form-input date-input" type="date" onChange={handleControlledInputChange} id="dateSent" value={parcel.dateSent}/>
            </div>

            <div className="div-label-input">
            <label>Parcel Number</label>
            <input type="text" id="parcelNumber" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box form-input" placeholder="Enter parcel number here." value={parcel.parcelNumber}/>
            </div>

            <div className="div-label-input">
                <label>Genre</label>
             <Form.Control className="form-input"  as="select" id="genre" value={parcel.genre} onChange={handleControlledInputChange}>
                <option>Select a genre</option>
                <option>Reference</option>
                <option>Mystery</option>
                <option>Western</option>
                <option >Science Fiction</option>
                <option>Religion</option>
                <option>Biography</option>
             </Form.Control>
             </div>
             

             <div className="div-label-input">
             <label>Facility </label>
            <Form.Control as="select" value={parcel.facilityId} className="form-input"  onChange={handleControlledInputChange} id="facilityId">
            
            <option value="0">Select a facility</option>
                {sortedFacilities.map(f => (
                <option key={f.id} value={f.id}>
                  {f.state + "--" + f.name}
                </option>
              ))}
            </Form.Control>
            </div>
        

 
            <div className="div-label-input">
            <label>Book Title</label>
            <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box form-input" placeholder="Enter title" value={parcel.title}/>
             </div>

       
      <div className="btns-container">
       <Button variant="info" className="btn btn-primary" size="sm"
             disabled={isLoading}
             onClick={event => {
               event.preventDefault() // Prevent browser from submitting the form and refreshing the page
               handleSaveParcel()
             }}>
          {parcelId ? <>Submit</> : <>Save</>}</Button> 
           
          <button className="btn-del" onClick={handleParcelDelete}>Delete</button>
       
        <Button variant="link" size="sm" className="btn-ret" onClick={() => {
                    history.push("/parcels/")}}>Return to List</Button>{' '}
           {/* <button onClick={handleDelete} className="btn btn-primary delete-btn"> {messageId ? <> Delete </>: <> Cancel </>}</button> */}
           </div>
        </div>
       </fieldset>
        </form>
        
        </div>
        </section>
        </>


     )
}

{/* <input list="states"  name="facility-state" />
<datalist id="states">
{sortedFacilities.map(facility => {
  return(
  <option value={facility.state + "--" + facility.name} />
  )
 })}
</datalist> */}