import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ParcelContext } from "./ParcelProvider"
import './Parcel.css'
import { Table } from "react-bootstrap"
import { Button } from "react-bootstrap"


export const ParcelList = () => {
    const history = useHistory()
    const { parcels, getParcels, getParcelById, } = useContext(ParcelContext)
    

    useEffect(() => {
        getParcels()
    },[])

    const sortedParcels =  parcels.sort((a, b) => (a.parcelNumber > b.parcelNumber ? -1 : 1))

 
    return (
     <>
    <section className="parcels-container">
    <div className="div-header"></div>
    {/* <section > */}
    <div className="section-heading"><h4>Parcels</h4>
    <div className="btn-header"><Button variant="info" size="sm" className="btn-add" onClick={() => {
    history.push("/parcels/add")}}>New Entry</Button>{' '}</div></div> 
   
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
          <td>{p.genre}</td>
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
</>
)
            }


//     return (
       
         
//         <> 
        
//         <section className="parcel-container">          
//         <div className="div-header"></div>
//         {/* <section className="parcel-table"> */}
//         <div className="heading-section"><h4>Parcels</h4> <div className="btn-header"><Button variant="info" size="sm" className="btn-add" onClick={() => {
//         history.push("/parcels/add")}}>Add New</Button>{' '}</div></div>
       

//         <article className="table-parcels-list">
//         <Table striped bordered hover size="sm">
        
        
//         <th className="parcelNumber">Number</th>
//         <th className="dateSent">Sent</th>
//         <th className="facility">Destination</th>
//         <th className="title">Book Title</th>
//         <th className="genre">Genre</th>
//         <th className="mod">Modify Record</th>
        
      
       
//           {sortedParcels.map(p => { 
      
//             return (
//                     <tbody>
//                     <tr>
                    
//                     <td className="parcelNumber table-data">{p.parcelNumber}</td>
//                     <td className="date table-data">{p.dateSent}</td>
//                     <td className="facility table-data">{p.facility?.name}</td>
//                     <td className="title">{p.title}</td>
//                     <td className="genre table-data"></td>
//                     <td className="mod table-data"><button size="sm" className="btn-edit"  onClick={() => {
//                     history.push(`/parcels/edit/${p.id}`)
//                     }}>Edit</button> <button size="sm" className="btn-return">Return Book</button></td> 
//                     </tr>
//                    </tbody>
                    
//                 )} 

//              )}
//               {/* </tbody> */}
//          </Table>

      
//          </article>
//         </section>
//         {/* </section> */}
//     </>

// )

