import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { FacilityContext } from "./FacilityProvider"
import { Card, Button} from "react-bootstrap"
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

    return (
        <>
<Card>
        
  <Card.Header> <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /></Card.Header>
 
  <Card.Body>
    <Card.Title>{facility.name}</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button onClick={() => {history.push(`/facilities/`)
              }}variant="info">Return to List</Button>
  </Card.Body>
</Card>
        </>

    )

}