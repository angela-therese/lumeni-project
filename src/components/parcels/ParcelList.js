import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ParcelContext } from "./ParcelProvider"
import { ParcelForm } from "./ParcelForm"
import { SearchBar } from "../SearchBar"
import './Parcel.css'
import { Table, Image } from "react-bootstrap"
import Parcel from "../images/Parcel.png"



export const ParcelList = () => {
    const history = useHistory()
    const { parcels, getParcels} = useContext(ParcelContext)
    
    
    const [searchField, setSearchField] = useState("")
    const [filteredParcels, setFiltered] = useState([])
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const sortedParcels =  parcels.sort((a, b) => (a.parcelNumber > b.parcelNumber ? -1 : 1))
    
    
    useEffect(() => {
        getParcels()
    },[])

    useEffect(() => {
      
        if(searchField !== "") {
            const list = sortedParcels.filter(p => {
               return p.title.toLowerCase().includes(searchField.toLowerCase())
            })
            setFiltered(list) 
        }
        else {
            setFiltered(sortedParcels)
        }
        },[searchField, sortedParcels])

   

        return (
            
            <>
            <div className="main-container">
            <div><h2>Parcels</h2></div> 
            <div><Image src={Parcel}/></div>
            
            <article className="form-and-list-container">
                <section className="list-container">
               
                <section className="returns-heading">
                    <label>Search Parcels</label>
                    <SearchBar classname="search-bar" placeholder="Enter title" handleChange={(e)=> setSearchField(e.target.value)}/>
                 </section>
               
                <section className="table-list">
              
                    <Table striped bordered hover size="sm">
                     <thead>
                         <tr>
                         <th>#</th>
                         <th>Date</th>
                         <th>Destination</th>
                         <th>Title</th>
                         <th>Returned</th>
                         <th></th>
                         </tr>
                     </thead>
                      {
                        filteredParcels.map(p => {
                        let returned = p.return ? 'Y' : 'N'
                            return (
                      
                                <>
                                 <tbody>
                                 <tr>
                                 <td>{p.parcelNumber}</td>
                                 <td>{p.dateSent}</td>
                                 <td>{p.facility?.state + "--" + p.facility?.name}</td>
                                 <td>{p.title}</td>
                                 <td>{returned}</td>
                               
                                 <td><button className="btn-edit-list" onClick={() => {
                                     history.push(`/parcels/edit/${p.id}`)}}>Edit</button>
                                 {/* <button className="btn-return-list" onClick={() => {
                                    history.push(`/parcels/return/${p.id}`)}}>Return</button> */}
                                 </td>
                                 </tr>
                                </tbody>
                               </>
                                     )}
                         )}

                    </Table>
                </section>

                </section>
                <ParcelForm/>
   
                </article>
                </div>
            </>
    
        )

    }
            
