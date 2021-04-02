import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { FacilityContext } from "./FacilityProvider"
import { Card, Button, Table, Modal, Image} from "react-bootstrap"
import Facility from "../images/Facility.png"
import './Facility.css'

export const FacilityDetail = () => {
    const { getFacilityById } = useContext(FacilityContext)
    const [ facility, setFacility ] = useState({})


    const {facilityId} = useParams();
    const history = useHistory();

    useEffect(() => {
        getFacilityById(facilityId)
        .then((response) => {
            setFacility(response)
        })
    }, [] )

   
    const returnCount = facility.parcels?.filter(p => p.return === true)


  return (
  <>
  <article className="card-container">
  <Image src={Facility} thumbnail/>
  <Card className="facility-detail-card">
  <Card.Body>
    <Card.Title>{facility.name}</Card.Title>
    <Card.Text>
      <h6>Total books sent: {facility.parcels?.length}</h6>
      <h6>Total books returned: {returnCount?.length}</h6>
      <h6>Notes:</h6><br></br>
      <p>{facility.notes}</p>
      <h6>{facility.name} Parcel List</h6>
      <Table striped border hover size="sm">
      <thead>
            <tr>
             <th>#</th>
             <th>Date</th>
            <th>Title</th>
            <th>Returned</th>
            {/* <th>Return Notes</th> */}
            <th></th>
            </tr>
            </thead>
      {facility.parcels?.map(p => {
         let returned = p.return ? 'yes' : 'no'
          return (
            <tbody>
            <tr>
            <td>{p.parcelNumber}</td>
            <td>{p.dateSent}</td>
            <td>{p.title}</td>
            <td>{returned}</td>
            </tr>
            </tbody>
          )
        })}
      </Table>
    </Card.Text>
    <Button onClick={() => {history.push(`/facilities/`)
              }}variant="info">Return to List</Button>

  </Card.Body>
</Card>
</article>


        </>

    )

}