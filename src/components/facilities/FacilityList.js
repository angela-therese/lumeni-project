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


return (
     
  <>   
   
   
   <section className="fac-list-comp">

   <div className="header-div"></div>
    <section className="fac-container-state">
    <h4>Facilities</h4> 
    <Button variant="primary" size="sm" className="btn-add" onClick={() => {
                    history.push("/facilities/add")}}>Add New</Button>{' '}

   
    <h6>Kentucky</h6>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
        <th>Facility Name</th>
        <th>City</th>
        <th>State</th>
        <th>Modify Record</th>
        </tr>
    </thead>
    {facilities.map(facility => { 
        if(facility.state === "KY")
         return (
            <tbody>
                <tr>
                <td>{facility.name}</td>
                <td>{facility.city}</td>
                <td>{facility.state}</td>
                <td><button>Edit</button> <button>Return</button> <button>Delete</button></td>
                </tr>
            </tbody>
         )} 
         )}
     </Table>
      </section>

      <section className="fac-container-state">
      <h6>Maryland</h6>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
        <th>Facility Name</th>
        <th>City</th>
        <th>State</th>
        <th>Modify Record</th>
        </tr>
    </thead>
    {facilities.map(facility => { 
        if(facility.state === "MD")
         return (
            <tbody>
                <tr>
                <td>{facility.name}</td>
                <td>{facility.city}</td>
                <td>{facility.state}</td>
                <td><button className="btn-edit">Edit</button> <button className="btn-ret">Return</button> <button className="btn-del">Delete</button></td>
                </tr>
            </tbody>
         )} 
         )}
     </Table>



      </section>
     </section>
      </>
    )
  

}
         

  



