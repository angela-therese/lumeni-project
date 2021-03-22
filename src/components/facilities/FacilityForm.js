import React, { useContext, useState, useEffect} from "react"
import { FacilityContext } from "./FacilityProvider"
import "./Facility.css"
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'



export const FacilityForm = () => {

    const { addFacility, getFacilityById, updateFacility, deleteFacility } = useContext(FacilityContext)

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
            .then(() => history.push("/facilities"))
            
        }
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
        deleteFacility(facility.id)
          .then(() => {
            history.push("/facilities")
          })
      }
       


    return (
        <>
        <section className="facility-comp">

        <div className="div-header"></div>
        <div className="facility-form-comp">

        <form className="FacilityForm">
        <fieldset>
        <h3> {facilityId ? <>Edit Facility</> : <>Add a Facility</>}</h3>
        <div className="form-group form-fac">

            <label htmlFor="facilityName">Facility Name </label>
            <input className="input-fac" type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="Enter facility name here." value={facility.name}/>
            <label htmlFor="facilityName">City</label>
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




             
       </div>
       </fieldset>
      
      <div className="btns-save-return">
       <Button variant="info" className="btn-edit" 
             disabled={isLoading}
             onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleSaveFacility()
              }}>
          {facilityId ? <>Submit Changes</> : <>Save</>}</Button>

        <button className="btn-del" onClick={handleDelete}>Delete</button> 
        </div>
        <Button variant="link"className="btn-ret" onClick={() => {
                    history.push("/facilities/")}}>Return to List</Button>{' '}

           {/* <button onClick={handleDelete} className="btn btn-primary delete-btn"> {messageId ? <> Delete </>: <> Cancel </>}</button> */}
        </form>
        </div>
        </section>
        </>


     )
}



