import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { FacilityContext } from "./FacilityProvider"
import './Facility.css'
import { Table } from "react-bootstrap"

export const FacilityList = () => {
    const history = useHistory()
    const { facilities, getFacilities } = useContext(FacilityContext)

    useEffect(() => {
        getFacilities()
    },[])


return (
     
  <>   
   
   <section className="fac-container">

   <div className="header-div"></div>

   
    <section className="fac-container-state">
    <h4>Facilities</h4>
    <br></br>
    <h6>Kentucky</h6>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
        <th>Facility Name</th>
        <th>City</th>
        <th>State</th>
        </tr>
    </thead>
    {  facilities.map(facility => { 
        if(facility.state === "KY")
         return (
            <tbody>
                <tr>
                <td>{facility.name}</td>
                <td>{facility.city}</td>
                <td>{facility.state}</td>
                </tr>
            </tbody>
         )} 
         )}
     </Table>
      </section>

      <section className="fac-container-state">
      <h6>Maryland</h6>
      </section>


      </section>
      </>
    )
  

}
         

  



