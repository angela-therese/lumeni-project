import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import {Button, Card} from "react-bootstrap"
import { UserContext } from "./UsersProvider"
import { ParcelContext } from "./parcels/ParcelProvider"
import "./Home.css" 
import  Logo  from './images/lumeni-no-bg.png'
import Facilities from './images/1.png'
import Parcels from './images/2.png'
import Returns from './images/3.png'
import Reports from './images/4.png'



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
  const printUser = (currentUser?.name)?.split(" ").slice(0,-1)
  const printOrg = currentUser?.organization
  
    return (
        <>
        <section className="section-home">

        <header className="header">
        <div><img  src={ Logo } className="no-border img" thumbnail /></div>
        <div className="header-right">
          <h2>Welcome to Lumeni, {printUser}!</h2>
          <button className="btn-logout" size="sm">Log out</button>
          </div>
        </header>
        <h2>{printOrg} has sent a total of {bookTotal} books to people who are incarcerated.</h2> <h2>That's a lot of light! </h2>
           <article>
    
             <div className="card-div">   
             <div className="card-div">
           <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
            <img src={Parcels} />
            <Card.Title>Parcels<br></br> <Button variant="primary" size="sm" onClick={() => {
                   history.push(`/parcels`)}}>Go</Button></Card.Title>
             <Card.Text>
              How do we keep track of the hundreds of books we send each year? Click here to add, view, and edit parcels and mark returns.  
            </Card.Text>
          </section>
          </div>
          

         <div className="card-div">
          <section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
          <img src={Facilities} />
           <Card.Title>Facilities<br></br><Button variant="primary" size="sm" onClick={() => {
                   history.push(`/facilities`)}}>Go</Button></Card.Title>
          <Card.Text>
           Where are our books going? Click here to view or add to our list of destination facilities and details about each. 
          </Card.Text>
          </section>
          </div>
       
<div className="card-div">
<section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
  <img src={Returns} />
    <Card.Title>Returns<br></br><Button variant="primary" size="sm" onClick={() => {
                   history.push(`/returns`)}}>Go</Button></Card.Title>
    <Card.Text>
      How many books that we send don't make it to their recipient? Click here to view the returned list.  
    </Card.Text>
</section>
</div>


<div className="card-div">
<section className="splash-card" style={{  width: '13rem', height: '15rem' }}>
       <img src={Reports} />
        <Card.Title>Reports <br></br><Button variant="primary" size="sm" onClick={() => {
                   history.push(`/reports`)}}>Go</Button></Card.Title>
        <Card.Text>
      Need some stats? Click here to find data about our most common destinations, genres, total books sent, and more. 
        </Card.Text>
        
</section>
</div>


</div>
</article>
</section>

       
        
        </>

    )


}
   
