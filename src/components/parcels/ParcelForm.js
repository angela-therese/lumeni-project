import React, { useContext, useState, useEffect} from "react"
import { ParcelContext } from "./ParcelProvider"
import { FacilityContext } from "../facilities/FacilityProvider";
import "./Parcel.css"
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


export const ParcelForm = () => {

    const { addParcel, getParcelById } = useContext(ParcelContext)
    const {  facilities, getFacilities } = useContext(FacilityContext)

    //button inactive while waiting for data
    const [isLoading, setIsLoading] = useState(true);
    
    const {parcelId} = useParams();
	const history = useHistory();
   
    const [ parcel, setParcel ] = useState({
        userId: parseInt(localStorage.getItem("lumeni_user")),
        dateSent: "",
        parcelNumber: null,
        facilityId: null,
        genreId: null,
        title:"",
        returnDate: "",
        returnDetail:""
    })
    

    //this function updates state with input change
        const handleControlledInputChange = (event) => {
            const newParcel = {...parcel}

            newParcel[event.target.id] = event.target.value

            setParcel(newParcel)
    }

    const currentDate = new Date()
    const localDateString = currentDate.toLocaleDateString('en-CA')

        const handleSaveParcel= () => {
            
            // if(Parcel.state.length > 2 || Parcel.name === "" || Parcel.city ===""){
            //     window.alert("Please fill in all fields.")
            // }
            // else {
            addParcel({
                userId: parseInt(localStorage.getItem("lumeni_user")),
                dateSent: localDateString,
                parcelNumber: parseInt(parcel.parcelNumber),
                facilityId: parcel.facilityId,
                genreId: parcel.genreId,
                title: parcel.title,
                returnDate: false,
                returnDetail:false

            })
            .then(() => history.push("/parcels")) 
    }

    // useEffect(() => {
    //      if(parcelId) {
    //                 getParcelById(parcelId)
    //                 .then(parcel => {
    //                     setParcel(parcel)
    //                     setIsLoading(false)
                        
    //                 })
    //             } else {
    //                 setIsLoading(false)
    //             }
    //         }, [])

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

            // const facilitiesMenu = require("../../../api/database.json")

    return (
        <>
        <section className="parcel-container">

        <div className="header-div"></div>
        <div className="parcel-form-container">

        <form className="ParcelForm">
        <fieldset>
        <h3>Add a Parcel</h3>

        <div className="form-group form-parcel">
            <input className="form-input date-input" type="date"  onChange={handleControlledInputChange} id="dateSent" value={parcel.dateSent}></input>

           
            <input type="text" id="parcelNumber" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box form-input" placeholder="Enter parcel number here." value={parcel.number}/>
       

            
             <Form.Control className="form-input" as="select" id="genreId" value={parcel.genreId} onChange={handleControlledInputChange}>
                <option value="0">Select a genre</option>
                <option>Reference</option>
                <option>Mystery</option>
                <option>Western</option>
                <option>Science Fiction</option>
                <option>Religion</option>
                <option>Biography</option>
             </Form.Control>

            <select>
                {facilities.map(f => {
                    return (
                    <option key={f.id} value={f.name}>
                        {f.name}
                    </option>

              
                     ) }
                     
                )}
             </select>
            


             
             <Form.Control className="form-input" as="select" id="facilityId" value={parcel.facilityId} onChange={handleControlledInputChange}>
                <option>Select a facility</option>
             </Form.Control>

             
            <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box form-input" placeholder="Book Title" value={parcel.title}/>
             
       </div>
       </fieldset>
      
      <div className="btns-save-return">
       <Button variant="primary" className="btn btn-primary" size="sm"
             disabled={isLoading}
             onClick={event => {
               event.preventDefault() // Prevent browser from submitting the form and refreshing the page
               handleSaveParcel()
             }}>
           <>Save Parcel</> </Button>

           <Button variant="secondary" size="sm" className="btn-ret" onClick={() => {
                    history.push("/parcels/")}}>Return to List</Button>{' '}


        </div>
           {/* <button onClick={handleDelete} className="btn btn-primary delete-btn"> {messageId ? <> Delete </>: <> Cancel </>}</button> */}
        </form>
        </div>
        </section>
        </>


     )
}