import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ParcelContext } from "../parcels/ParcelProvider"
import { SearchBar } from "../SearchBar"
import './Parcel.css'
import { Table, Button } from "react-bootstrap"



export const ReturnList = () => {
    const history = useHistory()
    const { parcels, getParcels} = useContext(ParcelContext)
    
    // const [showForm, setShowForm] = useState(false)
    // const toggleForm = () => {setShowForm(true)}
    
    const [searchField, setSearchField] = useState("")
    const [filteredParcels, setFiltered] = useState([])
    
    
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
           <article className="returns-container">
          
            <section className="returns-heading">
            <div><h4>Returns</h4></div> 
            <label>Search Returns</label>
            <SearchBar className="search-bar" placeholder="Enter title" handleChange={(e)=> setSearchField(e.target.value)}/><br></br>
            
            </section>

            <section className="table-parcels-list">
            <Table striped bordered hover size="sm">
            <thead>
            <tr>
             <th>#</th>
             <th>Date</th>
            <th>Destination</th>
            <th>Genre</th>
            <th>Title</th>
            
            </tr>
            </thead>
            {
                filteredParcels.map(p => {
                    if(p.return === true)
                    return (
                      
                <>
                <tbody>
                <tr>
                <td>{p.parcelNumber}</td>
                <td>{p.dateSent}</td>
                <td>{p.facility?.state + "--" + p.facility?.name}</td>
                <td>{p.genre?.name}</td>
                <td>{p.title}</td>
               
                </tr>
                </tbody>
                </>
                
           
                    )}
                    )}
               
     
    </Table>
    <Button variant="link" size="sm" className="btn-ret" onClick={() => {
                            history.push("/parcels/")}}>Return to Parcel List</Button>{' '}
    </section>
    {/* </section> */}
    </article>
    </>
    )
 }
            
