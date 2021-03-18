import React, { useContext, useState, useEffect} from "react"
import { FacilityContext } from "./FacilityProvider"
import "./Facility.css"
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap'

export const FacilityForm = () => {

    const { addFacility, getFacilityById } = useContext(FacilityContext)

    const [ facility, setFacility ] = useState({
       name: "",
       city: "",
       state: "",
       notes: "",
       userId: null
        
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
            addFacility({
                userId: parseInt(localStorage.getItem("lumeni_user")),
                name: facility.name,
                city: facility.city,
                state: facility.state

            })
            .then(() => history.push("/facilities"))
            
        }

        useEffect(() => {
            // getMessages().then(() => {
                if(facilityId) {
                    getFacilityById(facilityId)
                    .then(facility => {
                        setFacility(facility)
                        setIsLoading(false)
                    })
                } else {
                    setIsLoading(false)
                }
 
            // })
         }, [])



    return (
        <form className="FacilityForm">
        <fieldset>
        <h3>Add a Facility</h3>
        <div className="form-group">
            <label htmlFor="facilityName">Facility Name </label>
            <input className="input-fac" type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="Enter facility name here." value={facility.name}/>
            <label htmlFor="facilityName">City</label>
            <input className="input-fac" type="text" id="city" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="City" value={facility.city}/>
            <label htmlFor="facilityState">State</label>
            <Form.Control as="select" size="sm" custom>
                    <option>KY</option>
                    <option>MD</option>
                    <option>OH</option>
                    <option>TN</option>
                    <option>VA</option>
                    <option>WV</option>
            </Form.Control>
            {/* <select className="input-drop-state" id="select-state" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="State" value={facility.state}>
                <option>KY</option>
                <option>MD</option>
                <option>OH</option>
                <option>TN</option>
                <option>VA</option>
                <option>WV</option>
            </select> */}
       </div>
       </fieldset>
      
            
       <button className="btn btn-primary"
             disabled={isLoading}
             onClick={event => {
               event.preventDefault() // Prevent browser from submitting the form and refreshing the page
               handleSaveFacility()
             }}>
           <>Save Facility</> </button>

           {/* <button onClick={handleDelete} className="btn btn-primary delete-btn"> {messageId ? <> Delete </>: <> Cancel </>}</button> */}
        </form>


     )
}