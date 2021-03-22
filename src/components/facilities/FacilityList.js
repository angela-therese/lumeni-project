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
   <div className="div-header"></div>
    {/* <section> */}
    <div className="section-heading"><h4>Facilities</h4></div> 
    <div className="btn-header"><Button variant="info" size="sm" className="btn-add" onClick={() => {
    history.push("/facilities/add")}}>Add New</Button>{' '}</div>
   
    <article className="table-facility-list">
    
    <section className="fac-container-state">
    <Table striped bordered hover size="sm">
    <thead>
        <tr>
        <th className="fac-table">Facility Name</th>
        <th className="mod-table"></th>
        <th className="city-table">City</th>
        <th className="state-table">State</th>
        <th className="sent-table">Parcels</th>
        <th className="returns-table">Returns</th>
        <th className="mod-table"></th>
        
        </tr>
    </thead>
    {sortedFacilities.map(facility => { 

         return (
            <tbody>
                <tr>
                <td className="fac-table" >{facility.name}</td>
                <td className="mod-table"><Button variant="link" size="sm" className="btn-det">Details</Button></td>
                <td className="city-table">{facility.city}</td>
                <td className="state-table">{facility.state}</td>
                <td className="sent-table"></td>
                <td className="returns-table"></td>
                <td className="mod-table"><Button variant="info" size="sm" className="btn-edit"  onClick={() => {
                    history.push(`/facilities/edit/${facility.id}`)
              }}>Modify</Button> </td> 
               
                </tr>
            </tbody>
         )} 
         )}
     </Table>
      </section>
    
      
        
      <input list="states" id="facility-state" name="facility-state" />
            <datalist id="states">
            {sortedFacilities.map(facility => {
              return(
              <option value={facility.state + "--" + facility.name} />
              )
             })}
            </datalist>
           
        
  



    </article>
    </section>
     {/* </section> */}
      </>
    )
  

}
         

  



