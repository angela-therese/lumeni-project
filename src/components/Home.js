import React from "react";
import {Button, Card, Image} from "react-bootstrap"
import "./Home.css" 
import  Logo  from './nav/lumeni-2.png'



export const Home = () => {

    return (
        <>
        <section className="section-home">
 <article>
  <div className="card-div">    
  <Card style={{ width: '18rem', height: '13rem'}} >
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Parcels</Card.Title>
    <Card.Text>
    How do we keep track of the hundreds of books we send each year? Click here to add, view, and edit parcels and mark returns.  
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</div>

<div className="card-div">
<Card style={{ width: '18rem', height: '13rem'}}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Facilities</Card.Title>
    <Card.Text>
      Where are our books going? Click here to view or add to our list of destination facilities and to view/edit details about each. 
      </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</div> 
</article>

<article>
<div className="card-div">
<Card style={{ width: '18rem', height: '13rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body >
    <Card.Title>Returns</Card.Title>
    <Card.Text>
      How many books that we send don't make it to their recipient? Click here to view the returned list. (To mark a return, head to parcels!) 
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</div>


<div className="card-div">
<Card style={{ width: '18rem', height: '13rem' }} >
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Reports</Card.Title>
    <Card.Text>
      Are you looking for some stats? Click here to find data about our most common destinations, genres, total books sent, and more. 
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</div>
</article>
       
        </section>
        </>

    )


}
   
