import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import {Button, Card, Image} from "react-bootstrap"
import { UserContext } from "./UsersProvider"
import { ParcelContext } from "./parcels/ParcelProvider"
import "./Home.css" 
import  Logo  from './images/lumeni-205px.png'
import Facilities from './images/1.png'
import Parcels from './images/2.png'
import Returns from './images/3.png'
import Reports from './images/4.png'
import Light from './images/book-light.png'



export const Home = () => {

  const {users, getUsers } = useContext(UserContext)
  const {parcels, getParcels } = useContext(ParcelContext)

  const history = useHistory()

  useEffect(() => {
    getUsers().then(getParcels)
},[])

const sortedParcels =  parcels.sort((a, b) => (a.parcelNumber > b.parcelNumber ? -1 : 1))
const bookTotal = sortedParcels[0]?.parcelNumber  
const currentUser = users.find(u => u.id == localStorage.getItem("lumeni_user"))
  const printUser = 
  (currentUser?.name)?.split(" ").slice(0,-1)
  const printOrg = currentUser?.organization
  
    return (
       <>
        <section className="home-container">
        {/* <header className="header">
           <section className="header-message">
            <div><h5>{printUser}</h5></div>
           <button className="btn-logout" size="sm">Log out</button>
           </section>
        </header> */}


        <section className="greeting-div">
        <h1>Welcome, {printUser}!</h1>
        <Image src={Logo} fluid /><br></br>

 <h2>{printOrg} has sent <b>{bookTotal}</b> books and counting!<br></br></h2>
 
 <h3>Where would you like to start today?</h3
 >
 </section>
    <article>

      <div className="card-div">         <div className="card-div">
   <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
   <img src={Parcels} />
   <Card.Title>Parcels<br></br> <Button variant="primary" size="sm" onClick={() => {
           history.push(`/parcels`)}}>Go</Button></Card.Title>
     <Card.Text>
      Keep track of parcels, which each contain one book. Click here to add, view, and edit sent parcels and mark returns.  
    </Card.Text>
  </section>
  </div>
  

 <div className="card-div">
  <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
  <img src={Facilities} />
   <Card.Title>Facilities<br></br><Button variant="primary" size="sm" onClick={() => {
           history.push(`/facilities`)}}>Go</Button></Card.Title>
  <Card.Text>
   Manage our list of destination facilities. Click here to view or add to the list and view specific details about each. 
  </Card.Text>
  </section>
  </div>

<div className="card-div">
<section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
<img src={Returns} />
<Card.Title>Returns<br></br><Button variant="primary" size="sm" onClick={() => {
           history.push(`/returns`)}}>Go</Button></Card.Title>
<Card.Text>
Some parcels are returned to us by the destination facility. Click here to view the list of books that have been returned. 
</Card.Text>
</section>
</div>


<div className="card-div">
<section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
<img src={Reports} />
<Card.Title>Reports <br></br><Button variant="primary" size="sm" onClick={() => {
           history.push(`/reports`)}}>Go</Button></Card.Title>
<Card.Text>
Data about our most common destinations & genres, total books sent, and more can be found here.  
</Card.Text>

</section>
</div>


</div>
</article>




        </section> 
       </>
        
       

    )


}
   
// //<section className="section-home">


// <section className="greeting-div">

// <h2>{printOrg} has sent <b>{bookTotal}</b> books and counting!<br></br></h2>
// <Image src={Light} thumbnail /><br></br>
// <h4>Where would you like to start? Make a selection below.</h4>
// </section>

//    <article>

//      <div className="card-div">   
//      <div className="card-div">
//    <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
//     <img src={Parcels} />
//     <Card.Title>Parcels<br></br> <Button variant="primary" size="sm" onClick={() => {
//            history.push(`/parcels`)}}>Go</Button></Card.Title>
//      <Card.Text>
//       Keep track of parcels, each containing one book. Click here to add, view, and edit sent parcels and mark returns.  
//     </Card.Text>
//   </section>
//   </div>
  

//  <div className="card-div">
//   <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
//   <img src={Facilities} />
//    <Card.Title>Facilities<br></br><Button variant="primary" size="sm" onClick={() => {
//            history.push(`/facilities`)}}>Go</Button></Card.Title>
//   <Card.Text>
//    Manage our list of destination facilities. Click here to view or add to the list and view specific details about each. 
//   </Card.Text>
//   </section>
//   </div>

// <div className="card-div">
// <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
// <img src={Returns} />
// <Card.Title>Returns<br></br><Button variant="primary" size="sm" onClick={() => {
//            history.push(`/returns`)}}>Go</Button></Card.Title>
// <Card.Text>
// Some parcels are returned to us by the destination facility. Click here to view the list of books that have been returned. 
// </Card.Text>
// </section>
// </div>


// <div className="card-div">
// <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
// <img src={Reports} />
// <Card.Title>Reports <br></br><Button variant="primary" size="sm" onClick={() => {
//            history.push(`/reports`)}}>Go</Button></Card.Title>
// <Card.Text>
// Data about our most common destinations & genres, total books sent, and more can be found here.  
// </Card.Text>

// </section>
// </div>


// </div>
// </article>
// </section>





