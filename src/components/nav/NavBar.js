import React, { Component, useContext, useEffect } from "react"
import { UserContext } from "../UsersProvider"
import { Nav } from "react-bootstrap"
import { Image } from "react-bootstrap"
import  Logo  from './lumeni-2.png'
import Facilities from '../images/1.png'
import Parcels from '../images/2.png'
import Returns from '../images/3.png'
import Reports from '../images/4.png'
import "./NavBar.css"

// import "bootstrap/dist/css/bootstrap.min.css"


export const NavBar =() => {

    const {users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    },[])

    const currentUser = users.find(u => u.id == localStorage.getItem("lumeni_user"))
    const printUser = (currentUser?.name)?.split(" ").slice(0, -1)
    const printOrg = currentUser?.organization
    
        return (
            <>
            <section className="nav-comp">
            <div className="nav-header-user">
                <p>Welcome, {printUser}</p>
             </div>
           
            <Nav defaultActiveKey="/home" className="flex-column nav-menu">
           
                <Image src={Logo } fluid />
                <div className="menu-item"><Nav.Link href="/">Home</Nav.Link></div>
                <div className="menu-item"><Nav.Link eventKey="link-3" href="/parcels">Parcels</Nav.Link></div>
                <div className="menu-item"><Nav.Link eventKey="link-2" href="/facilities">Facilities</Nav.Link></div>
                <div className="menu-item"><Nav.Link eventKey="link-4" href="/returns">Returns</Nav.Link></div>
                <div className="menu-item"><Nav.Link eventKey="link-1" href="/reports">Reports</Nav.Link></div>
                {/* <Nav.Link eventKey="disabled" disabled>
                    Disabled
                 </Nav.Link> */}
            </Nav>
        
            </section>
            
            </>

        )
    }
