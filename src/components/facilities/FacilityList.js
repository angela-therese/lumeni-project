import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { FacilityContext } from "./FacilityProvider"
import { FacilityForm } from "./FacilityForm"
import { NavBar } from "../nav/NavBar"
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

 const [showForm, setShowForm] = useState(false)
    const toggleForm = () => {setShowForm(true)}
   
    // if(showForm === true){
      return (
        <>   
   
        {/* <section className="facility-container"> */}
         
        {/* <header> <NavBar /> </header> */}
         <section className="main-container">
         <div className="section-heading">
         <h4>Facilities</h4>
         <div className="btn-header"><Button variant="secondary" size="sm" className="btn-add" onClick={toggleForm}>Add New</Button>{' '}</div></div> 
        
         <article className="table-facility-list">
         
         <section className="facilities-table">
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
          const returnCount = facility.parcels?.filter(p => p.return === true);         return (
                 <tbody>
                     <tr>
                     <td className="fac-table table-data" >{facility.name}</td>
                     <td className="mod-table table-data"><Button variant="link" size="sm" className="btn-det" onClick={() => { history.push(`/facilities/details/${facility.id}`)}}>Details</Button></td>
                     <td className="city-table table-data">{facility.city}</td>
                     <td className="state-table table-data">{facility.state}</td>
                     <td className="sent-table table-data">{facility.parcels?.length}</td>
                     <td className="returns-table table-data">{returnCount?.length}</td>
                     <td className="mod-table table-data"><Button variant="info" size="sm" className="btn-edit"  onClick={() => {
                         history.push(`/facilities/edit/${facility.id}`)
                   }}>Edit</Button> </td> 
                    
                     </tr>
                 </tbody>
              )} 
              )}
          </Table>
           </section>
     
     
         </article>
         </section>
         {/* </section> */}
         
          
      <FacilityForm />
      </>
      )
    
//     } else {
// return (
  
//   <>    
//    <section className="facility-container">
    
//    {/* <header> <NavBar /> </header> */}
//     <section>
//     <div className="section-heading">
//     <h4>Facilities</h4>
//     <div className="btn-header"><Button variant="secondary" size="sm" className="btn-add" onClick={toggleForm}>Add New</Button>{' '}</div></div> 
   
//     <article className="table-facility-list">
    
//     <section className="facilities-table">
//     <Table striped bordered hover size="sm">
//     <thead>
//         <tr>
//         <th className="fac-table">Facility Name</th>
//         <th className="mod-table"></th>
//         <th className="city-table">City</th>
//         <th className="state-table">State</th>
//         <th className="sent-table">Parcels</th>
//         <th className="returns-table">Returns</th>
//         <th className="mod-table"></th>
        
//         </tr>
//     </thead>
//     {sortedFacilities.map(facility => { 
//      const returnCount = facility.parcels?.filter(p => p.return === true);         return (
//             <tbody>
//                 <tr>
//                 <td className="fac-table table-data" >{facility.name}</td>
//                 <td className="mod-table table-data"><Button variant="link" size="sm" className="btn-det" onClick={() => { history.push(`/facilities/details/${facility.id}`)}}>Details</Button></td>
//                 <td className="city-table table-data">{facility.city}</td>
//                 <td className="state-table table-data">{facility.state}</td>
//                 <td className="sent-table table-data">{facility.parcels?.length}</td>
//                 <td className="returns-table table-data">{returnCount?.length}</td>
//                 <td className="mod-table table-data"><Button variant="info" size="sm" className="btn-edit"  onClick={() => {
//                     history.push(`/facilities/edit/${facility.id}`)
//               }}>Edit</Button> </td> 
               
//                 </tr>
//             </tbody>
//          )} 
//          )}
//      </Table>
//       </section>


    // </article>
    // </section>
    // </section>
    
      // </>
     
    // )}
}
         

  







//onClick={() => {
  // history.push("/facilities/add")}}