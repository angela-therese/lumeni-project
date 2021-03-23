import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ParcelContext } from "./ParcelProvider"
import { ParcelForm } from "./ParcelForm"
import './Parcel.css'
import { Table } from "react-bootstrap"
import { Button } from "react-bootstrap"


export const ParcelList = () => {
    const history = useHistory()
    const { parcels, getParcels, getParcelById } = useContext(ParcelContext)
    
    // const [showForm, setShowForm] = useState(false)
    // const toggleForm = () => {setShowForm(true)}

    
    

    useEffect(() => {
        getParcels()
    },[])

    const sortedParcels =  parcels.sort((a, b) => (a.parcelNumber > b.parcelNumber ? -1 : 1))

    // if(showForm === true){
        return (
            <>
           <article className="form-and-list-container">
           {/* <div className="div-header"></div> */}
           
            
            <section className="list-container">
    {/* <section > */}
            <div className="section-heading"><h4>Parcels</h4>
            {/* <div className="btn-header"><Button variant="info" size="sm" className="btn-add" onClick={toggleForm}>New Entry</Button>{' '}</div> */}
             </div> 
             <section className="table-parcels-list">
            <Table striped bordered hover size="sm">
            <thead>
            <tr>
             <th>#</th>
             <th>Date</th>
            <th>Destination</th>
            <th>Genre</th>
            <th>Title</th>
            <th></th>
            </tr>
            </thead>
            {sortedParcels.map(p => { 
      
                    return (
         
                 <tbody>
                 <tr>
                 <td>{p.parcelNumber}</td>
                 <td>{p.dateSent}</td>
                 <td>{p.facility?.name}</td>
                 <td>{p.genre?.name}</td>
                 <td>{p.title}</td>
                 <td><button onClick={() => {
                    history.push(`/parcels/edit/${p.id}`)}}>Edit</button></td>
                 </tr>
                 </tbody>
      )}  
      )}

    </Table>
    </section>
    </section>
    <ParcelForm/>
    </article>
    
            
            </>
        )
      }




      
//     }
//     else {
//     return (

//     <>
//     <section className="parcels-container">
//     <div className="div-header"></div>
//     {/* <section > */}
//     <div className="section-heading"><h4>Parcels</h4>
//     <div className="btn-header"><Button variant="info" size="sm" className="btn-add" onClick={toggleForm}>New Entry</Button>{' '}</div>
//     </div> 
//    <section className="table-parcels-list">
//     <Table striped bordered hover size="sm">
//   <thead>
//     <tr>
//       <th>#</th>
//       <th>Date</th>
//       <th>Destination</th>
//       <th>Genre</th>
//       <th>Title</th>
//       <th></th>
//     </tr>
//   </thead>
//   {sortedParcels.map(p => { 
      
//       return (
         
//         <tbody>
//         <tr>
//           <td>{p.parcelNumber}</td>
//           <td>{p.dateSent}</td>
//           <td>{p.facility?.name}</td>
//           <td>{p.genre?.name}</td>
//           <td>{p.title}</td>
//           <td><button onClick={() => {
//           history.push(`/parcels/edit/${p.id}`)}}>Edit</button></td>
//         </tr>
//         </tbody>
//       )}  
//       )}

    // </Table>
    // </section>
    // </section>

        // </>
        // )}




      
   

// onClick={() => {
//     history.push("/parcels/add")}}

{/* 
        {sortedParcels.map(p => { 
      
            return (
                <>
                <p>p.parcelNumber</p>
                <p>p.dateSent</p>
                <button   onClick={() => {
                    history.push(`/parcels/edit/${p.id}`)
              }}>Modify</button> 
                
                </>
            )}
      
    )} */}