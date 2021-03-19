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
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link eventKey="link-1" href="/reports">Reports</Nav.Link>
                <Nav.Link eventKey="link-2" href="/facilities">Facilties</Nav.Link>
                <Nav.Link eventKey="link-3" href="/parcels">Parcels</Nav.Link>
                <Nav.Link eventKey="link-4" href="/returns">Returns</Nav.Link>
                {/* <Nav.Link eventKey="disabled" disabled>
                    Disabled
                 </Nav.Link> */}
            </Nav>
        
            </section>
            
            </>

            // <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
            //     <ul className="nav nav-pills nav-fill">
            //         <li className="nav-item">
            //             <Link className="nav-link" to="/articles">Articles</Link>
            //         </li>
            //         <li className="nav-item">
            //             <Link className="nav-link" to="/messages">Messages</Link>
            //         </li>
            //         <li className="nav-item">
            //             <Link className="nav-link" to="/tasks">Tasks</Link>
            //         </li>
            //         <li className="nav-item">
            //             <Link className="nav-link" to="/events">Events</Link>
            //         </li>
            //     </ul>
            // </nav>
        )
    }
}

export default NavBar
