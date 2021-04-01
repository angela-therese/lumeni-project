import React, { useContext, useState, useEffect} from "react"
import { FacilityContext } from "./FacilityProvider"
import "./Facility.css"
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'



export const FacilityForm = () => {

    const { addFacility, getFacilities, getFacilityById, updateFacility, deleteFacility } = useContext(FacilityContext)

    const [ facility, setFacility ] = useState({
       name: "",
       city: "",
       state: "",
       notes: "",
       
        
    })
    //button inactive while waiting for data
        const [isLoading, setIsLoading] = useState(true);
    //
        const {facilityId} = useParams();
	    const history = useHistory();

    //this function updates state with input change
        const handleControlledInputChange = (event) => {
            const newFacility = {...facility}

            newFacility[event.target.id] = event.target.value

            setFacility(newFacility)
    }

        const handleSaveFacility= () => {
            
            if(facility.state.length > 2 || facility.name === "" || facility.city ===""){
                window.alert("Please fill in all fields.")
            }

            else if(facilityId){
                setIsLoading(true)
                updateFacility({
                    id: facility.id,
                    name: facility.name,
                    city: facility.city,
                    state: facility.state, 
                    notes: facility.notes
    
                })
                .then(() => history.push(`/facilities`))
            } else {
            addFacility({
              
                name: facility.name,
                city: facility.city,
                state: facility.state,
                notes: facility.notes

            })
            // .then(() => history.push("/facilities"))
             .then(() => setFacility({

                name: "",
                city: "",
                state: "",
                notes: "" ,
                title: "",
           
               
        
            }))
            .then(getFacilities)
            .then(() => history.push(`/facilities`))
        
        }
    }

    const handleFacilityDelete = () => {
        deleteFacility(facility.id)
            .then(() => {
                history.push("/facilities")
            })

     }

        useEffect(() => {
           
                if(facilityId) {
                    getFacilityById(facilityId)
                    .then(facility => {
                        setFacility(facility)
                        setIsLoading(false)
                    })
                } else {
                    setIsLoading(false)
                }
 
         }, [])

        const handleDelete = () => {
            if(window.confirm('Are you sure you want to delete this record?')) {
        deleteFacility(facility.id)
          .then(() => {
            history.push("/facilities")
          })
        }
      }
       

      if(facilityId){
    return (
        <>
        <section className="form-edit-container">

        

        <form className="FacilityFormEdit">
        <fieldset>
        <h5> {facilityId ? <>Edit Facility</> : <>Add a Facility</>}</h5>
       
        <div className="form-group form-fac">

            <label htmlFor="facilityName">Facility Name </label>
            <input className="input-fac" type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="Enter facility name here." value={facility.name}/>
            <label htmlFor="cityName">City</label>
            <input className="input-fac" type="text" id="city" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="City" value={facility.city}/>
            <label htmlFor="facilityState">State</label>
             <Form.Control as="select" id="state" value={facility.state} onChange={handleControlledInputChange}>
                <option>Please select a state</option>
                <option>KY</option>
                <option>MD</option>
                <option>OH</option>
                <option>TN</option>
                <option>VA</option>
                <option>WV</option>
             </Form.Control>
             <label htmlFor="facilityName">Facility Notes</label>
            <input className="input-fac" type="textarea" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="Optional notes here" value={facility.notes}/>


             <div className="btns-container">
       <Button variant="info" size="sm" className="btn-save" 
             disabled={isLoading}
             onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleSaveFacility()
              }}>
          {facilityId ? <>Submit</> : <>Save</>}</Button>
          <Button variant="secondary" size="sm" className="btn-save" 
             disabled={isLoading}
             onClick={handleDelete}>
          Delete</Button>
                    
          <Button variant="link" size="sm" className="btn-save" onClick={() => {
                    history.push("/facilities/")}}>Return to list</Button>
           

        </div>
       </div>
       </fieldset>
        </form>
      
        </section>
        </>


     )
    } else {
        return (
        <>
        {/* <section className="facility-comp"> */}

        <div className="form-container">

        <form className="FacilityForm">
        <fieldset>
        <h5> {facilityId ? <>Edit Facility</> : <>Add a Facility</>}</h5>
       
        <div className="form-group form-fac">

            <label htmlFor="facilityName">Facility Name </label>
            <input className="input-fac" type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="Enter facility name here." value={facility.name}/>
            <label htmlFor="cityName">City</label>
            <input className="input-fac" type="text" id="city" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="City" value={facility.city}/>
            <label htmlFor="facilityState">State</label>
             <Form.Control as="select" id="state" value={facility.state} onChange={handleControlledInputChange}>
                <option>Please select a state</option>
                <option>KY</option>
                <option>MD</option>
                <option>OH</option>
                <option>TN</option>
                <option>VA</option>
                <option>WV</option>
             </Form.Control>
             <label htmlFor="facilityName">Facility Notes</label>
            <input className="input-fac" type="textarea" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="Optional notes here" value={facility.notes}/>


             <div className="btns-container">
       <Button variant="info" size="sm" className="btn-save" 
             disabled={isLoading}
             onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleSaveFacility()
              }}>
          {facilityId ? <>Submit</> : <>Save</>}</Button>
          

        </div>
       </div>
       </fieldset>
        </form>
        </div>
        {/* </section> */}
        </>
     )}
    }

    





