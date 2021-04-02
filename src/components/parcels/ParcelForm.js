import React, { useContext, useState, useEffect} from "react"
import { ParcelContext } from "./ParcelProvider"
import { FacilityContext } from "../facilities/FacilityProvider";
import { GenreContext } from "../GenreProvider"
import "./Parcel.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap'


export const ParcelForm = () => {

    const { getParcels, addParcel, getParcelById, updateParcel, deleteParcel} = useContext(ParcelContext)
    const { facilities, getFacilities } = useContext(FacilityContext)
    const { genres, getGenres } = useContext(GenreContext)


    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

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
        return: false,
        returnDate:"",
        returnStatus: ""

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
            
            if (parcel.dateSent === "" || parcel.parcelNumber === null || parcel.facilityId === "0" || parcel.genreId === 0 || parcel.title === ""){
                window.alert("Please fill in all fields.")
            }
            else if(parcelId){

                setIsLoading(true)

                updateParcel({
                 
                    dateSent: parcel.dateSent,
                    parcelNumber: parseInt(parcel.parcelNumber),
                    facilityId: parcel.facilityId,
                    genreId: parseInt(parcel.genreId),
                    title: parcel.title,
                    return: parcel.return,
                    returnDate:parcel.returnDate,
                    id: parcel.id
    
                })
                .then(getParcels)
                .then(() => history.push(`/parcels`))
            }
            else {
            addParcel({
                dateSent: parcel.dateSent,
                parcelNumber: parseInt(parcel.parcelNumber),
                facilityId: parseInt(parcel.facilityId),
                genreId: parseInt(parcel.genreId),
                title: parcel.title,
                return: false,
                returnDate: false,
                

            })

.then(() => setParcel({

                dateSent: "",
                parcelNumber: "",
                facilityId: 0,
                genreId: 0, 
                title: "",
                return: false,
                returnDate:false,
               
        
            }))

     }
    }

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
                }
             })
 
       
         }, [])

         const handleParcelDelete = () => {

          if(window.confirm('Are you sure you want to delete this record?')) {
            deleteParcel(parcel.id)
                .then(() => {
                    history.push("/parcels")
                })
              }
         }

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
      

         const handleCancelReturn = () => {
          if(window.confirm('Are you sure you want to return this book?')) {
                
            setIsLoading(true)

            updateParcel({
                dateSent: parcel.dateSent,
                parcelNumber: parseInt(parcel.parcelNumber),
                facilityId: parcel.facilityId,
                genreId: parseInt(parcel.genreId),
                title: parcel.title,
                return: false,
                returnDate:"",
                id: parcel.id
            })
            .then(getParcels)
            .then(() => history.push(`/parcels`))
      
    }
  }

     

         const sortedFacilities =  facilities.sort((a, b) => (a.state > b.state) ? 1 : (a.state === b.state) ?((a.name > b.name) ? 1: -1 ) : -1)

         if(parcelId){
             return (
                <>
                {/* MODAL START */}
                 <Modal show={show} onHide={handleClose} >
                   <Modal.Header closeButton>
                     <Modal.Title>Mark Returned</Modal.Title>
                   </Modal.Header>
                 <Modal.Body>
                  
                <section className="parcel-container">
        
        {/* <div className="div-header"></div> */}
        <div className="parcel-return-container">

        <form className="ParcelForm">
        <fieldset>
        <h5>Date Received</h5>
    
            <div className="form-group form-parcel-modal">
            <div className="div-label-input modal-date-input">
            {/* <label>Date Returned</label> */}
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
                    history.push("/parcels/")}}>Go Back to Parcel List</Button>{' '}
        </div>
        </div>
       </fieldset>
        </form>
        
        </div>
        {/* <ReturnList /> */}
        </section>
                   </Modal.Body>
                
            
                </Modal>

                {/* END MODAL */}
                <section className="form-edit-container">
        
                {/* <div className="div-header"></div> */}
                <div className="parcel-form-edit">
        
                <form className="ParcelForm">
                <fieldset className="edit-form-fieldset">
                <h5> {parcelId ? <>Edit Parcel </> : <>Add a Parcel</>} <br></br></h5> <br></br>
                

                <Button variant="primary" onClick={handleShow} size="sm">
                  Mark Returned
                </Button>  <Button variant="secondary" size="sm"  onClick={event => {
                       event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                       handleCancelReturn()
                     }}>Undo Return</Button> 

                   <div className="form-group form-parcel-edit">
                     
                    <div className="div-label-input">
                    <label>Date Sent</label>
                    <input className="form-input date-input" type="date" onChange={handleControlledInputChange} id="dateSent" value={parcel.dateSent}/>
                    </div>
        
                    <div className="div-label-input">
                    <label>Parcel Number</label>
                    <input type="text" id="parcelNumber" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box form-input" placeholder="Enter number" value={parcel.parcelNumber}/>
                    </div>
        
                    <div className="div-label-input">
                        <label>Genre</label>
                     <Form.Control className="form-input"  as="select" id="genreId" value={parcel.genreId} onChange={handleControlledInputChange}>
                     <option value="0">Select a genre</option>
                     {genres.map(g => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
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
                    </div><br></br>

                         
                    
                     {/* <label>Return Parcel </label> */}
                    
                 

                     {/* <div className="div-label-input">
                     <label></label> 
                     <Button className="btn-undo" size="sm"  onClick={event => {
                       event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                       handleCancelReturn()
                     }}>Reverse Return</Button> 
                    </div>
         */}
                   
               
                    
                </div>
                <div className="btn-div">
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
                   </div>

               
               </fieldset>
              </form>
              
                
              </div>
              </section>
               
              </>

        
             )
         }
         else {

    return (
        <>

        <section className="container-form">

        {/* <div className="div-header"></div> */}
      

        {/* <form className="parcel-form"> */}
        {/* <fieldset> */}
        <div className="form-parcel">
        <h5> {parcelId ? <>Edit Parcel</> : <>Add Parcel</>}</h5>
        
        {/* <div className="form-group form-parcel"> */}
            <div className="div-label-input">
            <label>Date Sent</label>
            <input className="form-input date-input" type="date" onChange={handleControlledInputChange} id="dateSent" value={parcel.dateSent}/>
            </div>

            <div className="div-label-input">
            <label>Parcel Number</label>
            <input type="text" id="parcelNumber" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box form-input" placeholder="Enter number" value={parcel.parcelNumber}/>
            </div>

            <div className="div-label-input">
                <label>Genre</label>
             <Form.Control className="form-input"  as="select" id="genreId" value={parcel.genreId} onChange={handleControlledInputChange}>
             <option value="0">Select a genre</option>
             {genres.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
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
          </div>
      
           </div>
        {/* </div> */}
       {/* </fieldset> */}
        {/* </form> */}
        {/* </div> */}
        </section>
        {/* </section> */}
        </>


     )
}
}



















{/* <input list="states"  name="facility-state" />
<datalist id="states">
{sortedFacilities.map(facility => {
  return(
  <option value={facility.state + "--" + facility.name} />
  )
 })}
</datalist> */}