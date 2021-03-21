import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { FacilityContext } from "./FacilityProvider"
import './Facility.css'
import { Table } from "react-bootstrap"
import { Button } from "react-bootstrap"


export const FacilityList = () => {
    const history = useHistory()
    const { facilities, getFacilities } = useContext(FacilityContext)
    

    useEffect(() => {
        getFacilities()
    },[])

  const sortedFacilities =  facilities.sort((a, b) => (a.state > b.state) ? 1 : (a.state === b.state) ?((a.name > b.name) ? 1: -1 ) : -1)

return (
     
  <>   
   
   <section className="facility-container">
     <div className="header-div"></div>
    {/* <section> */}
    <div className="section-heading"><h4>Facilities</h4></div> 
    <div className="btn-header"><Button variant="primary" size="sm" className="btn-add" onClick={() => {
    history.push("/facilities/add")}}>Add New</Button>{' '}</div>
   
    <article className="table-facility-list">
    
    <section className="fac-container-state">
    <Table striped bordered hover size="sm">
    <thead>
        <tr>
        <th className="fac-table">Facility Name</th>
        <th className="city-table">City</th>
        <th className="state-table">State</th>
        <th className="mod-table"></th>
        <th className="sent-table">Parcels</th>
        <th className="returns-table">Returns</th>
        </tr>
    </thead>
    {sortedFacilities.map(facility => { 

         return (
            <tbody>
                <tr>
                <td className="fac-table" >{facility.name}</td>
                <td className="city-table">{facility.city}</td>
                <td className="state-table">{facility.state}</td>
                <td className="mod-table"><button size="sm" className="btn-edit"  onClick={() => {
                    history.push(`/facilities/edit/${facility.id}`)
              }}>Modify</button> <button size="sm" className="btn-det">Details</button></td> 
                <td className="sent-table"></td>
                <td className="returns-table"></td>
                </tr>
            </tbody>
         )} 
         )}
     </Table>
      </section>
    

    </article>
    </section>
     {/* </section> */}
      </>
    )
  

}
         

  



