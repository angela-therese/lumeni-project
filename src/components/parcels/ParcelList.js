import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ParcelContext } from "./ParcelProvider"
import './Parcel.css'
import { Table } from "react-bootstrap"
import { Button } from "react-bootstrap"


export const ParcelList = () => {
    const history = useHistory()
    const { parcels, getParcels } = useContext(ParcelContext)
    

    useEffect(() => {
        getParcels()
    },[])

    const sortedParcels =  parcels.sort((a, b) => (a.parcelNumber > b.parcelNumber ? -1 : 1))

 

    return (
       
         
        <> 
        
        <section className="parcel-container">          
        <div className="div-header"></div>
        {/* <section className="parcel-table"> */}
        <div className="heading-section"><h4>Parcels</h4> <div className="btn-header"><Button variant="info" size="sm" className="btn-add" onClick={() => {
        history.push("/parcels/add")}}>Add New</Button>{' '}</div></div>
       

        <article className="table-parcels-list">
        <Table striped bordered hover size="sm">
         <thead>
        <tr>
        <th className="parcelNumber">Number</th>
        <th className="dateSent">Sent</th>
        <th className="facility">Destination</th>
        <th className="genre">Genre</th>
        <th className="mod">Modify Record</th>
        
        </tr>
        </thead>
          {sortedParcels.map(p => { 
      
            return (
                  
                    <tr>
                    
                    <td className="parcelNumber table-data">{p.parcelNumber}</td>
                    <td className="date table-data">{p.dateSent}</td>
                    <td className="facility table-data">{p.facility?.name}</td>
                    <td className="genre table-data"></td>
                    <td className="mod table-data"><button size="sm" className="btn-edit"  onClick={() => {
                    history.push(`/parcels/edit/${p.id}`)
                    }}>Edit</button> <button size="sm" className="btn-return"  onClick={() => {
                        history.push(`/parcels/edit/${p.id}`)
                        }}>Return</button></td> 
                    </tr>
                    
                )} 

             )}
         </Table>
         </article>
        </section>
        {/* </section> */}
    </>

)
}
