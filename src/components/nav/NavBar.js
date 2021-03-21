import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
import { Image } from "react-bootstrap"
import  Logo  from './placeholder.png'
import "./NavBar.css"

// import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {


    render() {
        return (
            <>
            <section className="nav-comp">
            <div className="nav-header-user" >
                <p>Welcome, User</p>
             </div>
           
            <Nav defaultActiveKey="/home" className="flex-column nav-menu">
           
                <Image src={Logo } fluid />
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link eventKey="link-3" href="/parcels">Parcels</Nav.Link>
                <Nav.Link eventKey="link-2" href="/facilities">Facilities</Nav.Link>
                <Nav.Link eventKey="link-4" href="/returns">Returns</Nav.Link>
                <Nav.Link eventKey="link-1" href="/reports">Reports</Nav.Link>
                {/* <Nav.Link eventKey="disabled" disabled>
                    Disabled
                 </Nav.Link> */}
            </Nav>
        
            </section>
            
            </>

        )
    }
}

export default NavBar
