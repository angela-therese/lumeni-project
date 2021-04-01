import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { FacilityContext } from "./FacilityProvider"
import { FacilityForm } from "./FacilityForm"

import './Facility.css'
import { Table, Button, Image} from "react-bootstrap"
import { SearchBar } from "../SearchBar"
import Facility from "../images/Facility.png"



export const FacilityList = () => {
    const history = useHistory()
    const [searchField, setSearchField] = useState("")
    const [filteredFacilities, setFiltered] = useState([])
    const { facilities, getFacilities } = useContext(FacilityContext)
    

    useEffect(() => {
        getFacilities()
    },[])

    const sortedFacilities =  facilities.sort((a, b) => (a.state > b.state) ? 1 : (a.state === b.state) ?((a.name > b.name) ? 1: -1 ) : -1)

    useEffect(() => {
      
      if(searchField !== "") {
          const list = sortedFacilities.filter(f => {
             return f.name.toLowerCase().includes(searchField.toLowerCase())
          })
          setFiltered(list) 
      }
      else {
          setFiltered(sortedFacilities)
      }
      },[searchField, sortedFacilities])

  

//  const [showForm, setShowForm] = useState(false)
//     const toggleForm = () => {setShowForm(true)}
   
    // if(showForm === true){
      return (
        <>   
         
       
         <section className="main-container">
          <div><h2>Facilities</h2></div>
          <div><Image src={Facility}/></div>

           <article className="form-and-list-container">
             <section className="list-container">
             
             <section className="returns-heading">
             <label>Search Facilities</label>
            <SearchBar className="search-bar" placeholder="Enter facility name" handleChange={(e)=> setSearchField(e.target.value)}/>
             </section>
            
             <section className="table-list">

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
         {filteredFacilities.map(facility => { 
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

            </section>
            <FacilityForm />
            
             
             
             </article> 
         </section>
         
          
    
      </>
      )

}
         

  